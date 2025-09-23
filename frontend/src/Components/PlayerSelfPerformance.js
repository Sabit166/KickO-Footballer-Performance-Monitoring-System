import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';

// Player self performance component: shows only the logged-in player's match stats
export default function PlayerSelfPerformance() {
  const { email, playerName } = useOutletContext() || {}; // provided by Playerpage outlet context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerInfo, setPlayerInfo] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!email) {
      setError('Email not available in context.');
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/player/self/performance?email=${encodeURIComponent(email)}`, {
          signal: controller.signal
        });
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Server responded ${res.status}: ${txt}`);
        }
        const data = await res.json();
        setPlayerInfo(data.player);
        setRows(data.performance || []);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => controller.abort();
  }, [email]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: '#ffffff' }}>
        My Match Performance
      </Typography>
      {playerInfo && (
        <Typography variant="subtitle1" sx={{ mb: 2, color: '#b0b0b0' }}>
          {playerInfo.PLAYER_NAME || playerName} | Team: {playerInfo.TEAM_NAME || 'Unknown'} | Email: {playerInfo.EMAIL}
        </Typography>
      )}
      {loading && <CircularProgress size={28} />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {!loading && !error && rows.length === 0 && (
        <Alert severity="info">No performance records found yet.</Alert>
      )}
      {!loading && !error && rows.length > 0 && (
        <TableContainer component={Paper} sx={{ backgroundColor: '#161b22' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#ffffff' }}>Match ID</TableCell>
                <TableCell sx={{ color: '#ffffff' }}>Versus</TableCell>
                <TableCell sx={{ color: '#ffffff' }} align="right">Goals</TableCell>
                <TableCell sx={{ color: '#ffffff' }} align="right">Assists</TableCell>
                <TableCell sx={{ color: '#ffffff' }} align="right">Fouls</TableCell>
                <TableCell sx={{ color: '#ffffff' }} align="right">Yellow</TableCell>
                <TableCell sx={{ color: '#ffffff' }} align="right">Red</TableCell>
                <TableCell sx={{ color: '#ffffff' }} align="right">Minutes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(r => {
                const opponent = (r.TEAM_ONE === r.PLAYER_TEAM) ? r.TEAM_TWO : (r.TEAM_TWO === r.PLAYER_TEAM ? r.TEAM_ONE : '');
                return (
                  <TableRow key={r.MATCH_ID + '_' + r.STATS_ID}>
                    <TableCell sx={{ color: '#ffffff' }}>{r.MATCH_ID}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{opponent}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }} align="right">{r.GOALS}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }} align="right">{r.ASSISTS}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }} align="right">{r.FOULS}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }} align="right">{r.YELLOW_CARDS}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }} align="right">{r.RED_CARDS}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }} align="right">{r.MINUTES_PLAYED}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
