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
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Fade,
  Zoom,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HeightIcon from "@mui/icons-material/Height";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DescriptionIcon from "@mui/icons-material/Description";
import SportsIcon from "@mui/icons-material/Sports";
import backgroundImage from "../background_home.png";
import axios from "axios";
import { useOutletContext } from 'react-router-dom';

function PlayersPage() {
  const { role, teamid } = useOutletContext();
  const [players, setPlayers] = useState([]);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
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
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 200, 80, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 165, 0, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ position: 'relative', zIndex: 1, mb: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Fade in timeout={1000}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: 3,
                  textShadow: '0 0 20px rgba(255,255,255,0.3)',
                  background: 'linear-gradient(45deg, #FFD700, #FF6B35, #F7931E)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                ⚽ SQUAD MANAGEMENT
              </Typography>
            </Fade>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 300,
                letterSpacing: 1
              }}
            >
              Manage your team roster with style
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Zoom in timeout={800}>
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {players.length}
                    </Typography>
                    <Typography variant="h6">Total Players</Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
            <Grid item xs={12} md={4}>
              <Zoom in timeout={1000}>
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {teamid || 'N/A'}
                    </Typography>
                    <Typography variant="h6">Team ID</Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
            <Grid item xs={12} md={4}>
              <Zoom in timeout={1200}>
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {role || 'Admin'}
                    </Typography>
                    <Typography variant="h6">Your Role</Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          </Grid>

          {/* Controls Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {/* View Toggle Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={viewMode === 'cards' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('cards')}
                sx={{
                  borderRadius: '20px',
                  px: 3,
                  color: viewMode === 'cards' ? 'white' : '#FFD700',
                  borderColor: '#FFD700',
                  backgroundColor: viewMode === 'cards' ? '#FFD700' : 'transparent',
                  '&:hover': {
                    backgroundColor: viewMode === 'cards' ? '#FFC107' : 'rgba(255,215,0,0.1)',
                  }
                }}
              >
                🎴 Cards View
              </Button>
              <Button
                variant={viewMode === 'table' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('table')}
                sx={{
                  borderRadius: '20px',
                  px: 3,
                  color: viewMode === 'table' ? 'white' : '#FFD700',
                  borderColor: '#FFD700',
                  backgroundColor: viewMode === 'table' ? '#FFD700' : 'transparent',
                  '&:hover': {
                    backgroundColor: viewMode === 'table' ? '#FFC107' : 'rgba(255,215,0,0.1)',
                  }
                }}
              >
                📊 Table View
              </Button>
            </Box>

            {/* Add Player Button */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setOpenDialog(true);
                setNewPlayer(prev => ({ ...prev, PLAYER_ID: makePlayerId() }));
              }}
              sx={{
                background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                fontSize: "16px",
                fontWeight: 'bold',
                boxShadow: '0 4px 20px rgba(255,107,53,0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF5722, #FF9800)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(255,107,53,0.6)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Add New Player
            </Button>
          </Box>
        </Box>

        {/* Players Display */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {viewMode === 'cards' ? (
            // Cards View
            <Grid container spacing={3}>
              {players.map((player, index) => (
                <Grid item xs={12} sm={6} lg={4} key={player.PLAYER_ID}>
                  <Zoom in timeout={300 + index * 100}>
                    <Card
                      sx={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 4,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        '&:hover': {
                          transform: 'translateY(-8px) scale(1.02)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                          border: '1px solid rgba(255,215,0,0.5)',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: `linear-gradient(90deg, #FFD700, #FF6B35, #F7931E)`,
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        {/* Player Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Avatar
                            sx={{
                              width: 60,
                              height: 60,
                              background: 'linear-gradient(45deg, #FFD700, #FF6B35)',
                              fontSize: '24px',
                              fontWeight: 'bold',
                              mr: 2,
                            }}
                          >
                            {player.PLAYER_NAME?.charAt(0) || 'P'}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                mb: 0.5,
                              }}
                            >
                              {player.PLAYER_NAME}
                            </Typography>
                            <Chip
                              label={player.PLAYER_ID}
                              size="small"
                              sx={{
                                background: 'rgba(255,215,0,0.2)',
                                color: '#FFD700',
                                border: '1px solid #FFD700',
                              }}
                            />
                          </Box>
                          <IconButton
                            color="error"
                            onClick={() => handleDeletePlayer(player.PLAYER_ID)}
                            sx={{
                              background: 'rgba(244,67,54,0.1)',
                              '&:hover': {
                                background: 'rgba(244,67,54,0.2)',
                                transform: 'scale(1.1)',
                              },
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>

                        {/* Player Details */}
                        <Stack spacing={2}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmailIcon sx={{ color: '#FFD700', mr: 1 }} />
                            <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                              {player.EMAIL || 'No email'}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <HeightIcon sx={{ color: '#FF6B35', mr: 1 }} />
                              <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                {player.HEIGHT || 'N/A'} cm
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <FitnessCenterIcon sx={{ color: '#F7931E', mr: 1 }} />
                              <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                {player.WEIGHT || 'N/A'} kg
                              </Typography>
                            </Box>
                          </Box>
                          {player.CONTRACT && (
                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <DescriptionIcon sx={{ color: '#4facfe', mr: 1, mt: 0.5 }} />
                              <Typography
                                sx={{
                                  color: 'rgba(255,255,255,0.8)',
                                  fontSize: '0.85rem',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                }}
                              >
                                {player.CONTRACT}
                              </Typography>
                            </Box>
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          ) : (
            // Table View
            <Fade in timeout={500}>
              <TableContainer
                component={Paper}
                sx={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: "blur(20px)",
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.2)',
                  overflow: "hidden",
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, #FFD700, #FF6B35, #F7931E)`,
                  }
                }}
              >
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ background: 'rgba(255,215,0,0.1)' }}>
                      <TableCell sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#FFD700",
                        borderBottom: "2px solid #FFD700",
                        py: 3,
                        background: 'rgba(0,0,0,0.3)'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <SportsIcon sx={{ mr: 1 }} />
                          PLAYER ID
                        </Box>
                      </TableCell>
                      <TableCell sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#FFD700",
                        borderBottom: "2px solid #FFD700",
                        py: 3,
                        background: 'rgba(0,0,0,0.3)'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PersonIcon sx={{ mr: 1 }} />
                          NAME
                        </Box>
                      </TableCell>
                      <TableCell sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#FFD700",
                        borderBottom: "2px solid #FFD700",
                        py: 3,
                        background: 'rgba(0,0,0,0.3)'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <EmailIcon sx={{ mr: 1 }} />
                          EMAIL
                        </Box>
                      </TableCell>
                      <TableCell sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#FFD700",
                        borderBottom: "2px solid #FFD700",
                        py: 3,
                        background: 'rgba(0,0,0,0.3)'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <HeightIcon sx={{ mr: 1 }} />
                          HEIGHT
                        </Box>
                      </TableCell>
                      <TableCell sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#FFD700",
                        borderBottom: "2px solid #FFD700",
                        py: 3,
                        background: 'rgba(0,0,0,0.3)'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <FitnessCenterIcon sx={{ mr: 1 }} />
                          WEIGHT
                        </Box>
                      </TableCell>
                      <TableCell sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#FFD700",
                        borderBottom: "2px solid #FFD700",
                        py: 3,
                        background: 'rgba(0,0,0,0.3)'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <DescriptionIcon sx={{ mr: 1 }} />
                          CONTRACT
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: "#FFD700",
                        borderBottom: "2px solid #FFD700",
                        py: 3,
                        background: 'rgba(0,0,0,0.3)'
                      }}>
                        ACTIONS
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {players.map((player, index) => (
                      <TableRow
                        key={player.PLAYER_ID}
                        sx={{
                          background: index % 2 === 0 
                            ? "rgba(255,255,255,0.05)" 
                            : "rgba(255,255,255,0.02)",
                          '&:hover': {
                            background: "rgba(255,215,0,0.1)",
                            transform: "scale(1.01)",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 20px rgba(255,215,0,0.2)"
                          },
                          transition: "all 0.2s ease"
                        }}
                      >
                        <TableCell sx={{
                          py: 3,
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#FFD700"
                        }}>
                          <Chip
                            label={player.PLAYER_ID}
                            size="small"
                            sx={{
                              background: 'rgba(255,215,0,0.2)',
                              color: '#FFD700',
                              border: '1px solid #FFD700',
                              fontWeight: 'bold'
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{
                          py: 3,
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "white"
                        }}>
                          {player.PLAYER_NAME}
                        </TableCell>
                        <TableCell sx={{
                          py: 3,
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.8)"
                        }}>
                          {player.EMAIL || 'Not provided'}
                        </TableCell>
                        <TableCell sx={{
                          py: 3,
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.8)"
                        }}>
                          {player.HEIGHT ? `${player.HEIGHT} cm` : 'N/A'}
                        </TableCell>
                        <TableCell sx={{
                          py: 3,
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.8)"
                        }}>
                          {player.WEIGHT ? `${player.WEIGHT} kg` : 'N/A'}
                        </TableCell>
                        <TableCell sx={{
                          py: 3,
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.8)",
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        }}>
                          {player.CONTRACT || 'No contract details'}
                        </TableCell>
                        <TableCell align="center" sx={{ py: 3 }}>
                          <IconButton
                            color="error"
                            onClick={() => handleDeletePlayer(player.PLAYER_ID)}
                            sx={{
                              background: 'rgba(244,67,54,0.1)',
                              border: '1px solid rgba(244,67,54,0.3)',
                              '&:hover': {
                                background: 'rgba(244,67,54,0.2)',
                                transform: "scale(1.2)",
                                boxShadow: '0 4px 15px rgba(244,67,54,0.4)'
                              },
                              transition: "all 0.2s ease"
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
            </Fade>
          )}
        </Box>

        {/* Add Player Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(30,30,60,0.9) 100%)',
              backdropFilter: "blur(20px)",
              borderRadius: 4,
              border: '1px solid rgba(255,215,0,0.3)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }
          }}
        >
          <DialogTitle sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: 'linear-gradient(45deg, #FFD700, #FF6B35)',
            color: "white",
            fontWeight: "bold",
            fontSize: '1.5rem',
            py: 2,
            px: 3,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SportsIcon sx={{ mr: 2, fontSize: '2rem' }} />
              Add New Player to Squad
            </Box>
            <IconButton
              onClick={handleDialogClose}
              sx={{ 
                color: "white",
                '&:hover': {
                  background: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.1)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 4 }}>
            <Stack spacing={4}>
              <TextField
                label="Player ID"
                variant="outlined"
                value={newPlayer.PLAYER_ID}
                onChange={(e) => setNewPlayer({ ...newPlayer, PLAYER_ID: e.target.value })}
                fullWidth
                required
                InputProps={{
                  readOnly: true,
                  startAdornment: <SportsIcon sx={{ color: '#FFD700', mr: 1 }} />,
                }}
                sx={{
                  "& .MuiInputLabel-root": { color: "#FFD700", fontWeight: 'bold' },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#FFD700" },
                  "& .MuiInputBase-input": { color: "white", fontWeight: '500' },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#FFD700", borderWidth: 2 },
                    "&:hover fieldset": { borderColor: "#FFC107" },
                    "&.Mui-focused fieldset": { borderColor: "#FFD700", borderWidth: 2 },
                    borderRadius: 3,
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
                InputProps={{
                  startAdornment: <PersonIcon sx={{ color: '#FF6B35', mr: 1 }} />,
                }}
                sx={{
                  "& .MuiInputLabel-root": { color: "#FF6B35", fontWeight: 'bold' },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#FF6B35" },
                  "& .MuiInputBase-input": { color: "white", fontWeight: '500' },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#FF6B35", borderWidth: 2 },
                    "&:hover fieldset": { borderColor: "#FF5722" },
                    "&.Mui-focused fieldset": { borderColor: "#FF6B35", borderWidth: 2 },
                    borderRadius: 3,
                  },
                }}
              />
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                value={newPlayer.EMAIL}
                onChange={(e) => setNewPlayer({ ...newPlayer, EMAIL: e.target.value })}
                fullWidth
                required
                InputProps={{
                  startAdornment: <EmailIcon sx={{ color: '#4facfe', mr: 1 }} />,
                }}
                sx={{
                  "& .MuiInputLabel-root": { color: "#4facfe", fontWeight: 'bold' },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#4facfe" },
                  "& .MuiInputBase-input": { color: "white", fontWeight: '500' },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#4facfe", borderWidth: 2 },
                    "&:hover fieldset": { borderColor: "#2196F3" },
                    "&.Mui-focused fieldset": { borderColor: "#4facfe", borderWidth: 2 },
                    borderRadius: 3,
                  },
                }}
              />
              <Box sx={{ display: "flex", gap: 3 }}>
                <TextField
                  label="Height (cm)"
                  type="number"
                  variant="outlined"
                  value={newPlayer.HEIGHT}
                  onChange={(e) => setNewPlayer({ ...newPlayer, HEIGHT: e.target.value })}
                  fullWidth
                  InputProps={{
                    startAdornment: <HeightIcon sx={{ color: '#f093fb', mr: 1 }} />,
                  }}
                  sx={{
                    "& .MuiInputLabel-root": { color: "#f093fb", fontWeight: 'bold' },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#f093fb" },
                    "& .MuiInputBase-input": { color: "white", fontWeight: '500' },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#f093fb", borderWidth: 2 },
                      "&:hover fieldset": { borderColor: "#E91E63" },
                      "&.Mui-focused fieldset": { borderColor: "#f093fb", borderWidth: 2 },
                      borderRadius: 3,
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
                  InputProps={{
                    startAdornment: <FitnessCenterIcon sx={{ color: '#667eea', mr: 1 }} />,
                  }}
                  sx={{
                    "& .MuiInputLabel-root": { color: "#667eea", fontWeight: 'bold' },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
                    "& .MuiInputBase-input": { color: "white", fontWeight: '500' },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#667eea", borderWidth: 2 },
                      "&:hover fieldset": { borderColor: "#3F51B5" },
                      "&.Mui-focused fieldset": { borderColor: "#667eea", borderWidth: 2 },
                      borderRadius: 3,
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
                rows={4}
                InputProps={{
                  startAdornment: <DescriptionIcon sx={{ color: '#F7931E', mr: 1, mt: 1 }} />,
                }}
                sx={{
                  "& .MuiInputLabel-root": { color: "#F7931E", fontWeight: 'bold' },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#F7931E" },
                  "& .MuiInputBase-input": { color: "white", fontWeight: '500' },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#F7931E", borderWidth: 2 },
                    "&:hover fieldset": { borderColor: "#FF9800" },
                    "&.Mui-focused fieldset": { borderColor: "#F7931E", borderWidth: 2 },
                    borderRadius: 3,
                  },
                }}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 4, gap: 2 }}>
            <Button
              onClick={handleDialogClose}
              variant="outlined"
              sx={{
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                color: "white",
                borderColor: "rgba(255,255,255,0.5)",
                borderWidth: 2,
                fontWeight: 'bold',
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderWidth: 2,
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
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                background: 'linear-gradient(45deg, #FFD700, #FF6B35)',
                boxShadow: '0 4px 20px rgba(255,215,0,0.4)',
                "&:hover": {
                  background: 'linear-gradient(45deg, #FFC107, #FF5722)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(255,215,0,0.6)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Add Player to Squad
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default PlayersPage;