
SELECT * FROM `MATCH`;


SELECT t.TEAM_NAME, SUM(s.GOALS) AS TOTAL_GOALS
FROM stat_match ms
JOIN stats s ON ms.STATS_ID = s.STATS_ID
JOIN player_stats ps ON ms.STATS_ID = ps.STATS_ID
JOIN player p ON ps.PLAYER_ID = p.PLAYER_ID
JOIN player_team pt ON p.PLAYER_ID = pt.PLAYER_ID
JOIN team t ON pt.TEAM_ID = t.TEAM_ID
WHERE ms.MATCH_ID = %s
GROUP BY t.TEAM_NAME;


SELECT DISTINCT p.PLAYER_NAME, s.GOALS, t.TEAM_NAME
FROM stat_match sm
JOIN stats s       ON sm.STATS_ID = s.STATS_ID
JOIN player_stats ps ON s.STATS_ID = ps.STATS_ID
JOIN player p      ON ps.PLAYER_ID = p.PLAYER_ID
JOIN player_team pt ON pt.PLAYER_ID = p.PLAYER_ID
JOIN team_match tm  ON tm.MATCH_ID = sm.MATCH_ID AND tm.TEAM_ID = pt.TEAM_ID
JOIN team t         ON t.TEAM_ID = pt.TEAM_ID
WHERE sm.MATCH_ID = %s AND s.GOALS > 0;





-- 1. Gather stats ids linked to this match
SELECT STATS_ID FROM stat_match WHERE MATCH_ID=%s;

-- 2. Delete linking rows
DELETE FROM stat_match WHERE MATCH_ID=%s;
DELETE FROM team_match WHERE MATCH_ID=%s;

-- 3. Determine which stats ids are now orphaned
SELECT s.STATS_ID
FROM stats s
WHERE s.STATS_ID IN (%s, %s, ...)
  AND NOT EXISTS (
      SELECT 1
      FROM stat_match sm
      WHERE sm.STATS_ID = s.STATS_ID
  );

-- Delete player_stats links for orphaned stats
DELETE FROM player_stats WHERE STATS_ID IN (%s, %s, ...);

-- Delete orphaned stats rows
DELETE FROM stats WHERE STATS_ID IN (%s, %s, ...);

-- 4. Delete the match row itself
DELETE FROM `match` WHERE MATCH_ID=%s;


-- If MATCH_ID is supplied:
INSERT INTO `match` (MATCH_ID, TEAM_ONE, TEAM_TWO, WINNING_TEAM, STADIUM)
VALUES (%s, %s, %s, %s, %s);

-- If MATCH_ID is not supplied:
INSERT INTO `match` (TEAM_ONE, TEAM_TWO, WINNING_TEAM, STADIUM)
VALUES (%s, %s, %s, %s);


SELECT TEAM_ID FROM team WHERE TEAM_ID = %s;
SELECT TEAM_ID FROM team WHERE TEAM_NAME = %s;



SELECT p.PLAYER_ID, p.PLAYER_NAME,
       s.STATS_ID, s.GOALS, s.ASSISTS, s.FOULS, s.YELLOW_CARDS, s.RED_CARDS, s.MINUTES_PLAYED
FROM player_team pt
JOIN player p ON pt.PLAYER_ID = p.PLAYER_ID
LEFT JOIN (
    SELECT ps.PLAYER_ID, st.*
    FROM stat_match sm
    JOIN stats st ON st.STATS_ID = sm.STATS_ID
    JOIN player_stats ps ON ps.STATS_ID = sm.STATS_ID
    WHERE sm.MATCH_ID = %s
) s ON s.PLAYER_ID = p.PLAYER_ID
WHERE pt.TEAM_ID = %s
GROUP BY p.PLAYER_ID, p.PLAYER_NAME, s.STATS_ID, s.GOALS, s.ASSISTS, s.FOULS, s.YELLOW_CARDS, s.RED_CARDS, s.MINUTES_PLAYED;



UPDATE stats
SET GOALS=%s, ASSISTS=%s, FOULS=%s, YELLOW_CARDS=%s, RED_CARDS=%s, MINUTES_PLAYED=%s
WHERE STATS_ID = %s;


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


SELECT * FROM player_match_performance_view;



SELECT PLAYER_ID, PLAYER_NAME, GOALS, ASSISTS, FOULS, YELLOW_CARDS, RED_CARDS, MINUTES_PLAYED
FROM player_match_performance_view
WHERE MATCH_ID = %s;



SELECT 
    t.TEAM_NAME,
    SUM(s.GOALS) AS TOTAL_GOALS,
    SUM(s.ASSISTS) AS TOTAL_ASSISTS,
    SUM(s.FOULS) AS TOTAL_FOULS,
    SUM(s.YELLOW_CARDS) AS TOTAL_YELLOW_CARDS,
    SUM(s.RED_CARDS) AS TOTAL_RED_CARDS,
    SUM(s.MINUTES_PLAYED) AS TOTAL_MINUTES_PLAYED
FROM team_match tm
JOIN team t 
    ON tm.TEAM_ID = t.TEAM_ID
JOIN player_team pt 
    ON t.TEAM_ID = pt.TEAM_ID
JOIN player p 
    ON pt.PLAYER_ID = p.PLAYER_ID
JOIN player_stats ps 
    ON p.PLAYER_ID = ps.PLAYER_ID
JOIN stat_match sm 
    ON ps.STATS_ID = sm.STATS_ID
JOIN stats s 
    ON ps.STATS_ID = s.STATS_ID
WHERE tm.MATCH_ID = %s
  AND sm.MATCH_ID = %s
GROUP BY t.TEAM_NAME;





