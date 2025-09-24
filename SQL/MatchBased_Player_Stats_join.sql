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
                GROUP BY p.PLAYER_ID, p.PLAYER_NAME, s.STATS_ID, s.GOALS, s.ASSISTS, s.FOULS, s.YELLOW_CARDS, s.RED_CARDS, s.MINUTES_PLAYED