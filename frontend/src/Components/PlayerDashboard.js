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
  Grid,
  InputAdornment,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import HeightIcon from "@mui/icons-material/Height";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";

function PlayerDashboard() {
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
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            mb: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            🏈 Player Dashboard
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              opacity: 0.9,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Explore player profiles and statistics in an interactive view
          </Typography>
        </Paper>

        {/* Search Section */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            background: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <TextField
            fullWidth
            placeholder="Search players by name or ID..."
            value={searchTerm}
            onChange={handleSearch}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "white",
              },
            }}
          />
        </Paper>

        {/* Players Display */}
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <Typography variant="h6">Loading player...</Typography>
          </Box>
        ) : player ? (
          <Box display="flex" justifyContent="center">
            <Card
              elevation={6}
              sx={{
                maxWidth: 500,
                width: "100%",
                borderRadius: 3,
                background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Player Avatar */}
                <Box display="flex" justifyContent="center" mb={3}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: "primary.main",
                      fontSize: "3rem",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
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
                    color: "primary.dark",
                  }}
                >
                  {player.PLAYER_NAME}
                </Typography>

                {/* Player ID Chip */}
                <Box display="flex" justifyContent="center" mb={3}>
                  <Chip
                    icon={<PersonIcon />}
                    label={`Player ID: ${player.PLAYER_ID}`}
                    color="primary"
                    variant="outlined"
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
                    borderRadius={2}
                    bgcolor="rgba(25, 118, 210, 0.08)"
                  >
                    <HeightIcon color="primary" sx={{ mr: 2, fontSize: 24 }} />
                    <Typography variant="h6" color="text.primary">
                      Height: {player.HEIGHT} cm
                    </Typography>
                  </Box>

                  {/* Weight */}
                  <Box
                    display="flex"
                    alignItems="center"
                    mb={2}
                    p={2}
                    borderRadius={2}
                    bgcolor="rgba(76, 175, 80, 0.08)"
                  >
                    <FitnessCenterIcon sx={{ color: "#4caf50", mr: 2, fontSize: 24 }} />
                    <Typography variant="h6" color="text.primary">
                      Weight: {player.WEIGHT} kg
                    </Typography>
                  </Box>

                  {/* Email */}
                  <Box
                    display="flex"
                    alignItems="center"
                    mb={2}
                    p={2}
                    borderRadius={2}
                    bgcolor="rgba(255, 152, 0, 0.08)"
                  >
                    <EmailIcon sx={{ color: "#ff9800", mr: 2, fontSize: 24 }} />
                    <Typography variant="h6" color="text.primary">
                      {player.EMAIL || "No email provided"}
                    </Typography>
                  </Box>

                  {/* Contract */}
                  <Box
                    display="flex"
                    alignItems="center"
                    p={2}
                    borderRadius={2}
                    bgcolor="rgba(156, 39, 176, 0.08)"
                  >
                    <DescriptionIcon sx={{ color: "#9c27b0", mr: 2, fontSize: 24 }} />
                    <Typography variant="h6" color="text.primary">
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
              background: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <Typography variant="h6" color="text.secondary" mb={1}>
              No player found
            </Typography>
            <Typography variant="body2" color="text.secondary">
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
              background: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <Typography variant="h6" color="text.secondary" mb={1}>
              Search for a Player
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter a player name to view their profile
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

export default PlayerDashboard;
