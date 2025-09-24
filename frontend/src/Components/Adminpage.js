import React, { useState, useEffect, useRef } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    AppBar,
    Typography,
    Box,
    ListItemIcon,
    Collapse,
    IconButton
} from "@mui/material";
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 240;

export default function Adminpage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { role, teamid } = location.state || {};
    const [drawerOpen, setDrawerOpen] = useState(true);
    const hideTimeoutRef = useRef(null);

    // Fallback: Try to get data from localStorage if not in state
    let finalRole = role;
    let finalTeamId = teamid;

    if (!role || !teamid) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                finalRole = role || userData.role || 'Unknown';
                finalTeamId = teamid || userData.teamId || userData.team_id || userData.TEAM_ID || 'Unknown';
            } catch (error) {
                console.error('Error parsing stored user data:', error);
            }
        }
    }

    // Add safety checks for undefined values
    const safeRole = finalRole || 'Unknown';
    const safeTeamId = finalTeamId || 'Unknown';

    const [openSubmenu, setOpenSubmenu] = useState({});

    // Auto-hide drawer after 3 seconds on page load
    useEffect(() => {
        const autoHideTimer = setTimeout(() => {
            setDrawerOpen(false);
        }, 3000);

        return () => clearTimeout(autoHideTimer);
    }, []);

    // Function to start auto-hide timer
    const startAutoHideTimer = () => {
        // Clear existing timer
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
        }

        // Start new timer
        hideTimeoutRef.current = setTimeout(() => {
            setDrawerOpen(false);
        }, 3000);
    };

    // Function to clear auto-hide timer
    const clearAutoHideTimer = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
    };

    // Handle mouse enter on drawer (pause auto-hide)
    const handleDrawerMouseEnter = () => {
        clearAutoHideTimer();
    };

    // Handle mouse leave from drawer (resume auto-hide)
    const handleDrawerMouseLeave = () => {
        if (drawerOpen) {
            startAutoHideTimer();
        }
    };

    // Function to handle navigation clicks
    const handleNavigationClick = () => {
        // If drawer is closed, open it and start auto-hide timer
        if (!drawerOpen) {
            setDrawerOpen(true);
            // Use setTimeout to ensure state is updated before starting timer
            setTimeout(() => {
                startAutoHideTimer();
            }, 100);
        } else {
            // If drawer is already open, start auto-hide timer
            startAutoHideTimer();
        }
    };

    // Clear timer on component unmount
    useEffect(() => {
        return () => {
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        };
    }, []);

    const handleSubmenuToggle = (itemText) => {
        setOpenSubmenu(prev => ({
            ...prev,
            [itemText]: !prev[itemText]
        }));

        // If drawer is closed, open it and start auto-hide timer
        if (!drawerOpen) {
            setDrawerOpen(true);
            // Use setTimeout to ensure state is updated before starting timer
            setTimeout(() => {
                startAutoHideTimer();
            }, 100);
        } else {
            // If drawer is already open, start auto-hide timer
            startAutoHideTimer();
        }
    };

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('user');

        // Navigate to homepage
        navigate('/');
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);

        // If opening the drawer, start auto-hide timer
        if (!drawerOpen) {
            startAutoHideTimer();
        } else {
            // If closing manually, clear the timer
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            {/* Top AppBar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    background: 'linear-gradient(135deg, rgba(13, 16, 23, 0.95) 0%, rgba(13, 16, 23, 0.98) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                }}
            >
                <Toolbar sx={{ minHeight: '64px', px: 3 }}>
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        onClick={toggleDrawer}
                        sx={{
                            mr: 3,
                            color: '#ffffff',
                            borderRadius: '12px',
                            padding: '10px',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        <MenuIcon sx={{ fontSize: '24px' }} />
                    </IconButton>

                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <img
                                src="/kicko.png"
                                alt="KickO Logo"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                                }}
                            />
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    color: '#ffffff',
                                    fontWeight: 600,
                                    letterSpacing: '-0.5px',
                                    background: 'linear-gradient(135deg, #ffffff 0%, #e1e5e9 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                KickO
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                ml: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '16px',
                                padding: '8px 16px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '0.75rem',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Role
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#ffffff',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {safeRole}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    height: '32px',
                                    width: '1px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                }}
                            />

                            <Box sx={{ textAlign: 'right' }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontSize: '0.75rem',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Team ID
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: '#4fc3f7',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        fontFamily: 'monospace',
                                    }}
                                >
                                    {safeTeamId}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: 'rgba(13, 16, 23, 0.52)', // Transparent black
                        backdropFilter: 'blur(10px)',
                        color: '#ffffff',
                        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                    },
                }}
                PaperProps={{
                    onMouseEnter: handleDrawerMouseEnter,
                    onMouseLeave: handleDrawerMouseLeave,
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        {[
                            //{ text: "Dashboard", path: ".", icon: '/football.png' },
                            {
                                text: "Manage Team", path: "player", icon: '/training.png', submenu: {
                                    items: [
                                        { text: "Player", path: "player", icon: '/shoot.png' },
                                        { text: "Coach", path: "coach", icon: '/coach.png' },
                                        { text: "Physician", path: "addmanager", icon: '/doctor.png' },
                                        { text: "Match", path: "match", icon: '/field.png' },
                                        { text: "Injuries", path: "injury", icon: '/patient.png' }
                                    ]
                                }
                            },
                            {
                                text: "Report", path: "report", icon: '/document.png', submenu: {
                                    items: [
                                        { text: "Player Report", path: "playerperformance", icon: '/performance.png' },
                                        { text: "Team Report", path: "teamperformance", icon: '/training.png' },
                                        { text: "Training Dashboard", path: "training", icon: '/soccer.png' }
                                    ]
                                }
                            }
                        ]
                            .filter((item) => {
                                if (safeRole === "admin") {
                                    return true;
                                }
                                else if (safeRole === "player") {
                                    return item.text !== "Add Player" && item.text !== "HomePage";
                                }
                                return true;
                            })
                            .map((item) => {
                                const isActive = location.pathname === item.path;
                                const hasSubmenu = item.submenu && item.submenu.items;
                                const isSubmenuOpen = openSubmenu[item.text];

                                return (
                                    <React.Fragment key={item.text}>
                                        <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <ListItemButton
                                                component={hasSubmenu ? 'div' : Link}
                                                to={hasSubmenu ? undefined : item.path}
                                                onClick={hasSubmenu ? () => handleSubmenuToggle(item.text) : handleNavigationClick}
                                                sx={{
                                                    height: '30px',
                                                    width: '87%',
                                                    maxWidth: '220px',
                                                    margin: '4px 0',
                                                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                                    border: isActive ? 'none' : 'none',
                                                    borderRadius: '8px',
                                                    color: '#ffffff',
                                                    justifyContent: 'flex-start',
                                                    '&:hover': {
                                                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                                    },
                                                }}
                                            >
                                                <ListItemIcon sx={{ minWidth: '30px', justifyContent: 'center' }}>
                                                    <img src={item.icon} alt="icon" style={{ width: '20px', height: '20px' }} />
                                                </ListItemIcon>
                                                <>
                                                    <ListItemText
                                                        primary={item.text}
                                                        sx={{
                                                            '& .MuiListItemText-primary': {
                                                                color: isActive ? '#ffffff' : '#ffffff',
                                                                fontWeight: isActive ? 500 : 400,
                                                            }
                                                        }}
                                                    />
                                                    {hasSubmenu && (
                                                        isSubmenuOpen ? <ExpandLess sx={{ color: '#ffffff' }} /> : <ExpandMore sx={{ color: '#ffffff' }} />
                                                    )}
                                                </>
                                            </ListItemButton>
                                        </ListItem>

                                        {hasSubmenu && (
                                            <Collapse in={isSubmenuOpen} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {item.submenu.items.map((subItem) => {
                                                        const isSubActive = location.pathname === subItem.path;
                                                        return (
                                                            <ListItem key={subItem.text} disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
                                                                <ListItemButton
                                                                    component={Link}
                                                                    to={subItem.path}
                                                                    onClick={handleNavigationClick}
                                                                    sx={{
                                                                        height: '28px',
                                                                        width: '80%',
                                                                        maxWidth: '200px',
                                                                        margin: '2px 0',
                                                                        marginLeft: '20px',
                                                                        backgroundColor: isSubActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                                                                        borderRadius: '6px',
                                                                        color: '#ffffff',
                                                                        '&:hover': {
                                                                            backgroundColor: isSubActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                                                                        },
                                                                    }}
                                                                >
                                                                    <ListItemIcon sx={{ minWidth: '25px' }}>
                                                                        <img src={subItem.icon} alt="icon" style={{ width: '16px', height: '16px' }} />
                                                                    </ListItemIcon>
                                                                    <ListItemText
                                                                        primary={subItem.text}
                                                                        sx={{
                                                                            '& .MuiListItemText-primary': {
                                                                                color: '#ffffff',
                                                                                fontWeight: isSubActive ? 500 : 400,
                                                                                fontSize: '0.875rem',
                                                                            }
                                                                        }}
                                                                    />
                                                                </ListItemButton>
                                                            </ListItem>
                                                        );
                                                    })}
                                                </List>
                                            </Collapse>
                                        )}
                                    </React.Fragment>
                                );
                            })}


                        {/* Logout menu item at the bottom of sidebar */}
                        <ListItem disablePadding sx={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                            <ListItemButton
                                onClick={() => {
                                    handleLogout();
                                    handleNavigationClick();
                                }}
                                sx={{
                                    height: '30px',
                                    width: '87%',
                                    maxWidth: '220px',
                                    margin: '4px 0',
                                    backgroundColor: 'transparent',
                                    borderRadius: '8px',
                                    color: '#ffffff',
                                    justifyContent: 'flex-start',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '30px', justifyContent: 'center' }}>
                                    <LogoutIcon sx={{ color: '#ffffff', width: '20px', height: '20px' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Logout"
                                    sx={{
                                        '& .MuiListItemText-primary': {
                                            color: '#ffffff',
                                            fontWeight: 400,
                                        }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "#0d1017",
                    color: "#ffffff",
                    p: 3,
                    minHeight: '100vh',
                    width: '100%', // Always take full width
                }}
            >
                <Toolbar /> {/* This creates the spacing for the fixed AppBar */}
                <Outlet context={{ role: safeRole, teamid: safeTeamId }} />
            </Box>
        </Box>
    )
}