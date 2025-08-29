SELECT p.PLAYER_NAME, s.GOALS
FROM stat_match sm
JOIN stats s ON sm.STATS_ID = s.STATS_ID
JOIN player_stats ps ON s.STATS_ID = ps.STATS_ID
JOIN player p ON ps.PLAYER_ID = p.PLAYER_ID
WHERE sm.MATCH_ID = '501'
  AND s.GOALS > 0;