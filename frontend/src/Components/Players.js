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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import backgroundImage from "../background_home.png";
import axios from "axios";
import { useOutletContext } from 'react-router-dom';

function PlayersPage() {
  const { role, teamid } = useOutletContext();
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    PLAYER_ID: "",
    PLAYER_NAME: "",
    HEIGHT: "",
    WEIGHT: "",
    POSITION: "",
    CONTRACT: "",
    EMAIL: "",
  });
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch players from Flask backend
  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/players");
      const data = response.data;
      setPlayers(data);
    } catch (error) {
      setError("Failed to fetch players. Please try again.");
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
          PLAYER_ID: newPlayer.PLAYER_ID,
          PLAYER_NAME: newPlayer.PLAYER_NAME,
          HEIGHT: newPlayer.HEIGHT,
          WEIGHT: newPlayer.WEIGHT,
          CONTRACT: newPlayer.CONTRACT,
          EMAIL: newPlayer.EMAIL,
        }),
      });
      if (!res.ok) throw new Error("Failed to add player");
      setNewPlayer({ PLAYER_ID: "", PLAYER_NAME: "", HEIGHT: "", WEIGHT: "", CONTRACT: "", EMAIL: "" });
      setOpenDialog(false); // Close dialog after adding
      fetchPlayers(); // Refresh list after adding
    } catch (error) {
      // Handle error silently or show user-friendly message
    }
  };

  const makePlayerId = () => {
    let date_ = Date.now();
    let random_number = Math.floor(Math.random() * 1000) + 1;
    let player_id_number = (date_ % random_number) % 300;
    return `${teamid}pl${player_id_number}`;
  }

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewPlayer({ PLAYER_ID: "", PLAYER_NAME: "", HEIGHT: "", WEIGHT: "", CONTRACT: "", EMAIL: "" });
  };

  const handleDeletePlayer = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/players/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete player");
      fetchPlayers(); // Refresh list after deleting
    } catch (error) {
      // Handle error silently or show user-friendly message
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        banckgroundColor: "#000000ff",
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

          {/* Add Player Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => {
                setOpenDialog(true);
                setNewPlayer(prev => ({ ...prev, PLAYER_ID: makePlayerId() }));
              }}
              sx={{
                fontWeight: "bold",
                borderRadius: "10px",
                px: 3,
                py: 1.5,
                fontSize: "16px"
              }}
            >
              Add Player
            </Button>
          </Box>

          {/* Players Table */}
          <TableContainer
            component={Paper}
            sx={{
              bgcolor: "rgba(255,255,255,0.95)",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              backdropFilter: "blur(10px)",
              overflow: "hidden"
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "rgba(25, 118, 210, 0.1)" }}>
                  <TableCell sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#1976d2",
                    borderBottom: "2px solid #1976d2",
                    py: 2
                  }}>
                    PLAYER ID
                  </TableCell>
                  <TableCell sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#1976d2",
                    borderBottom: "2px solid #1976d2",
                    py: 2
                  }}>
                    Name
                  </TableCell>
                  <TableCell sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#1976d2",
                    borderBottom: "2px solid #1976d2",
                    py: 2
                  }}>
                    Email
                  </TableCell>
                  <TableCell sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#1976d2",
                    borderBottom: "2px solid #1976d2",
                    py: 2
                  }}>
                    Height (cm)
                  </TableCell>
                  <TableCell sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#1976d2",
                    borderBottom: "2px solid #1976d2",
                    py: 2
                  }}>
                    Weight (kg)
                  </TableCell>
                  <TableCell sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#1976d2",
                    borderBottom: "2px solid #1976d2",
                    py: 2
                  }}>
                    Contract
                  </TableCell>
                  <TableCell align="center" sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#1976d2",
                    borderBottom: "2px solid #1976d2",
                    py: 2
                  }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((player, index) => (
                  <TableRow
                    key={player.PLAYER_ID}
                    sx={{
                      bgcolor: index % 2 === 0 ? "rgba(255,255,255,0.7)" : "rgba(245,245,245,0.7)",
                      '&:hover': {
                        bgcolor: "rgba(25, 118, 210, 0.08)",
                        transform: "scale(1.01)",
                        transition: "all 0.2s ease-in-out",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                      },
                      transition: "all 0.2s ease-in-out"
                    }}
                  >
                    <TableCell sx={{
                      py: 2.5,
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#333"
                    }}>
                      {player.PLAYER_ID}
                    </TableCell>
                    <TableCell sx={{
                      py: 2.5,
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#333"
                    }}>
                      {player.PLAYER_NAME}
                    </TableCell>
                    <TableCell sx={{
                      py: 2.5,
                      fontSize: "14px",
                      color: "#666"
                    }}>
                      {player.EMAIL}
                    </TableCell>
                    <TableCell sx={{
                      py: 2.5,
                      fontSize: "14px",
                      color: "#666"
                    }}>
                      {player.HEIGHT}
                    </TableCell>
                    <TableCell sx={{
                      py: 2.5,
                      fontSize: "14px",
                      color: "#666"
                    }}>
                      {player.WEIGHT}
                    </TableCell>
                    <TableCell sx={{
                      py: 2.5,
                      fontSize: "14px",
                      color: "#666",
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}>
                      {player.CONTRACT}
                    </TableCell>
                    <TableCell align="center" sx={{ py: 2.5 }}>
                      <IconButton
                        color="error"
                        onClick={() => handleDeletePlayer(player.PLAYER_ID)}
                        sx={{
                          '&:hover': {
                            bgcolor: "rgba(244, 67, 54, 0.1)",
                            transform: "scale(1.1)"
                          },
                          transition: "all 0.2s ease-in-out"
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Add Player Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                bgcolor: "rgba(0, 0, 0, 0.78)",
                backdropFilter: "blur(10px)",
                borderRadius: 3,
              }
            }}
          >
            <DialogTitle sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#152330ff",
              color: "white",
              fontWeight: "bold",
              height: "50px",
              marginBottom: "10px"
            }}>
              Add New Player
              <IconButton
                onClick={handleDialogClose}
                sx={{ color: "white" }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Stack spacing={3}>
                <TextField
                  label="Player ID"
                  variant="outlined"
                  value={newPlayer.PLAYER_ID}
                  onChange={(e) => setNewPlayer({ ...newPlayer, PLAYER_ID: e.target.value })}
                  fullWidth
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
                <TextField
                  label="Player Name"
                  variant="outlined"
                  value={newPlayer.PLAYER_NAME}
                  onChange={(e) => setNewPlayer({ ...newPlayer, PLAYER_NAME: e.target.value })}
                  fullWidth
                  required
                  sx={{
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={newPlayer.EMAIL}
                  onChange={(e) => setNewPlayer({ ...newPlayer, EMAIL: e.target.value })}
                  fullWidth
                  required
                  sx={{
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    label="Height (cm)"
                    type="number"
                    variant="outlined"
                    value={newPlayer.HEIGHT}
                    onChange={(e) => setNewPlayer({ ...newPlayer, HEIGHT: e.target.value })}
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": { color: "white" },
                      "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" },
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                  <TextField
                    label="Weight (kg)"
                    type="number"
                    variant="outlined"
                    value={newPlayer.WEIGHT}
                    onChange={(e) => setNewPlayer({ ...newPlayer, WEIGHT: e.target.value })}
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": { color: "white" },
                      "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" },
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                </Box>
                <TextField
                  label="Contract Details"
                  variant="outlined"
                  value={newPlayer.CONTRACT}
                  onChange={(e) => setNewPlayer({ ...newPlayer, CONTRACT: e.target.value })}
                  fullWidth
                  multiline
                  rows={3}
                  sx={{
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 2 }}>
              <Button
                onClick={handleDialogClose}
                variant="outlined"
                sx={{
                  borderRadius: "10px",
                  px: 3,
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)"
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddPlayer}
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: "10px",
                  px: 3,
                  fontWeight: "bold",
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)"
                  }
                }}
              >
                Add Player
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </Box>
  );
}

export default PlayersPage;
