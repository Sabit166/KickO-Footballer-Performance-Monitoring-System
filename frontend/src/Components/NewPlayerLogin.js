import React, { useState } from 'react';
import axios from 'axios';
import { Stack, Button, TextField, Box, Paper, InputAdornment, IconButton, Alert } from '@mui/material'
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

function NewPlayerLogin() {
    const [playerId, setPlayerId] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError('');
        setSuccess('');
        setLoading(true);

        // Validate input fields
        if (!playerId || !playerName || !teamName || !email || !password) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5001/api/player/login", {
                playerId,
                playerName,
                teamName,
                email,
                password
            });

            const userData = response.data.user;

            setSuccess(`Welcome back, ${playerName}!`);

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('userRole', 'player');

            // Navigate to player dashboard
            navigate('/playerdashboard', {
                state: {
                    playerName: playerName,
                    teamid: userData.teamId || teamName,
                    email: email,
                    playerId: playerId
                }
            });

        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else if (error.message) {
                setError("Network error: " + error.message);
            } else {
                setError("An error occurred during login. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    const handleBackToRoleSelection = () => {
        navigate('/role-selection');
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                width: '100vw',
                backgroundImage: 'url(/bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper elevation={3}
                sx={{
                    height: 680,
                    width: 380,
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px 10px rgba(255, 251, 251, 0.33), 0 0 60px 20px rgba(0, 0, 0, 0.5)',
                }}
            >
                <Stack spacing={2} alignItems="center" sx={{ width: '90%' }}>
                    {/* Header with Back Button and Player Icon */}
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', mb: 1 }}>
                        <IconButton 
                            onClick={handleBackToRoleSelection}
                            sx={{ 
                                color: 'white', 
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                                component="span"
                                sx={{ fontSize: '2rem' }}
                            >
                                ⚽
                            </Box>
                            <Box
                                component="span"
                                sx={{ color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}
                            >
                                Player Login
                            </Box>
                        </Box>
                        <Box sx={{ width: 48 }} /> {/* Spacer for centering */}
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', backgroundColor: 'rgba(244, 67, 54, 0.2)', color: 'white' }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ width: '100%', backgroundColor: 'rgba(76, 175, 80, 0.2)', color: 'white' }}>
                            {success}
                        </Alert>
                    )}

                    {/* Player ID Field */}
                    <TextField
                        label='Player ID'
                        value={playerId}
                        onChange={(e) => setPlayerId(e.target.value)}
                        size="small"
                        sx={{
                            "& .MuiInputLabel-root": { color: "white" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                            "& .MuiInputBase-input": { color: "white" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "white" },
                                "&.Mui-focused fieldset": { borderColor: "white" },
                                height: "45px",
                            },
                            width: '100%',
                        }}
                    />

                    {/* Player Name Field */}
                    <TextField
                        label='Player Name'
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        size="small"
                        sx={{
                            "& .MuiInputLabel-root": { color: "white" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                            "& .MuiInputBase-input": { color: "white" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "white" },
                                "&.Mui-focused fieldset": { borderColor: "white" },
                                height: "45px",
                            },
                            width: '100%',
                        }}
                    />

                    {/* Team Name Field */}
                    <TextField
                        label='Team Name'
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        size="small"
                        sx={{
                            "& .MuiInputLabel-root": { color: "white" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                            "& .MuiInputBase-input": { color: "white" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "white" },
                                "&.Mui-focused fieldset": { borderColor: "white" },
                                height: "45px",
                            },
                            width: '100%',
                        }}
                    />

                    {/* Email Field */}
                    <TextField
                        label='Email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="small"
                        sx={{
                            "& .MuiInputLabel-root": { color: "white" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                            "& .MuiInputBase-input": { color: "white" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "white" },
                                "&.Mui-focused fieldset": { borderColor: "white" },
                                height: "45px",
                            },
                            width: '100%',
                        }}
                    />

                    {/* Password Field */}
                    <TextField
                        label='Password'
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        size="small"
                        sx={{
                            "& .MuiInputLabel-root": { color: "white" },
                            "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                            "& .MuiInputBase-input": { color: "white" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "white" },
                                "&.Mui-focused fieldset": { borderColor: "white" },
                                height: "45px",
                            },
                            "& .MuiSvgIcon-root": { color: "white" },
                            width: '100%'
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePasswordVisibility}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Login Button */}
                    <Button
                        variant='contained'
                        disabled={loading}
                        sx={{
                            borderRadius: '25px',
                            backgroundColor: '#1976d2',
                            width: '100%',
                            height: '45px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            '&:hover': {
                                bgcolor: '#1565c0',
                                scale: '1.02'
                            },
                            '&:disabled': {
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                color: 'rgba(255, 255, 255, 0.5)'
                            }
                        }}
                        onClick={handleLogin}
                    >
                        {loading ? 'Logging in...' : 'Login as Player'}
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}

export default NewPlayerLogin;