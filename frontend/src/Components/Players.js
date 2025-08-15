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

function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    ID: "",
    PLAYER_NAME: "",
    HEIGHT: "",
    WEIGHT: "",
    POSITION: "",
    CONTRACT: "",
  });

  // Fetch players from Flask backend
  const fetchPlayers = async () => {
    try {
      const res = await fetch("http://localhost:5000/players"); // Flask GET route
      if (!res.ok) throw new Error("Failed to fetch players");
      const data = await res.json();
      console.log(data);
      setPlayers(data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleAddPlayer = async () => {
    if (!newPlayer.PLAYER_ID) {
      return alert("Player Identification Number required!");
    }
    try {
      const res = await fetch("http://localhost:5000/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ID: newPlayer.PLAYER_ID,
          PLAYER_NAME: newPlayer.PLAYER_NAME,
          HEIGHT: newPlayer.HEIGHT,
          WEIGHT: newPlayer.WEIGHT,
          CONTRACT: newPlayer.CONTRACT,
        }),
      });
      if (!res.ok) throw new Error("Failed to add player");
      setNewPlayer({PLAYER_ID: "", PLAYER_NAME: "", HEIGHT: "", WEIGHT: "", CONTRACT: "" });
      fetchPlayers(); // Refresh list after adding
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  const handleDeletePlayer = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/players/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete player");
      fetchPlayers(); // Refresh list after deleting
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
            Player Management
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
              label="ID"
              variant="outlined"
              value={newPlayer.PLAYER_ID}
              onChange={(e) => setNewPlayer({ ...newPlayer, PLAYER_ID: e.target.value })}
              fullWidth
              sx={{ flex: "1" }}
            />
            <TextField
              label="Name"
              variant="outlined"
              value={newPlayer.PLAYER_NAME}
              onChange={(e) => setNewPlayer({ ...newPlayer, PLAYER_NAME: e.target.value })}
              fullWidth
              sx={{ flex: "1" }}
            />
            <TextField
              label="Height (cm)"
              type="number"
              variant="outlined"
              value={newPlayer.HEIGHT}
              onChange={(e) => setNewPlayer({ ...newPlayer, HEIGHT: e.target.value })}
              sx={{ width: "150px" }}
            />
            <TextField
              label="Weight (kg)"
              type="number"
              variant="outlined"
              value={newPlayer.WEIGHT}
              onChange={(e) => setNewPlayer({ ...newPlayer, WEIGHT: e.target.value })}
              sx={{ width: "150px" }}
            />

            <TextField
              label="Contract"
              variant="outlined"
              value={newPlayer.CONTRACT}
              onChange={(e) => setNewPlayer({ ...newPlayer, CONTRACT: e.target.value })}
              sx={{ width: "200px" }}
            />
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={handleAddPlayer}
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
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Height (cm)</strong></TableCell>
                  <TableCell><strong>Weight (kg)</strong></TableCell>
                  <TableCell><strong>Contract</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((player) => (
                  <TableRow key={player.PLAYER_ID}>
                    <TableCell>{player.PLAYER_ID}</TableCell>
                    <TableCell>{player.PLAYER_NAME}</TableCell>
                    <TableCell>{player.HEIGHT}</TableCell>
                    <TableCell>{player.WEIGHT}</TableCell>
                    <TableCell>{player.CONTRACT}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => handleDeletePlayer(player.PLAYER_ID)}>
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

export default PlayersPage;
