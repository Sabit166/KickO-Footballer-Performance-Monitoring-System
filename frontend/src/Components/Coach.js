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

function CoachPage() {
  const [coaches, setCoaches] = useState([]);
  const [newCoach, setNewCoach] = useState({
    Coach_id: "",
    Coach_name: "",
  });

  // Fetch coaches from Flask backend
  const fetchCoaches = async () => {
    try {
      const res = await fetch("http://localhost:5000/coaches"); // Flask GET route
      if (!res.ok) throw new Error("Failed to fetch coaches");
      const data = await res.json();
      setCoaches(data);
    } catch (error) {
      console.error("Error fetching coaches:", error);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  const handleAddCoach = async () => {
    if (!newCoach.Coach_id || !newCoach.Coach_name) {
      return alert("Coach ID and Name required!");
    }
    try {
      const res = await fetch("http://localhost:5000/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Coach_id: newCoach.Coach_id,
          Coach_name: newCoach.Coach_name,
        }),
      });
      if (!res.ok) throw new Error("Failed to add coach");
      setNewCoach({ Coach_id: "", Coach_name: "" });
      fetchCoaches(); // Refresh list after adding
    } catch (error) {
      console.error("Error adding coach:", error);
    }
  };

  const handleDeleteCoach = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/coach/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete coach");
      fetchCoaches(); // Refresh list after deleting
    } catch (error) {
      console.error("Error deleting coach:", error);
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
            Coach Management
          </Typography>

          {/* Add Coach Form */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 4,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              p: 2,
              borderRadius: 2,
            }}
          >
            <TextField
              label="Coach ID"
              variant="outlined"
              value={newCoach.Coach_id}
              onChange={(e) => setNewCoach({ ...newCoach, Coach_id: e.target.value })}
              sx={{ width: "200px" }}
            />
            <TextField
              label="Coach Name"
              variant="outlined"
              value={newCoach.Coach_name}
              onChange={(e) => setNewCoach({ ...newCoach, Coach_name: e.target.value })}
              sx={{ width: "300px" }}
            />
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={handleAddCoach}
              sx={{ height: "56px", fontWeight: "bold" }}
            >
              Add Coach
            </Button>
          </Box>

          {/* Coaches Table */}
          <TableContainer component={Paper} sx={{ bgcolor: "rgba(255,255,255,0.9)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Coach ID</strong></TableCell>
                  <TableCell><strong>Coach Name</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coaches.map((coach) => (
                  <TableRow key={coach.COACH_ID}>
                    <TableCell>{coach.COACH_ID}</TableCell>
                    <TableCell>{coach.COACH_NAME}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => handleDeleteCoach(coach.Coach_id)}>
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

export default CoachPage;
