import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Paper,
  Card,
  CardContent,
  Avatar,
  Chip,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import HeightIcon from "@mui/icons-material/Height";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";

function PlayerProfile() {
  const [player, setPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch player from Flask backend
  const fetchPlayer = async (playerName) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/players/search/${playerName}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setPlayer(data[0]); // Get the first player from the result
      } else {
        setPlayer(null);
      }
    } catch (error) {
      console.error("Error fetching player:", error);
      setPlayer(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      fetchPlayer(value);
    } else {
      setPlayer(null);
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 1,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            🏈 Player Profile
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ opacity: 0.9 }}
          >
            Search and view player information
          </Typography>
        </Paper>

        {/* Search Section */}
        <Paper
          elevation={2}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            bgcolor: "#1a1a1a",
            border: "1px solid #333333"
          }}
        >
          <TextField
            fullWidth
            placeholder="Search players by name..."
            value={searchTerm}
            onChange={handleSearch}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#ffffff" }} />
                </InputAdornment>
              ),
              style: { color: "#ffffff" }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#2a2a2a",
                "& fieldset": {
                  borderColor: "#555555",
                },
                "&:hover fieldset": {
                  borderColor: "#777777",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#667eea",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#aaaaaa",
                opacity: 1,
              },
            }}
          />
        </Paper>

        {/* Player Display */}
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <Typography variant="h6" color="#ffffff">Loading player...</Typography>
          </Box>
        ) : player ? (
          <Box display="flex" justifyContent="center">
            <Card
              elevation={4}
              sx={{
                maxWidth: 500,
                width: "100%",
                borderRadius: 2,
                backgroundColor: "#1a1a1a",
                border: "1px solid #333333",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Player Avatar */}
                <Box display="flex" justifyContent="center" mb={3}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: "#667eea",
                      fontSize: "2.5rem",
                      boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
                    }}
                  >
                    {player.PLAYER_NAME.charAt(0)}
                  </Avatar>
                </Box>

                {/* Player Name */}
                <Typography
                  variant="h4"
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    color: "#ffffff",
                  }}
                >
                  {player.PLAYER_NAME}
                </Typography>

                {/* Player ID Chip */}
                <Box display="flex" justifyContent="center" mb={3}>
                  <Chip
                    icon={<PersonIcon />}
                    label={`Player ID: ${player.PLAYER_ID}`}
                    sx={{
                      bgcolor: "#667eea",
                      color: "#ffffff",
                      "& .MuiChip-icon": {
                        color: "#ffffff"
                      }
                    }}
                    size="medium"
                  />
                </Box>

                {/* Player Details */}
                <Box sx={{ mt: 3 }}>
                  {/* Height */}
                  <Box
                    display="flex"
                    alignItems="center"
                    mb={2}
                    p={2}
                    borderRadius={1}
                    bgcolor="#2a2a2a"
                    border="1px solid #333333"
                  >
                    <HeightIcon sx={{ color: "#667eea", mr: 2, fontSize: 24 }} />
                    <Typography variant="h6" color="#ffffff">
                      Height: {player.HEIGHT} cm
                    </Typography>
                  </Box>

                  {/* Weight */}
                  <Box
                    display="flex"
                    alignItems="center"
                    mb={2}
                    p={2}
                    borderRadius={1}
                    bgcolor="#2a2a2a"
                    border="1px solid #333333"
                  >
                    <FitnessCenterIcon sx={{ color: "#4caf50", mr: 2, fontSize: 24 }} />
                    <Typography variant="h6" color="#ffffff">
                      Weight: {player.WEIGHT} kg
                    </Typography>
                  </Box>

                  {/* Email */}
                  <Box
                    display="flex"
                    alignItems="center"
                    mb={2}
                    p={2}
                    borderRadius={1}
                    bgcolor="#2a2a2a"
                    border="1px solid #333333"
                  >
                    <EmailIcon sx={{ color: "#ff9800", mr: 2, fontSize: 24 }} />
                    <Typography variant="h6" color="#ffffff">
                      {player.EMAIL || "No email provided"}
                    </Typography>
                  </Box>

                  {/* Contract */}
                  <Box
                    display="flex"
                    alignItems="center"
                    p={2}
                    borderRadius={1}
                    bgcolor="#2a2a2a"
                    border="1px solid #333333"
                  >
                    <DescriptionIcon sx={{ color: "#9c27b0", mr: 2, fontSize: 24 }} />
                    <Typography variant="h6" color="#ffffff">
                      {player.CONTRACT || "No contract information"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ) : searchTerm ? (
          <Paper
            elevation={2}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 2,
              bgcolor: "#1a1a1a",
              border: "1px solid #333333"
            }}
          >
            <Typography variant="h6" color="#ffffff" mb={1}>
              No player found
            </Typography>
            <Typography variant="body2" color="#aaaaaa">
              No results for "{searchTerm}"
            </Typography>
          </Paper>
        ) : (
          <Paper
            elevation={2}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 2,
              bgcolor: "#1a1a1a",
              border: "1px solid #333333"
            }}
          >
            <Typography variant="h6" color="#ffffff" mb={1}>
              Search for a Player
            </Typography>
            <Typography variant="body2" color="#aaaaaa">
              Enter a player name to view their profile
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

export default PlayerProfile;
