import React, { useState, useEffect } from 'react';
import { Stack, Button, TextField, Box, Paper, Typography, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from "@mui/icons-material";


const images = [
    '/test.png',
    '/messi.jpg',
    '/maradona.jpg',
];

function NewLogin() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        console.log("clicked");
        alert(name + " " + password);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 6000);

        return () => clearInterval(interval);
    }, []);
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
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Paper elevation={3}
                        sx={{
                            height: 400,
                            width: 500,
                            borderRadius: '50px',
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
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
                            <TextField label='Name' value={name} onChange={handleNameChange}
                                sx={{
                                    "& .MuiInputLabel-root": { color: "white" },
                                    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                                    "& .MuiInputBase-input": { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "white" },
                                        "&:hover fieldset": { borderColor: "white" },
                                        "&.Mui-focused fieldset": { borderColor: "white" },
                                    },
                                    width: 300,
                                }}
                            />
                            <TextField
                                label='password'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                sx={{
                                    "& .MuiInputLabel-root": { color: "white" },
                                    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                                    "& .MuiInputBase-input": { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "white" },
                                        "&:hover fieldset": { borderColor: "white" },
                                        "&.Mui-focused fieldset": { borderColor: "white" },
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
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-right',
                        overflow: 'hidden'
                    }}
                >
                    <Paper elevation={3}
                        sx={{
                            width: '96%',
                            height: '96%',
                            position: 'relative',
                            borderRadius: '20px',
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                width: '90%',
                                height: '100%',
                                position: 'relative',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                            }}
                        >
                            {images.map((src, idx) => (
                                <Box
                                    key={idx}
                                    component="img"
                                    src={src}
                                    alt={`Slide ${idx}`}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        transition: 'opacity 1s ease-in-out',
                                        opacity: idx === currentIndex ? 1 : 0,
                                        zIndex: idx === currentIndex ? 1 : 0,
                                    }}
                                />
                            ))}
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}

export default NewLogin