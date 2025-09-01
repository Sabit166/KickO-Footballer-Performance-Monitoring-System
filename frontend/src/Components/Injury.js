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

function InjuriesPage() {
  const [injuries, setInjuries] = useState([]);
  const [newINJURY, setNewINJURY] = useState({
    INJURY_CASE_ID: "",
    MEDICAL_REPORT: "",
    RESTING_PERIOD: "",
    iNJURY_DATE: "",
    SEVERITY: "",
    TYPE: "",
  });

  // Fetch injuries from Flask backend
  const fetchInjuries = async () => {
    try {
      const res = await fetch("http://localhost:5000/injury"); // Flask GET route
      if (!res.ok) throw new Error("Failed to fetch injuries");
      const data = await res.json();
      console.log(data);
      setInjuries(data);
    } catch (error) {
      console.error("Error fetching injuries:", error);
    }
  };

  useEffect(() => {
    fetchInjuries();
  }, []);

  const handleAddInjury = async () => {
    if (!newINJURY.INJURY_CASE_ID) {
      return alert("Injury Case ID required!");
    }
    try {
      const res = await fetch("http://localhost:5000/injury", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          INJURY_CASE_ID: newINJURY.INJURY_CASE_ID,
          MEDICAL_REPORT: newINJURY.MEDICAL_REPORT,
          RESTING_PERIOD: newINJURY.RESTING_PERIOD,
          INJURY_DATE: newINJURY.iNJURY_DATE,
          SEVERITY: newINJURY.SEVERITY,
          TYPE: newINJURY.TYPE,
        }),
      });
      if (!res.ok) throw new Error("Failed to add injury");
      setNewINJURY({INJURY_CASE_ID: "", MEDICAL_REPORT: "", RESTING_PERIOD: "", iNJURY_DATE: "", SEVERITY: "", TYPE: "" });
      fetchInjuries(); // Refresh list after adding
    } catch (error) {
      console.error("Error adding injury:", error);
    }
  };

  const handleDeleteInjury = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/injury/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete injury");
      fetchInjuries(); // Refresh list after deleting
    } catch (error) {
      console.error("Error deleting injury:", error);
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
              label="Injury Case ID"
              variant="outlined"
              value={newINJURY.INJURY_CASE_ID}
              onChange={(e) => setNewINJURY({ ...newINJURY, INJURY_CASE_ID: e.target.value })}
              fullWidth
              sx={{ flex: "1" }}
            />
            <TextField
              label="Medical Report"
              variant="outlined"
              value={newINJURY.MEDICAL_REPORT}
              onChange={(e) => setNewINJURY({ ...newINJURY, MEDICAL_REPORT: e.target.value })}
              fullWidth
              sx={{ flex: "1" }}
            />
            <TextField
              label="Resting Period (days)"
              type="number"
              variant="outlined"
              value={newINJURY.RESTING_PERIOD}
              onChange={(e) => setNewINJURY({ ...newINJURY, RESTING_PERIOD: e.target.value })}
              sx={{ width: "150px" }}
            />
            <TextField
              label="Injury Date"
              type="date"
              variant="outlined"
              value={newINJURY.iNJURY_DATE}
              onChange={(e) => setNewINJURY({ ...newINJURY, iNJURY_DATE: e.target.value })}
              sx={{ width: "200px" }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Severity"
              variant="outlined"
              value={newINJURY.SEVERITY}
              onChange={(e) => setNewINJURY({ ...newINJURY, SEVERITY: e.target.value })}
              sx={{ width: "150px" }}
            />
            <TextField
              label="Type"
              variant="outlined"
              value={newINJURY.TYPE}
              onChange={(e) => setNewINJURY({ ...newINJURY, TYPE: e.target.value })}
              sx={{ width: "150px" }}
            />
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={handleAddInjury}
              sx={{ height: "56px", fontWeight: "bold" }}
            >
              Add Injury
            </Button>
          </Box>

          {/* Injuries Table */}
          <TableContainer component={Paper} sx={{ bgcolor: "rgba(255,255,255,0.9)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Injury Case ID</strong></TableCell>
                  <TableCell><strong>Medical Report</strong></TableCell>
                  <TableCell><strong>Resting Period</strong></TableCell>
                  <TableCell><strong>Injury Date</strong></TableCell>
                  <TableCell><strong>Severity</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {injuries.map((injury) => (
                  <TableRow key={injury.INJURY_CASE_ID}>
                    <TableCell>{injury.INJURY_CASE_ID}</TableCell>
                    <TableCell>{injury.MEDICAL_REPORT}</TableCell>
                    <TableCell>{injury.RESTING_PERIOD}</TableCell>
                    <TableCell>{injury.INJURY_DATE}</TableCell>
                    <TableCell>{injury.SEVERITY}</TableCell>
                    <TableCell>{injury.TYPE}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => handleDeleteInjury(injury.INJURY_CASE_ID)}>
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

export default InjuriesPage;
