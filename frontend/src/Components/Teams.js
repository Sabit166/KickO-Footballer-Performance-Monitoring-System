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

function TeamPage() {
  const [team, setTeam] = useState([]);
  const [newTeam, setNewTeam] = useState({
    PLAYER_ID: "",
    PLAYER_NAME: ""
  });

  // Fetch players from Flask backend
  const fetchTeam = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/team");
      const data = response.data;
      setTeams(data);
    } catch (error) {
      setError("Failed to fetch team. Please try again.");
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleAddTeam = async () => {
    if (!newTeam.TEAM_ID) {
      return alert("Team Identification Number required!");
    }
    try {
      const res = await fetch("http://localhost:5000/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          TEAM_ID: newTeam.TEAM_ID,
          TEAM_NAME: newTeam.TEAM_NAME
        }),
      });
      if (!res.ok) throw new Error("Failed to add team");
      setNewTeam({ TEAM_ID: "", TEAM_NAME: "" });
      fetchTeam(); // Refresh list after adding
    } catch (error) {
      // Handle error silently or show user-friendly message
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/teams/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete team");
      fetchTeam(); // Refresh list after deleting
    } catch (error) {
      // Handle error silently or show user-friendly message
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
            Team Management
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
              label="TEAM ID"
              variant="outlined"
              value={newTeam.TEAM_ID}
              onChange={(e) =>
                setNewTeam({
                  ...newTeam,
                  TEAM_ID: e.target.value,
                })
              }
              fullWidth
              sx={{ flex: "1" }}
            />
            <TextField
              label="TEAM NAME"
              variant="outlined"
              value={newTeam.TEAM_NAME}
              onChange={(e) =>
                setNewTeam({
                  ...newTeam,
                  TEAM_NAME: e.target.value,
                })
              }
              fullWidth
              sx={{ flex: "1" }}
            />

            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={handleAddTeam} // ✅ Fixed naming
              sx={{ height: "56px", fontWeight: "bold" }}
            >
              Add Team
            </Button>
          </Box>

          {/* Players Table */}
          <TableContainer component={Paper} sx={{ bgcolor: "rgba(255,255,255,0.9)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>TEAM ID</strong></TableCell>
                  <TableCell><strong>TEAM NAME</strong></TableCell> {/* ✅ Fixed typo */}
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {team.map((team) => (
                  <TableRow key={team.TEAM_ID}>
                    <TableCell>{team.TEAM_ID}</TableCell>
                    <TableCell>{team.TEAM_NAME}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteTeam(team.TEAM_ID)}
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

export default TeamPage;
