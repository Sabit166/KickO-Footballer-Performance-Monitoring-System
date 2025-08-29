import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper
} from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import backgroundImage from "../background_home.png";

function MatchPage() {
  const [matches, setMatches] = useState([]);
  const [scorecards, setScorecards] = useState({});
  const [scorers, setScorers] = useState({});
  const [newMatch, setNewMatch] = useState({
    MATCH_ID: "",
    TEAM_ONE: "",
    TEAM_TWO: "",
    STADIUM: "",
    WINNING_TEAM: "",
  });

  // (Old renderTeam removed in new scoreboard design)

  // Helpers for new scoreboard layout
  const getTeamGoals = (match, teamName) => {
    const sc = scorecards[match.MATCH_ID];
    if (!sc) return null;
    const row = sc.find(r => r.TEAM_NAME === teamName);
    return row ? row.TOTAL_GOALS : null;
  };

  const winnerColor = (match, teamName) => {
    const winValue = (match.WINNING_TEAM || '').trim();
    if (!winValue) return '#fff';
    if (/^(draw|tie|d)$/i.test(winValue)) return '#ffeb3b';
    if (winValue === teamName) return '#2196f3';
    return '#f44336';
  };

  const cleanPlayerName = (name) => {
    // Remove time markers like 51', 90+4', and parenthetical notes
    return name.replace(/\s*\d+(?:\+\d+)?'(?:\s*\([^)]*\))?/g, '').trim();
  };

  const splitScorersByTeam = (match) => {
    const list = scorers[match.MATCH_ID] || [];
    const t1 = (match.TEAM_ONE || '').trim();
    const t2 = (match.TEAM_TWO || '').trim();
    const teamOneScorers = [];
    const teamTwoScorers = [];
    const unknown = [];

    // First pass: push scorers that have an explicit team name
    list.forEach(s => {
      const teamField = s.TEAM_NAME || s.TEAM || s.team || s.PLAYER_TEAM || s.player_team || '';
      if (teamField === t1) teamOneScorers.push(s);
      else if (teamField === t2) teamTwoScorers.push(s);
      else unknown.push(s); // store for inference
    });

    // Infer totals from scorecard to intelligently assign unknown scorers
    const t1GoalsTotal = parseInt(getTeamGoals(match, t1)) || 0;
    const t2GoalsTotal = parseInt(getTeamGoals(match, t2)) || 0;
    let t1Assigned = teamOneScorers.reduce((sum, s) => sum + (parseInt(s.GOALS) || 1), 0);
    let t2Assigned = teamTwoScorers.reduce((sum, s) => sum + (parseInt(s.GOALS) || 1), 0);

    // Distribute unknown scorers based on remaining goals needed; if no data, alternate
    let alternateFlag = 0;
    unknown.forEach(s => {
      const value = parseInt(s.GOALS) || 1;
      const t1Remaining = t1GoalsTotal - t1Assigned;
      const t2Remaining = t2GoalsTotal - t2Assigned;
      if (t1Remaining > 0 || t2Remaining > 0) {
        if (t1Remaining > t2Remaining) {
          teamOneScorers.push(s); t1Assigned += value; return;
        }
        if (t2Remaining > t1Remaining) {
          teamTwoScorers.push(s); t2Assigned += value; return;
        }
        // Equal remaining -> alternate
      }
      if (alternateFlag % 2 === 0) { teamOneScorers.push(s); t1Assigned += value; }
      else { teamTwoScorers.push(s); t2Assigned += value; }
      alternateFlag++;
    });

    return { teamOneScorers, teamTwoScorers };
  };

  const GoalIcons = ({ count }) => {
    if (!count || count < 1) return null;
    const safe = Math.min(count, 10); // cap to avoid excessive rendering
    return (
      <Box sx={{ display: 'flex', gap: 0.3 }}>
        {Array.from({ length: safe }).map((_, i) => (
          <SportsSoccerIcon key={i} sx={{ fontSize: 16 }} />
        ))}
        {count > safe && (
          <Typography variant="caption" sx={{ ml: 0.5 }}>+{count - safe}</Typography>
        )}
      </Box>
    );
  };

  // Fetch matches from Flask backend
  const fetchMatches = async () => {
    try {
      const res = await fetch("http://localhost:5000/matches"); // Flask GET route
      if (!res.ok) throw new Error("Failed to fetch matches");
      const data = await res.json();
      setMatches(data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // Once matches are loaded, fetch scorecards and scorers for each match
  useEffect(() => {
    if (matches.length > 0) {
      matches.forEach(match => {
        // Fetch team scorecard for the match
        fetch(`http://localhost:5000/matches/${match.MATCH_ID}/scorecard`)
          .then((res) => res.json())
          .then((data) =>
            setScorecards(prev => ({ ...prev, [match.MATCH_ID]: data }))
          )
          .catch(error => console.error("Scorecard error:", error));

        // Fetch scorers for the match
        fetch(`http://localhost:5000/matches/${match.MATCH_ID}/scorers`)
          .then((res) => res.json())
          .then((data) =>
            setScorers(prev => ({ ...prev, [match.MATCH_ID]: data }))
          )
          .catch(error => console.error("Scorers error:", error));
      });
    }
  }, [matches]);

  const handleAddMatch = async () => {
    if (!newMatch.MATCH_ID) {
      return alert("Match Identification Number required!");
    }
    try {
      const res = await fetch("http://localhost:5000/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          MATCH_ID: newMatch.MATCH_ID,
          TEAM_ONE: newMatch.TEAM_ONE,
          TEAM_TWO: newMatch.TEAM_TWO,
          STADIUM: newMatch.STADIUM,
          WINNING_TEAM: newMatch.WINNING_TEAM,
        }),
      });
      if (!res.ok) throw new Error("Failed to add match");
      setNewMatch({
        MATCH_ID: "",
        TEAM_ONE: "",
        TEAM_TWO: "",
        STADIUM: "",
        WINNING_TEAM: ""
      });
      fetchMatches(); // Refresh list after adding
    } catch (error) {
      console.error("Error adding match:", error);
    }
  };

  const handleDeleteMatch = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/matches/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete match");
      fetchMatches(); // Refresh list after deleting
    } catch (error) {
      console.error("Error deleting match:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(8px)",
            p: 4,
            borderRadius: 3,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              letterSpacing: 2,
              textShadow: "2px 2px 8px rgba(0,0,0,0.7)"
            }}
          >
            Match Management
          </Typography>

          {/* Add Match Form */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              mb: 4,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              p: 2,
              borderRadius: 2,
            }}
          >
            <TextField
              label="Match ID"
              variant="outlined"
              value={newMatch.MATCH_ID}
              onChange={(e) =>
                setNewMatch({ ...newMatch, MATCH_ID: e.target.value })
              }
              fullWidth
              sx={{ flex: "1" }}
            />
            <TextField
              label="Team One"
              variant="outlined"
              value={newMatch.TEAM_ONE}
              onChange={(e) =>
                setNewMatch({ ...newMatch, TEAM_ONE: e.target.value })
              }
              fullWidth
              sx={{ flex: "1" }}
            />
            <TextField
              label="Team Two"
              variant="outlined"
              value={newMatch.TEAM_TWO}
              onChange={(e) =>
                setNewMatch({ ...newMatch, TEAM_TWO: e.target.value })
              }
              fullWidth
              sx={{ flex: "1" }}
            />
            <TextField
              label="Stadium"
              variant="outlined"
              value={newMatch.STADIUM}
              onChange={(e) =>
                setNewMatch({ ...newMatch, STADIUM: e.target.value })
              }
              sx={{ width: "200px" }}
            />
            <TextField
              label="Winning Team"
              variant="outlined"
              value={newMatch.WINNING_TEAM}
              onChange={(e) =>
                setNewMatch({ ...newMatch, WINNING_TEAM: e.target.value })
              }
              sx={{ width: "200px" }}
            />
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={handleAddMatch}
              sx={{ height: "56px", fontWeight: "bold" }}
            >
              Add Match
            </Button>
          </Box>

          {/* Match List with Scorecard and Scorers */}
          <Box sx={{ mt: 2 }}>
            {matches.map(match => {
              const g1 = getTeamGoals(match, match.TEAM_ONE) ?? '-';
              const g2 = getTeamGoals(match, match.TEAM_TWO) ?? '-';
              const { teamOneScorers, teamTwoScorers } = splitScorersByTeam(match);
              return (
                <Paper key={match.MATCH_ID} elevation={4} sx={{ mb: 3, px: 4, py: 3.5, bgcolor: 'rgba(0,0,0,0.55)', color: '#fff', borderRadius: 1.5, position: 'relative' }}>
                  {/* Header row: could show status; using WINNING_TEAM presence for now */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, fontSize: 14, opacity: 0.85 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      {match.MATCH_ID ? `Match #${match.MATCH_ID}` : ''}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      {match.WINNING_TEAM ? (/^(draw|tie|d)$/i.test(match.WINNING_TEAM) ? 'Full-time (Draw)' : 'Full-time') : ''}
                    </Typography>
                  </Box>
                  {/* Main scoreboard row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <Box sx={{ textAlign: 'center', minWidth: 140 }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: winnerColor(match, match.TEAM_ONE) }}>{match.TEAM_ONE || 'Team One'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h2" sx={{ fontWeight: 'bold', lineHeight: 1, color: winnerColor(match, match.TEAM_ONE) }}>{g1}</Typography>
                      <Typography variant="h3" sx={{ fontWeight: 'bold', opacity: 0.6 }}>-</Typography>
                      <Typography variant="h2" sx={{ fontWeight: 'bold', lineHeight: 1, color: winnerColor(match, match.TEAM_TWO) }}>{g2}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', minWidth: 140 }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: winnerColor(match, match.TEAM_TWO) }}>{match.TEAM_TWO || 'Team Two'}</Typography>
                    </Box>
                    <IconButton size="small" color="error" onClick={() => handleDeleteMatch(match.MATCH_ID)} sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  {/* Stadium */}
                  <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold', textAlign: 'center', bgcolor: 'rgba(255,255,255,0.08)', p: 1, borderRadius: 1, fontStyle: match.STADIUM ? 'normal' : 'italic', letterSpacing: 0.5 }}>
                    {match.STADIUM ? `Stadium: ${match.STADIUM}` : 'Stadium not set'}
                  </Typography>
                  {/* Scorers split by team */}
                  {(teamOneScorers.length > 0 || teamTwoScorers.length > 0) && (
                    <Box sx={{ mt: 2, display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                      <Box sx={{ minWidth: 200 }}>
                        {teamOneScorers.map(s => (
                          <Box key={s.PLAYER_NAME + s.GOALS} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{cleanPlayerName(s.PLAYER_NAME)}</Typography>
                            <GoalIcons count={s.GOALS} />
                          </Box>
                        ))}
                      </Box>
                      <Box sx={{ minWidth: 200 }}>
                        {teamTwoScorers.map(s => (
                          <Box key={s.PLAYER_NAME + s.GOALS} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{cleanPlayerName(s.PLAYER_NAME)}</Typography>
                            <GoalIcons count={s.GOALS} />
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Paper>
              );
            })}
            {matches.length === 0 && (
              <Typography variant="body1" sx={{ color: "#fff", opacity: 0.8 }}>
                No matches yet. Add one above.
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default MatchPage;