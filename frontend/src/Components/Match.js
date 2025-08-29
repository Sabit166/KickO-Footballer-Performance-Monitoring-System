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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import backgroundImage from "../background_home.png";

function MatchPage() {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({
    MATCH_ID: "",
    TEAM_ONE: "",
    TEAM_TWO: "",
    STADIUM: "",
    WINNING_TEAM: "",
  });

  // Helper to render a team name with a colored spot
  const renderTeam = (teamName, match) => {
    if (!teamName) return <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Unknown</Typography>;
  const winValue = (match.WINNING_TEAM || '').trim();
  const isDraw = /^(draw|tie|d)$/i.test(winValue);
  const isWinner = !isDraw && winValue && winValue === teamName;
  const otherTeam = teamName === match.TEAM_ONE ? match.TEAM_TWO : match.TEAM_ONE;
  const losingCandidate = !isDraw && winValue && (otherTeam && winValue === otherTeam);
  const isLoser = !isWinner && losingCandidate; // mark loser only if not draw
  const color = isDraw ? '#ffeb3b' : (isWinner ? '#2196f3' : (isLoser ? '#f44336' : 'transparent'));
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            bgcolor: color,
            border: color === 'transparent' ? '1px solid rgba(255,255,255,0.3)' : 'none'
          }}
      title={isDraw ? 'Draw' : (isWinner ? 'Winner' : (isLoser ? 'Loser' : 'No result yet'))}
        />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{teamName}</Typography>
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
      setNewMatch({MATCH_ID: "", TEAM_ONE: "", TEAM_TWO: "", STADIUM: "", WINNING_TEAM: "" });
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
              onChange={(e) => setNewMatch({ ...newMatch, MATCH_ID: e.target.value })}
              fullWidth
              sx={{ flex: "1" }}
            />
            <TextField
              label="Team One"
              variant="outlined"
              value={newMatch.TEAM_ONE}
              onChange={(e) => setNewMatch({ ...newMatch, TEAM_ONE: e.target.value })}
              fullWidth
              sx={{ flex: "1" }}
            />
            <TextField
              label="Team Two"
              variant="outlined"
              value={newMatch.TEAM_TWO}
              onChange={(e) => setNewMatch({ ...newMatch, TEAM_TWO: e.target.value })}
              fullWidth
              sx={{ flex: "1" }}
            />
            <TextField
              label="Stadium"
              variant="outlined"
              value={newMatch.STADIUM}
              onChange={(e) => setNewMatch({ ...newMatch, STADIUM: e.target.value })}
              sx={{ width: "200px" }}
            />
            <TextField
              label="Winning Team"
              variant="outlined"
              value={newMatch.WINNING_TEAM}
              onChange={(e) => setNewMatch({ ...newMatch, WINNING_TEAM: e.target.value })}
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

          {/* Scoreboard Style List (Sequential) */}
          <Box sx={{ mt: 2 }}>
            {matches.map((match) => (
              <Paper
                key={match.MATCH_ID}
                elevation={4}
                sx={{
                  mb: 2,
                  px: 4,
                  py: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  bgcolor: 'rgba(0,0,0,0.55)',
                  color: '#fff',
                  borderRadius: 1,
                  minHeight: 140,
                  position: 'relative'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, width: '100%', position: 'relative' }}>
                  {renderTeam(match.TEAM_ONE || 'Team One', match)}
                  <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 'bold' }}>vs</Typography>
                  {renderTeam(match.TEAM_TWO || 'Team Two', match)}
                  <IconButton size="small" color="error" onClick={() => handleDeleteMatch(match.MATCH_ID)} sx={{ position: 'absolute', top: 4, right: 4 }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    letterSpacing: 0.5,
                    textAlign: 'center',
                    bgcolor: 'rgba(255,255,255,0.08)',
                    p: 1,
                    borderRadius: 0.5,
                    fontStyle: match.STADIUM ? 'normal' : 'italic',
                    opacity: 0.95
                  }}
                >
                  {match.STADIUM ? `Stadium: ${match.STADIUM}` : 'Stadium not set'}
                </Typography>
              </Paper>
            ))}
            {matches.length === 0 && (
              <Typography variant="body1" sx={{ color: '#fff', opacity: 0.8 }}>
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
