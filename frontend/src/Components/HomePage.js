import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, Paper, AppBar, Toolbar, Button, Container } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';




const Section = ({ children, backgroundColor }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);


    return (
        <Box
            ref={ref}
            sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(50px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
                height: "100vh", // each section takes full screen height
                backgroundColor: backgroundColor || 'transparent',
                width: '100%',
            }}
        >
            {children}
        </Box>
    );
};


export default function ScrollPage() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login');
    }
    return (
        <Box
            sx={{
                overflowY: "scroll",
                height: "100vh",
                "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari/Opera
                scrollbarWidth: "none" // Firefox
            }}
        >
            <Section>
                <Box
                    component="img"
                    src="/bg2.jpg"
                    alt="Background"
                    sx={{
                        width: '100%',
                        height: '100vh',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: -1,
                    }}
                />
                <AppBar position="static"
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        boxShadow: 'none',
                    }}
                >
                    <Toolbar>
                        <Box
                            component={"img"}
                            src="kicko.png"
                            alt="Logo"
                            sx={{
                                height: 50,
                                width: 50,
                                borderRadius: '10px'
                            }}

                        />
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Kicko
                        </Typography>
                        <Button color="inherit" href="/">Sign Up</Button>
                        <Button color="inherit" href="/login" onClick={handleClick}>Login</Button>
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        // justifyContent: 'center',
                        height: 'calc(100vh - 64px)',
                        padding: 2,
                        textAlign: 'center'
                    }}
                >
                    <Box>
                        <img src="/kicko.png" alt="Logo" style={{ height: '300px', width: '300px', }} />
                    </Box>
                    <Typography
                        variant="h2"
                        sx={{
                            marginBottom: 2,
                            color: 'white',
                            fontWeight: 'bold',
                            fontFamily: 'Boldonse, system-ui'
                        }}
                    >
                        Welcome to Kicko
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'white', maxWidth: '800px' }}>
                        KickO is a Footballer Performance Monitoring System that helps coaches,
                        medical staff, and teams track player stats, training records, injuries,
                        and match performance. Empower your team with data-driven insights for
                        better decisions and improved results.
                    </Typography>
                </Box>


            </Section>
            <Section backgroundColor="#0b0d08">
                <Box
                    sx={{
                        height: '100vh',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 2
                    }}
                >
                    <Typography variant="h3" sx={{ color: 'white', marginBottom: 2 }}>
                        What we do:
                    </Typography>

                    <Paper
                        sx={{
                            height: 350,
                            width: 350,
                            padding: 3,
                            backgroundColor: 'transparent',
                            border: '3px solid rgba(184, 181, 181, 1)',
                            borderRadius: 10,
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: 'auto',
                        }}
                    >
                        <Typography variant="h5" sx={{ color: 'white', marginBottom: 2 }}>
                            Player Stats:
                        </Typography>
                        <img src="/pie-chart.png" alt="Stats" style={{ height: '100px', width: '100px', marginBottom: '20px' }} />
                        <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>
                            Track player stats like goals, assists, and match performance taht are essential for evaluating player performance and making informed decisions.
                        </Typography>
                    </Paper>
                    <Paper
                        sx={{
                            height: 350,
                            width: 350,
                            padding: 3,
                            backgroundColor: 'transparent',
                            border: '3px solid rgba(184, 181, 181, 1)',
                            borderRadius: 10,
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: 'auto',
                        }}
                    >
                        <Typography variant="h5" sx={{ color: 'white', marginBottom: 2 }}>
                            Performance Monitoring:
                        </Typography>
                        <img src="/high-performance.png" alt="monitoring" style={{ height: '100px', width: '100px', marginBottom: '20px' }} />
                        <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>
                            Monitor player performance over time, identify trends, and make data-driven decisions to enhance team performance.
                        </Typography>
                    </Paper>


                    <Paper
                        sx={{
                            height: 350,
                            width: 350,
                            padding: 3,
                            backgroundColor: 'transparent',
                            border: '3px solid rgba(184, 181, 181, 1)',
                            borderRadius: 10,
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: 'auto',
                        }}
                    >
                        <Typography variant="h5" sx={{ color: 'white', marginBottom: 2 }}>
                            Injury Records:
                        </Typography>
                        <img src="/patient.png" alt="injury" style={{ height: '100px', width: '100px', marginBottom: '20px' }} />
                        <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>
                            Maintain detailed records of player injuries, recovery times, and medical history to ensure player health and safety.
                        </Typography>
                    </Paper>
                </Box>
            </Section>
            <Section backgroundColor="#0b0d08">
                <Box
                    sx={{
                        height: '100vh',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            paddingTop: 2,
                            flex: 1
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minWidth: '300px',
                                marginRight: 4,
                                height: '100%',
                                padding: 2
                            }}
                        >
                            <Typography variant="h3" sx={{ color: 'white', textAlign: 'center' }}>
                                Meet Developers:
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2,
                                flex: 1
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 2,
                                    justifyContent: 'center'
                                }}
                            >
                                <Paper
                                    sx={{
                                        height: 200,
                                        width: 300,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        gap: 2,
                                        padding: 1,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <img src="/tamim.jpg" alt="Team Member 1" style={{ height: '100%', width: 'auto', borderRadius: '10px' }} />
                                    <Typography variant="h5" sx={{ color: 'white' }}>Tamim Rizvee</Typography>
                                </Paper>
                                <Paper
                                    sx={{
                                        height: 200,
                                        width: 300,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        gap: 2,
                                        padding: 1,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <img src="/labiba.jpg" alt="Team Member 1" style={{ height: '100%', width: 'auto', borderRadius: '10px' }} />
                                    <Typography variant="h5" sx={{ color: 'white' }}>Labiba Ibnat Matin</Typography>
                                </Paper>
                                <Paper
                                    sx={{
                                        height: 200,
                                        width: 300,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        gap: 2,
                                        padding: 1,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <img src="/sabit.jpg" alt="Team Member 1" style={{ height: '100%', width: 'auto', borderRadius: '10px' }} />
                                    <Typography variant="h5" sx={{ color: 'white' }}>Sabit Siraji</Typography>
                                </Paper>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 2,
                                    justifyContent: 'center'
                                }}
                            >
                                <Paper
                                    sx={{
                                        height: 200,
                                        width: 300,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        gap: 2,
                                        padding: 1,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <img src="/alif.jpg" alt="Team Member 1" style={{ height: '100%', width: 'auto', borderRadius: '10px' }} />
                                    <Typography variant="h5" sx={{ color: 'white' }}>Alif ul Haque</Typography>
                                </Paper>
                                <Paper
                                    sx={{
                                        height: 200,
                                        width: 300,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        gap: 2,
                                        padding: 1,
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <img src="/syed.jpg" alt="Team Member 1" style={{ height: '100%', width: 'auto', borderRadius: '10px' }} />
                                    <Typography variant="h5" sx={{ color: 'white' }}>Syed Nabil</Typography>
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                    {/* Bottom Box */}
                    <Box
                        sx={{
                            height: 300,
                            width: '100%',
                            backgroundColor: '#222529',
                            marginTop: 'auto',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                width: 500,
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                flexDirection: 'column',
                                padding: 2,
                                magin: 'auto',
                            }}

                        >
                            <img src="/kicko.png" alt="Logo" style={{ height: '150px', width: 'auto', marginBottom: '5px' }} />
                            <Typography variant="h7" sx={{ color: 'white', textAlign: 'center', padding: 2 }}>
                                Kicko was our first full stack course project. We are grateful for the knowledge and skills we gained during this journey.Starting from zero knowledge and trhough experimentation completed anyhow.
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                width: 425,
                                margin: 'auto',
                            }}
                        >
                            <img sec src="mist.svg" alt="Logo" style={{ height: '100px', width: 'auto', marginBottom: '25px', marginTop: '25px' }} />
                            <Typography variant="h7" sx={{ color: 'white', textAlign: 'center', padding: 2 }}>
                                {`MILITARY INSTITUTE OF SCIENCE AND TECHNOLOGY   
                                            CSE DEPARTMENT`}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                width: 200,
                                margin: 'auto',
                            }}
                        >
                            <Typography variant="h7" sx={{ color: 'white', textAlign: 'center', padding: 2, marginBottom: 0 }}>
                                Connect with us:
                            </Typography>
                            <List>
                                <ListItem disablePadding
                                    sx={{
                                        color: 'white',
                                    }}
                                >
                                    <ListItemButton
                                        component="a"
                                        href="https://github.com/Tamim-Rizvee"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        color='white'
                                        sx={{
                                            height: 30
                                        }}
                                    >
                                        <ListItemIcon>
                                            <img src="/github.png" alt="GitHub" style={{ height: '24px', width: '24px', margin: 0 }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Tamim Rizvee" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding
                                    sx={{
                                        color: 'white',
                                    }}
                                >
                                    <ListItemButton
                                        component="a"
                                        href="https://github.com/LabibaIbnatMatin "
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        color='white'
                                        sx={{
                                            height: 30
                                        }}
                                    >
                                        <ListItemIcon>
                                            <img src="/github.png" alt="GitHub" style={{ height: '24px', width: '24px', margin: 0 }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Labiba Ibnat" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding
                                    sx={{
                                        color: 'white',
                                    }}
                                >
                                    <ListItemButton
                                        component="a"
                                        href="https://github.com/Sabit166"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        color='white'
                                        sx={{
                                            height: 30
                                        }}
                                    >
                                        <ListItemIcon>
                                            <img src="/github.png" alt="GitHub" style={{ height: '24px', width: '24px', margin: 0 }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Sabit Siraji" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding
                                    sx={{
                                        color: 'white',
                                    }}
                                >
                                    <ListItemButton
                                        component="a"
                                        href="https://github.com/alif-ul-haque "
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        color='white'
                                        sx={{ height: 30 }}
                                    >
                                        <ListItemIcon>
                                            <img src="/github.png" alt="GitHub" style={{ height: '24px', width: '24px', margin: 0 }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Alif ul Haque" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding
                                    sx={{
                                        color: 'white',
                                        margin: 0
                                    }}
                                >
                                    <ListItemButton
                                        component="a"
                                        href="https://github.com/syednabil412"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        color='white'
                                        sx={{
                                            height: 30
                                        }}
                                    >
                                        <ListItemIcon>
                                            <img src="/github.png" alt="GitHub" style={{ height: '24px', width: '24px', margin: 0 }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Syed Nabil" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Section>
        </Box>
    )
}
