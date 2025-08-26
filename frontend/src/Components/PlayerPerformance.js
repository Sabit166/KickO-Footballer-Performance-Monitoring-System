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

function PlayersPerformancePage() {
  const [player_performance, setPlayer_performance] = useState([]);

  // Fetch players from Flask backend
  const fetchPlayersPerformance = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/playerperformance");
      const data = response.data;
      setPlayers(data);
    } catch (error) {
      setError("Failed to fetch players performance. Please try again.");
    }
  };

  useEffect(() => {
    fetchPlayersPerformance();
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
            Player Performance Overview
          </Typography>

          {/* Players Performance Table */}
          <TableContainer component={Paper} sx={{ bgcolor: "rgba(255,255,255,0.9)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>PLAYER ID</strong></TableCell>
                  <TableCell><strong>PLAYER NAME</strong></TableCell>
                  <TableCell><strong>GOALS</strong></TableCell>
                  <TableCell><strong>ASSISTS</strong></TableCell>
                  <TableCell><strong>FOULS</strong></TableCell>
                  <TableCell><strong>YELLOW CARDS</strong></TableCell>
                  <TableCell><strong>RED CARDS</strong></TableCell>
                  <TableCell><strong>MINUTES PLAYED</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {player_performance.map((player) => (
                  <TableRow key={player.PLAYER_ID}>
                    <TableCell>{player.PLAYER_ID}</TableCell>
                    <TableCell>{player.PLAYER_NAME}</TableCell>
                    <TableCell>{player.GOALS}</TableCell>
                    <TableCell>{player.ASSISTS}</TableCell>
                    <TableCell>{player.FOULS}</TableCell>
                    <TableCell>{player.YELLOW_CARDS}</TableCell>
                    <TableCell>{player.RED_CARDS}</TableCell>
                    <TableCell>{player.MINUTES_PLAYED}</TableCell>
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
