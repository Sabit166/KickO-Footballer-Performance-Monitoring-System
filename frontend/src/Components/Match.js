import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
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

  // Fetch matches from Flask backend
  const fetchMatches = async () => {
    try {
      const res = await fetch("http://localhost:5000/match"); // Flask GET route
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
      const res = await fetch("http://localhost:5000/match", {
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
      const res = await fetch(`http://localhost:5000/match/${id}`, {
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

          {/* Matches Table */}
          <TableContainer component={Paper} sx={{ bgcolor: "rgba(255,255,255,0.9)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>MATCH ID</strong></TableCell>
                  <TableCell><strong>Team One</strong></TableCell>
                  <TableCell><strong>Team Two</strong></TableCell>
                  <TableCell><strong>Stadium</strong></TableCell>
                  <TableCell><strong>Winning Team</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matches.map((match) => (
                  <TableRow key={match.MATCH_ID}>
                    <TableCell>{match.MATCH_ID}</TableCell>
                    <TableCell>{match.TEAM_ONE}</TableCell>
                    <TableCell>{match.TEAM_TWO}</TableCell>
                    <TableCell>{match.STADIUM}</TableCell>
                    <TableCell>{match.WINNING_TEAM}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => handleDeleteMatch(match.MATCH_ID)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
}

export default MatchPage;
