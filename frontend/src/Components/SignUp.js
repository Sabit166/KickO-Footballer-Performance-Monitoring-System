import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SignUp({ open, onClose }) {
    console.log('SignUp component rendered with open:', open);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        // Add your sign-up logic here
        console.log('Sign up data:', formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth

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
                    onClick={onClose}
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
                <TextField
                    label="First Name"
                    name="firstName"
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={formData.lastName}
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
                    label="Role"
                    name="Role"
                    type="text"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={formData.role}
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
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
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
            </DialogActions>
        </Dialog>
    );
}
