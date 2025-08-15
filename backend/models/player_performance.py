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

function PlayersPerformancePage() {
  const [player_performance, setPlayer_performance] = useState([]);
  const [newPlayer_performance, setNewPlayer_performance] = useState({
    PLAYER_ID: "",
    STATS_ID: ""
  });

  // Fetch players from Flask backend
  const fetchPlayersPerformance = async () => {
    try {
      const res = await fetch("http://localhost:5000/player_performance"); // Flask GET route
      if (!res.ok) throw new Error("Failed to fetch players performance");
      const data = await res.json();
      console.log(data);
      setPlayer_performance(data); // ✅ Fixed naming
    } catch (error) {
      console.error("Error fetching players performance:", error);
    }
  };

  useEffect(() => {
    fetchPlayersPerformance();
  }, []);

  const handleAddPlayerPerformance = async () => {
    if (!newPlayer_performance.PLAYER_ID) {
      return alert("Player Identification Number required!");
    }
    try {
      const res = await fetch("http://localhost:5000/player_performance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          PLAYER_ID: newPlayer_performance.PLAYER_ID,
          STATS_ID: newPlayer_performance.STATS_ID
        }),
      });
      if (!res.ok) throw new Error("Failed to add player");
      setNewPlayer_performance({ PLAYER_ID: "", STATS_ID: "" });
      fetchPlayersPerformance(); // Refresh list after adding
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  const handleDeletePlayerPerformance = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/player_performance/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete player performance");
      fetchPlayersPerformance(); // Refresh list after deleting
    } catch (error) {
      console.error("Error deleting player:", error);
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
              textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            }}
          >
            Player Performance Management
          </Typography>

          {/* Add Player Form */}
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
              label="PLAYER ID"
              variant="outlined"
              value={newPlayer_performance.PLAYER_ID}
              onChange={(e) =>
                setNewPlayer_performance({
                  ...newPlayer_performance,
                  PLAYER_ID: e.target.value,
                })
              }
              fullWidth
              sx={{ flex: "1" }}
            />
            <TextField
              label="STATS ID"
              variant="outlined"
              value={newPlayer_performance.STATS_ID}
              onChange={(e) =>
                setNewPlayer_performance({
                  ...newPlayer_performance,
                  STATS_ID: e.target.value,
                })
              }
              fullWidth
              sx={{ flex: "1" }}
            />

            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={handleAddPlayerPerformance} // ✅ Fixed naming
              sx={{ height: "56px", fontWeight: "bold" }}
            >
              Add Player
            </Button>
          </Box>

          {/* Players Table */}
          <TableContainer component={Paper} sx={{ bgcolor: "rgba(255,255,255,0.9)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>PLAYER ID</strong></TableCell>
                  <TableCell><strong>STATS ID</strong></TableCell> {/* ✅ Fixed typo */}
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {player_performance.map((player) => (
                  <TableRow key={player.PLAYER_ID}>
                    <TableCell>{player.PLAYER_ID}</TableCell>
                    <TableCell>{player.STATS_ID}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleDeletePlayerPerformance(player.PLAYER_ID)}
                      >
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

export default PlayersPerformancePage;
