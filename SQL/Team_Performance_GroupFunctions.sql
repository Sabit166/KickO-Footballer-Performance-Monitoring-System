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