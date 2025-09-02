import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
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
    Collapse
} from "@mui/material";
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 240;

export default function PlayerLayout() {
    const location = useLocation();
    const { role, teamid, player_name } = location.state || {};

    // Add safety checks for undefined values
    const safeRole = role || 'Player';
    const safeTeamId = teamid || 'Unknown';
    const safePlayerName = player_name || 'Player';

    const [openSubmenu, setOpenSubmenu] = useState({});

    const handleSubmenuToggle = (itemText) => {
        setOpenSubmenu(prev => ({
            ...prev,
            [itemText]: !prev[itemText]
        }));
    };

    return (
        <Box sx={{ display: "flex" }}>
            {/* Top AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: '#0d1017',
                    color: '#ffffff',
                    borderBottom: '.5px solid #524b4bff',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ color: '#ffffff' }}>
                        Welcome {safePlayerName} | Team ID: {safeTeamId}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: '#0d1017',
                        color: '#ffffff',
                        borderRight: '1px solid #333333'
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        {[
                            { text: "Dashboard", path: ".", icon: '/football.png' },
                            { text: "My Profile", path: "profile", icon: '/logo192.png' },
                            { text: "My Performance", path: "performance", icon: '/pie-chart.png' },
                            { text: "Injury Records", path: "injury", icon: '/patient.png' },
                            { text: "Team Info", path: "team", icon: '/high-performance.png' },
                            { text: "Match Schedule", path: "match", icon: '/test.png' }
                        ].map((item) => {
                            const isActive = location.pathname.endsWith(item.path) || 
                                           (item.path === "." && location.pathname === "/playerdashboard");

                            return (
                                <ListItem key={item.text} disablePadding sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ListItemButton
                                        component={Link}
                                        to={item.path}
                                        sx={{
                                            height: '40px',
                                            width: '87%',
                                            maxWidth: '220px',
                                            margin: '4px 0',
                                            backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                            borderRadius: '8px',
                                            color: '#ffffff',
                                            '&:hover': {
                                                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: '30px' }}>
                                            <img src={item.icon} alt="icon" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            sx={{
                                                '& .MuiListItemText-primary': {
                                                    color: '#ffffff',
                                                    fontWeight: isActive ? 500 : 400,
                                                }
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
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
                }}
            >
                <Toolbar /> {/* This creates the spacing for the fixed AppBar */}
                <Outlet />
            </Box>
        </Box>
    )
}
