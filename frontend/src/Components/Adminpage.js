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

export default function Adminpage() {
    const location = useLocation();
    const { role, teamid } = location.state || {};

    // Add safety checks for undefined values
    const safeRole = role || 'Unknown';
    const safeTeamId = teamid || 'Unknown';

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
                        {safeRole} and Team ID: {safeTeamId}
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
                            {
                                text: "Manage Team", path: "addplayer", icon: '/logo192.png', submenu: {
                                    items: [
                                        { text: "Player", path: "addplayer", icon: '/logo192.png' },
                                        { text: "Coach", path: "addteam", icon: '/logo192.png' },
                                        { text: "Physician", path: "addmanager", icon: '/logo192.png' },
                                        { text: "Match", path: "match", icon: '/logo192.png' }  // New submenu item
                                    ]
                                }
                            },
                            {
                                text: "Report", path: "report", icon: '/logo192.png', submenu: {
                                    items: [
                                        { text: "Player Report", path: "playerreport", icon: '/logo192.png' },
                                        { text: "Team Report", path: "teamreport", icon: '/logo192.png' }
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
                                                onClick={hasSubmenu ? () => handleSubmenuToggle(item.text) : undefined}
                                                sx={{
                                                    height: '30px',
                                                    width: '87%',
                                                    maxWidth: '220px',
                                                    margin: '4px 0',
                                                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                                    border: isActive ? 'none' : 'none',
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
                                                            color: isActive ? '#ffffff' : '#ffffff',
                                                            fontWeight: isActive ? 500 : 400,
                                                        }
                                                    }}
                                                />
                                                {hasSubmenu && (
                                                    isSubmenuOpen ? <ExpandLess sx={{ color: '#ffffff' }} /> : <ExpandMore sx={{ color: '#ffffff' }} />
                                                )}
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