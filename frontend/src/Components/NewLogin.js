import React, { useState } from 'react';
import { Stack, Button, TextField, Box, Paper, Typography, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Visibility, VisibilityOff } from "@mui/icons-material";

function NewLogin() {
    const [teamid, setTeamId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        console.log("clicked");
        alert(`Team ID: ${teamid}, Email: ${email}, Password: ${password}, Role: ${role}`);
    }

    const handleTeamChange = (e) => {
        setTeamId(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    return (
        <>
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
                        height: 560,
                        width: 350,
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
                    <Stack spacing={2} alignItems="center">
                        <Box
                            component="img"
                            src="/football.png"
                            alt="Logo"
                            sx={{
                                height: 80,
                                width: 80,
                                marginBottom: 1,
                                animation: 'spin 10s linear infinite',
                                '@keyframes spin': {
                                    from: { transform: 'rotate(0deg)' },
                                    to: { transform: 'rotate(360deg)' }
                                }
                            }}
                        ></Box>
                        <TextField
                            label='Team ID'
                            value={teamid}
                            onChange={handleTeamChange}
                            size="small"
                            sx={{
                                "& .MuiInputLabel-root": { color: "white" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                                "& .MuiInputBase-input": { color: "white" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "white" },
                                    "&:hover fieldset": { borderColor: "white" },
                                    "&.Mui-focused fieldset": { borderColor: "white" },
                                    height: "40px",
                                },
                                width: 300,
                            }}
                        />
                        <TextField
                            label='Email'
                            type='email'
                            value={email}
                            onChange={handleEmailChange}
                            size="small"
                            sx={{
                                "& .MuiInputLabel-root": { color: "white" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                                "& .MuiInputBase-input": { color: "white" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "white" },
                                    "&:hover fieldset": { borderColor: "white" },
                                    "&.Mui-focused fieldset": { borderColor: "white" },
                                    height: "40px",
                                },
                                width: 300,
                            }}
                        />
                        <TextField
                            label='password'
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            size="small"
                            sx={{
                                "& .MuiInputLabel-root": { color: "white" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                                "& .MuiInputBase-input": { color: "white" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "white" },
                                    "&:hover fieldset": { borderColor: "white" },
                                    "&.Mui-focused fieldset": { borderColor: "white" },
                                    height: "40px",
                                },
                                "& .MuiSvgIcon-root": { color: "white" },
                                width: 300
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
                        <FormControl
                            size="small"
                            sx={{
                                width: 300,
                                "& .MuiInputLabel-root": { color: "white" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "white" },
                                    "&:hover fieldset": { borderColor: "white" },
                                    "&.Mui-focused fieldset": { borderColor: "white" },
                                    height: "40px",
                                },
                                "& .MuiSelect-select": { color: "white" },
                                "& .MuiSvgIcon-root": { color: "white" },
                            }}
                        >
                            <InputLabel>Role</InputLabel>
                            <Select
                                value={role}
                                label="Role"
                                onChange={handleRoleChange}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: '#000000d4',
                                            '& .MuiMenuItem-root': {
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                },
                                                '&.Mui-selected': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                                    },
                                                },
                                            },
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '10px',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="player">Player</MenuItem>
                                <MenuItem value="coach">Coach</MenuItem>
                                <MenuItem value="physician">Physician</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant='contained' sx={{
                            borderRadius: '25px',
                            '&:hover': {
                                bgcolor: 'black',
                                scale: '1.09'
                            }
                        }} onClick={handleClick} >Log in</Button>
                    </Stack>
                </Paper>
            </Box>
        </>
    )
}

export default NewLogin