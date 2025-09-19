-- ============================================================================
-- creating_procedure.sql
-- Purpose: Create helper sequence table and trigger that auto-generates
--          blank (zero) stats rows and relational links for ALL players of the
--          two teams referenced in a newly inserted match row.
--
-- IMPORTANT:
--   * This file DOES NOT modify existing table definitions. It only adds
--     supporting objects (helper table + trigger).
--   * The trigger assumes the `match` table stores TEAM_ONE and TEAM_TWO as
--     team names (matching `team.TEAM_NAME`). It will lookup TEAM_IDs.
--   * For every player belonging to either team (via `player_team`) it will:
--       1. Generate a new STATS_ID (numeric) via sequence table.
--       2. Insert zero-valued row into `stats` (unless that player already
--          has stats linked to this match — safeguard check).
--       3. Insert link into `player_stats`.
--       4. Insert link into `stat_match`.
--       5. Ensure a `team_match` link exists for (MATCH_ID, TEAM_ID).
--   * All operations are part of the same transaction as the triggering
--     INSERT on `match`. If any error occurs the whole match insert rolls back.
--
-- CAVEATS:
--   * This creates INITIAL placeholder stats (all zeros). Your application
--     should later UPDATE these rows with real values (rather than creating
--     new rows) OR you can disable this trigger if you prefer on-demand stats.
--   * If you already have another mechanism (e.g., staging table trigger)
--     generating stats rows, avoid duplication by disabling one of them.
--
-- Safe re-run: Objects are dropped if they already exist.
-- ============================================================================

USE p_dbms;

-- ---------------------------------------------------------------------------
-- Sequence Emulation Table (if not already present elsewhere)
-- ---------------------------------------------------------------------------
DROP TABLE IF EXISTS stats_id_seq;
CREATE TABLE stats_id_seq (
  id BIGINT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Seed AUTO_INCREMENT at (current max numeric STATS_ID + 1)
SET @max_existing_stats := (SELECT COALESCE(MAX(CAST(STATS_ID AS UNSIGNED)),0) FROM stats);
SET @next_stats := @max_existing_stats + 1;
SET @alter_stmt := CONCAT('ALTER TABLE stats_id_seq AUTO_INCREMENT = ', @next_stats);
PREPARE stmt FROM @alter_stmt; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- ---------------------------------------------------------------------------
-- Trigger: AFTER INSERT ON match
-- ---------------------------------------------------------------------------
-- Logic summary:
--   * Resolve TEAM_ONE/TEAM_TWO names -> TEAM_IDs.
--   * Ensure team_match rows exist.
--   * For each player of those teams that DOES NOT yet have a stats row
--     linked to this match, create zero stats and link tables.
-- ---------------------------------------------------------------------------
DROP TRIGGER IF EXISTS trg_after_match_insert_generate_stats;
/* Trigger rewritten without DELIMITER so it can run in environments (e.g., some GUI runners,
   language connectors) that do not process client-side delimiter changes. */
CREATE TRIGGER trg_after_match_insert_generate_stats
AFTER INSERT ON `match`
FOR EACH ROW
BEGIN
    DECLARE v_team1_id VARCHAR(20);
    DECLARE v_team2_id VARCHAR(20);
    DECLARE done INT DEFAULT 0;
    DECLARE cur_player_id VARCHAR(20);
    DECLARE v_new_stats_id BIGINT;
    -- All DECLARE statements (variables, cursor, handlers) must appear before any other statements
    DECLARE cur CURSOR FOR
        SELECT DISTINCT pt.PLAYER_ID
        FROM player_team pt
        WHERE pt.TEAM_ID IN (v_team1_id, v_team2_id);

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Resolve team ids from names (if names used). If already IDs stored as names,
    -- adjust logic as needed.
    SELECT TEAM_ID INTO v_team1_id FROM team WHERE TEAM_NAME = NEW.TEAM_ONE LIMIT 1;
    SELECT TEAM_ID INTO v_team2_id FROM team WHERE TEAM_NAME = NEW.TEAM_TWO LIMIT 1;

    -- If not found by name, assume the value itself is an ID
    IF v_team1_id IS NULL THEN SET v_team1_id = NEW.TEAM_ONE; END IF;
    IF v_team2_id IS NULL THEN SET v_team2_id = NEW.TEAM_TWO; END IF;

    -- Ensure team_match links (IGNORE duplicates)
    INSERT IGNORE INTO team_match (MATCH_ID, TEAM_ID) VALUES (NEW.MATCH_ID, v_team1_id);
    INSERT IGNORE INTO team_match (MATCH_ID, TEAM_ID) VALUES (NEW.MATCH_ID, v_team2_id);

    OPEN cur;
    loop_players: LOOP
        FETCH cur INTO cur_player_id;
        IF done = 1 THEN LEAVE loop_players; END IF;

        -- Skip if stats already exist for this player+match (through existing linkage)
        IF EXISTS (
            SELECT 1
            FROM player_stats ps
            JOIN stat_match sm ON ps.STATS_ID = sm.STATS_ID
            WHERE ps.PLAYER_ID = cur_player_id
              AND sm.MATCH_ID = NEW.MATCH_ID
        ) THEN
            ITERATE loop_players;
        END IF;

        -- Generate new STATS_ID via sequence table
        INSERT INTO stats_id_seq VALUES (NULL);
        SET v_new_stats_id = LAST_INSERT_ID();

        -- Insert zero stats row
        INSERT INTO stats (STATS_ID, GOALS, ASSISTS, FOULS, YELLOW_CARDS, RED_CARDS, MINUTES_PLAYED)
        VALUES (v_new_stats_id, 0, 0, 0, 0, 0, 0);

        -- Link player <-> stats
        INSERT INTO player_stats (PLAYER_ID, STATS_ID) VALUES (cur_player_id, v_new_stats_id);

    -- Link stats <-> match
    INSERT INTO stat_match (STATS_ID, MATCH_ID) VALUES (v_new_stats_id, NEW.MATCH_ID);
    END LOOP;
    CLOSE cur;
END;

-- Trigger created. No DELIMITER directives used; runs as-is.

-- ---------------------------------------------------------------------------
-- NOTES:
-- * To remove this behavior: DROP TRIGGER trg_after_match_insert_generate_stats;
-- * To regenerate starting point for sequence after massive deletions, you can:
--     TRUNCATE TABLE stats_id_seq; (then rerun the seed logic above)
-- * If you want NON-zero default values (e.g., MINUTES_PLAYED = 90) change the
--   INSERT INTO stats line accordingly.
-- ---------------------------------------------------------------------------
