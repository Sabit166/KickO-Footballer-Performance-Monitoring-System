import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const PlayersPage = () => {
  const { email } = useOutletContext(); // using email for individual player fetch
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch players
  const fetchPlayers = async () => {
    try {
      console.log("Email being sent:", email);

      // Fetch only the logged-in player's info (using email)
      const response = await axios.get(`http://localhost:5000/players/email/${email}`);
      setPlayers(response.data ? [response.data] : []);
    } catch (err) {
      setError("Failed to fetch players. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Player
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Player ID</strong></TableCell>
              <TableCell><strong>Player Name</strong></TableCell>
              <TableCell><strong>Height</strong></TableCell>
              <TableCell><strong>Weight</strong></TableCell>
              <TableCell><strong>Contract</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              {/* <TableCell align="center"><strong>Actions</strong></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {players.length > 0 ? (
              players.map((player) => (
                <TableRow key={player.PLAYER_ID}>
                  <TableCell>{player.PLAYER_ID}</TableCell>
                  <TableCell>{player.PLAYER_NAME}</TableCell>
                  <TableCell>{player.HEIGHT}</TableCell>
                  <TableCell>{player.WEIGHT}</TableCell>
                  <TableCell>{player.CONTRACT}</TableCell>
                  <TableCell>{player.EMAIL}</TableCell>
                  {/* <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.2)",
                        color: "white",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                        borderRadius: "20px",
                      }}
                    >
                      View
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No players found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PlayersPage;
