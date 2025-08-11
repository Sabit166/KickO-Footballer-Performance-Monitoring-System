import './App.css';
import Test from './Components/Test';
import Welcome from './Components/Welcome';
import { Box, Typography, Button, Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            letterSpacing: 2,
            textShadow: '2px 2px 8px #0a1929',
          }}
        >
          KickO
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 4, color: 'text.secondary', fontSize: 18 }}
        >
          KickO is a Footballer Performance Monitoring System that helps coaches, medical staff, and teams track player stats, training records, injuries, and match performance. Empower your team with data-driven insights for better decisions and improved results.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: 2, px: 5, fontWeight: 'bold', fontSize: 18 }}
        >
          Explore
        </Button>
      </Box>
    </Container>
  );
}

export default App;
