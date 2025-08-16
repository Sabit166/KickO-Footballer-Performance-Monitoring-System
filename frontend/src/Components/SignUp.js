import React, { useState } from "react";
import axios from "axios";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Box,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function SignUp({ open, onClose }) {
    console.log('SignUp component rendered with open:', open);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        teamName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [signupSuccess, setSignupSuccess] = useState(false);
    const [teamCode, setTeamCode] = useState('');
    const [error, setError] = useState('');

    const clearFormData = () => {
        setFormData({
            name: '',
            teamName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setSignupSuccess(false);
        setTeamCode('');
        setError('');
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Validate passwords match before submitting
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!formData.name || !formData.email || !formData.password) {
            setError("Please fill in all required fields");
            return;
        }

        // Send data to backend
        try {
            console.log("Sending signup data:", formData);
            const response = await axios.post("http://localhost:5001/api/signup", formData);
            console.log("Signup response:", response.data);
            setSignupSuccess(true);
            setTeamCode(response.data.teamCode);
        } catch (error) {
            console.error("Signup error details:", error);
            console.error("Error response:", error.response);
            console.error("Error message:", error.message);

            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else if (error.message) {
                setError("Network error: " + error.message);
            } else {
                setError("An error occurred during signup. Please try again.");
            }
        }
        // Add your sign-up logic here
        console.log('Sign up data:', formData);
    };

    const handleClose = () => {
        clearFormData(); // Clear form when closing
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth

            PaperProps={{
                sx: {
                    boxShadow: "0 0 20px 5px rgba(33, 150, 243, 0.6)", // blue glow
                    borderRadius: 3, // smooth rounded corners
                },
            }}
            sx={{
                '& .MuiDialog-paper': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                },
                color: 'white',
            }}
        >
            <DialogTitle
                sx={{
                    color: 'white',
                }}
            >
                Sign Up
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: 'white',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers
                sx={{
                    '& .MuiTextField-root': {
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    },
                }}
            >
                {signupSuccess ? (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 3,
                            px: 2,
                            backgroundColor: 'rgba(76, 175, 80, 0.2)',
                            borderRadius: 2,
                            border: '1px solid rgba(76, 175, 80, 0.5)'
                        }}
                    >
                        <Typography variant="h6" sx={{ color: '#4CAF50', mb: 2 }}>
                            🎉 Sign Up Successful!
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                            Welcome to KickO! Your account has been created successfully.
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                padding: 2,
                                borderRadius: 1,
                                border: '2px dashed rgba(255, 255, 255, 0.3)'
                            }}
                        >
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                                Your Team Code:
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#FFD700',
                                    fontWeight: 'bold',
                                    letterSpacing: 2,
                                    fontFamily: 'monospace'
                                }}
                            >
                                {teamCode}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', mt: 1 }}>
                                Save this code! You'll need it to manage your team.
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <>
                        {error && (
                            <Box
                                sx={{
                                    mb: 2,
                                    p: 2,
                                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                                    borderRadius: 1,
                                    border: '1px solid rgba(244, 67, 54, 0.5)'
                                }}
                            >
                                <Typography variant="body2" sx={{ color: '#f44336' }}>
                                    {error}
                                </Typography>
                            </Box>
                        )}
                        <TextField
                            label="Name"
                            name="name"
                            type="text"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Team Name"
                            name="teamName"
                            type="text"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={formData.teamName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </>
                )}
            </DialogContent>

            <DialogActions>
                {signupSuccess ? (
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate('/login');
                            clearFormData();
                            onClose();
                        }}
                        sx={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#45a049',
                            },
                            borderRadius: '20px',
                            px: 3
                        }}
                    >
                        Continue to Login
                    </Button>
                ) : (
                    <>
                        <Button
                            onClick={handleClose}
                            sx={{ color: 'white' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                },
                                borderRadius: '20px',
                            }}
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}
