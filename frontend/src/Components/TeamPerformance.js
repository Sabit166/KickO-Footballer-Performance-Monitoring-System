import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import backgroundImage from "../background_home.png";

function TeamPerformancePage() {
  const [team_performance, setTeam_performance] = useState([]);

  // Fetch teams from Flask backend
  const fetchTeamsPerformance = async () => {
    try {
      const res = await fetch("http://localhost:5000/team_performance"); // Flask GET route
      if (!res.ok) throw new Error("Failed to fetch teams performance");
      const data = await res.json();
      console.log(data);
      setTeam_performance(data);
    } catch (error) {
      console.error("Error fetching teams performance:", error);
    }
  };

  useEffect(() => {
    fetchTeamsPerformance();
  }, []);

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
            Team Performance Overview
          </Typography>

          {/* Players Performance Table */}
          <TableContainer component={Paper} sx={{ bgcolor: "rgba(255,255,255,0.9)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>TEAM ID</strong></TableCell>
                  <TableCell><strong>TEAM NAME</strong></TableCell>
                  <TableCell><strong>GOALS</strong></TableCell>
                  <TableCell><strong>ASSISTS</strong></TableCell>
                  <TableCell><strong>FOULS</strong></TableCell>
                  <TableCell><strong>YELLOW CARDS</strong></TableCell>
                  <TableCell><strong>RED CARDS</strong></TableCell>
                  <TableCell><strong>MINUTES PLAYED</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {team_performance.map((team) => (
                  <TableRow key={team.TEAM_ID}>
                    <TableCell>{team.TEAM_ID}</TableCell>
                    <TableCell>{team.TEAM_NAME}</TableCell>
                    <TableCell>{team.TOTAL_GOALS}</TableCell>
                    <TableCell>{team.TOTAL_ASSISTS}</TableCell>
                    <TableCell>{team.TOTAL_FOULS}</TableCell>
                    <TableCell>{team.TOTAL_YELLOW_CARDS}</TableCell>
                    <TableCell>{team.TOTAL_RED_CARDS}</TableCell>
                    <TableCell>{team.TOTAL_MINUTES_PLAYED}</TableCell>
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

export default TeamPerformancePage;
