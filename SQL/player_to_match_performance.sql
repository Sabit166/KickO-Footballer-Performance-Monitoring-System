-- Create or replace a view that lists, per match, each player's stats
CREATE OR REPLACE VIEW player_match_performance_view AS
SELECT 
    sm.MATCH_ID,
    p.PLAYER_ID,
    p.PLAYER_NAME,
    s.GOALS,
    s.ASSISTS,
    s.FOULS,
    s.YELLOW_CARDS,
    s.RED_CARDS,
    s.MINUTES_PLAYED
FROM stat_match sm
JOIN stats s ON sm.STATS_ID = s.STATS_ID
JOIN player_stats ps ON s.STATS_ID = ps.STATS_ID
JOIN player p ON ps.PLAYER_ID = p.PLAYER_ID;

-- Drop the procedure if it already exists, then create it
DROP PROCEDURE IF EXISTS get_match_player_performance;

DELIMITER //

CREATE PROCEDURE get_match_player_performance(IN p_match_id VARCHAR(20))
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_player_name VARCHAR(100);
    DECLARE v_goals INT;
    DECLARE v_assists INT;
    DECLARE v_fouls INT;
    DECLARE v_yellow_cards INT;
    DECLARE v_red_cards INT;
    DECLARE v_minutes_played INT;
    
    DECLARE cur CURSOR FOR 
        SELECT PLAYER_NAME, GOALS, ASSISTS, FOULS, YELLOW_CARDS, RED_CARDS, MINUTES_PLAYED
        FROM player_match_performance_view
        WHERE MATCH_ID = p_match_id;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO v_player_name, v_goals, v_assists, v_fouls, v_yellow_cards, v_red_cards, v_minutes_played;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- For MySQL, we can use SELECT to output results (similar to DBMS_OUTPUT in Oracle)
        SELECT CONCAT('Player: ', v_player_name,
                     ' | Goals: ', COALESCE(v_goals, 0),
                     ' | Assists: ', COALESCE(v_assists, 0),
                     ' | Fouls: ', COALESCE(v_fouls, 0),
                     ' | Yellow Cards: ', COALESCE(v_yellow_cards, 0),
                     ' | Red Cards: ', COALESCE(v_red_cards, 0),
                     ' | Minutes Played: ', COALESCE(v_minutes_played, 0)) AS Player_Performance;
    END LOOP;
    
    CLOSE cur;
END //

DELIMITER ;

-- Test the procedure with a valid match ID
CALL get_match_player_performance('501');