import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress
} from "@mui/material";
import backgroundImage from "../background_home.png"; // corrected path inside src

function PlayersPerformancePage() {
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [players, setPlayers] = useState([]); // players for selected match
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [playerError, setPlayerError] = useState(null);

  // Fetch matches (reuse /matches endpoint)
  const fetchMatches = async () => {
    try {
      setLoadingMatches(true);
      const res = await fetch("http://localhost:5000/matches");
      if (!res.ok) throw new Error('Failed to fetch matches');
      const data = await res.json();
      setMatches(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMatches(false);
    }
  };

  // Fetch players for a specific match
  // Backend endpoint: /player_performance/<match_id>
  const fetchPlayersForMatch = async (matchId) => {
    if (!matchId) return;
    try {
      setLoadingPlayers(true);
      setPlayerError(null);
      console.log('[PlayerPerformance] Fetching players for match', matchId);
  const res = await fetch(`http://localhost:5000/matches/${matchId}/players-stats`);
      if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
      const data = await res.json();
      console.log('[PlayerPerformance] Raw response:', data);
      // Flexible extraction depending on backend shape
      let extracted = [];
      if (Array.isArray(data)) extracted = data;
      else if (Array.isArray(data.players)) extracted = data.players;
      else if (Array.isArray(data.data)) extracted = data.data;
      else if (data.teamPlayers) { // possible map of team->array
        extracted = Object.values(data.teamPlayers).flat();
      }
      if (!Array.isArray(extracted)) extracted = [];
      setPlayers(extracted);
      if (extracted.length === 0) {
        console.warn('[PlayerPerformance] No players extracted. Check backend payload keys.');
      }
    } catch (e) {
      console.error(e);
      setPlayerError(e.message);
      setPlayers([]);
    } finally {
      setLoadingPlayers(false);
    }
  };

  useEffect(() => { fetchMatches(); }, []);
  useEffect(() => { if (selectedMatchId) fetchPlayersForMatch(selectedMatchId); }, [selectedMatchId]);

  // Group players by team
  const grouped = useMemo(() => {
    const groups = {};
    players.forEach(p => {
      const team = p.TEAM_NAME || p.team || 'Unknown Team';
      if (!groups[team]) groups[team] = [];
      groups[team].push(p);
    });
    return groups;
  }, [players]);
  const teamNames = Object.keys(grouped);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Match selection panel */}
        <Box sx={{ bgcolor:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', p:4, borderRadius:3, boxShadow:'0 4px 30px rgba(0,0,0,0.3)', mb:4 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight:'bold', color:'#fff', letterSpacing:2, textShadow:'2px 2px 8px rgba(0,0,0,0.7)' }}>
            Select a Match
          </Typography>
          <Box sx={{ display:'flex', flexDirection:'column', gap:2 }}>
            {loadingMatches && <Box sx={{ display:'flex', justifyContent:'center', py:2 }}><CircularProgress size={28} sx={{ color:'#fff' }} /></Box>}
            {!loadingMatches && matches.map(m => {
              const active = m.MATCH_ID === selectedMatchId;
              return (
                <Paper key={m.MATCH_ID} onClick={() => setSelectedMatchId(m.MATCH_ID)} elevation={active?6:2} sx={{ cursor:'pointer', p:2.2, px:3, borderRadius:2, bgcolor: active? 'rgba(0,0,0,0.75)':'rgba(0,0,0,0.55)', color:'#fff', display:'flex', justifyContent:'space-between', alignItems:'center', transition:'all .25s', '&:hover':{ bgcolor:'rgba(0,0,0,0.75)' } }}>
                  <Typography variant="subtitle1" sx={{ fontWeight:600 }}>{m.TEAM_ONE} vs {m.TEAM_TWO}</Typography>
                  <Typography variant="caption" sx={{ opacity:0.8 }}>Match #{m.MATCH_ID}</Typography>
                </Paper>
              );
            })}
            {!loadingMatches && matches.length === 0 && <Typography sx={{ color:'#fff', opacity:0.85 }}>No matches found.</Typography>}
          </Box>
        </Box>

        {/* Players grouped by team for selected match */}
        {selectedMatchId && (
          <Box sx={{ bgcolor:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)', p:4, borderRadius:3, boxShadow:'0 4px 30px rgba(0,0,0,0.35)' }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight:'bold', color:'#fff', letterSpacing:2, textShadow:'2px 2px 8px rgba(0,0,0,0.7)' }}>
              Players – Match {selectedMatchId}
            </Typography>
            {loadingPlayers && <Box sx={{ display:'flex', justifyContent:'center', py:3 }}><CircularProgress size={32} sx={{ color:'#fff' }} /></Box>}
            {!loadingPlayers && playerError && <Typography align="center" sx={{ color:'#ff8080', fontWeight:500 }}>{playerError}</Typography>}
            {!loadingPlayers && !playerError && teamNames.length === 0 && <Typography align="center" sx={{ color:'#fff', opacity:0.85 }}>No player stats for this match (empty response).</Typography>}
            {!loadingPlayers && teamNames.length > 0 && (
              <Box sx={{ display:'flex', flexDirection:'column', gap:4 }}>
                {teamNames.map(team => (
                  <Box key={team}>
                    <Box sx={{ display:'flex', alignItems:'center', mb:1.5, gap:1 }}>
                      <Typography variant="h5" sx={{ fontWeight:'bold', color:'#90caf9' }}>{team}</Typography>
                      <Chip label={`${grouped[team].length} players`} size="small" sx={{ bgcolor:'rgba(255,255,255,0.15)', color:'#fff' }} />
                    </Box>
                    <TableContainer component={Paper} sx={{ bgcolor:'rgba(255,255,255,0.92)', borderRadius:2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><strong>Player</strong></TableCell>
                            <TableCell align="center"><strong>Goals</strong></TableCell>
                            <TableCell align="center"><strong>Assists</strong></TableCell>
                            <TableCell align="center"><strong>Fouls</strong></TableCell>
                            <TableCell align="center"><strong>Yellow Cards</strong></TableCell>
                            <TableCell align="center"><strong>Red Cards</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {grouped[team].map(p => (
                            <TableRow key={p.PLAYER_ID} hover>
                              <TableCell>{p.PLAYER_NAME}</TableCell>
                              <TableCell align="center">{p.GOALS ?? 0}</TableCell>
                              <TableCell align="center">{p.ASSISTS ?? 0}</TableCell>
                              <TableCell align="center">{p.FOULS ?? 0}</TableCell>
                              <TableCell align="center" sx={{ color: (p.YELLOW_CARDS||0) > 0 ? '#ff9800':'inherit', fontWeight:(p.YELLOW_CARDS||0)>0?600:400 }}>{p.YELLOW_CARDS ?? 0}</TableCell>
                              <TableCell align="center" sx={{ color: (p.RED_CARDS||0) > 0 ? '#d32f2f':'inherit', fontWeight:(p.RED_CARDS||0)>0?600:400 }}>{p.RED_CARDS ?? 0}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default PlayersPerformancePage;
