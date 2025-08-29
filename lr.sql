SELECT s.GOALS, s.ASSISTS,s.STATS_ID,m.MATCH_ID,t.TEAM_NAME
FROM stats s, stat_match m,team_match tm,team t
WHERE s.STATS_ID = m.STATS_ID AND m.MATCH_ID = tm.MATCH_ID AND tm.TEAM_ID = t.TEAM_ID

select *
from `match`;
