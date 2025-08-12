import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import backgroundImage from '../background_home.png';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
    const handleClick = () =>{
          navigate('/test');
    }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.2)', // Transparent effect
            backdropFilter: 'blur(8px)', // Frosted glass effect
            p: 4,
            borderRadius: 3,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#fff',
              letterSpacing: 2,
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
            }}
          >
            KickO
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 4,
              color: '#f0f0f0',
              fontSize: 18,
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            KickO is a Footballer Performance Monitoring System that helps coaches,
            medical staff, and teams track player stats, training records, injuries,
            and match performance. Empower your team with data-driven insights for
            better decisions and improved results.
          </Typography>
          <Button onClick={handleClick}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 2,
              px: 5,
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Explore
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
