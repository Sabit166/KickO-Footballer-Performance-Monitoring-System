import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper
} from "@mui/material";
import backgroundImage from "../background_home.png"; // corrected path

function TeamPerformancePage() {
  const [matches, setMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [teamPerformance, setTeamPerformance] = useState([]);

  // Fetch list of matches from backend
  const fetchMatches = async () => {
    try {
      const res = await fetch("http://localhost:5000/matches");
      if (!res.ok) throw new Error("Failed to fetch matches");
      const data = await res.json();
      setMatches(data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  // Fetch team performance for selected match
  const fetchTeamsPerformance = async (matchId) => {
    try {
      const res = await fetch(`http://localhost:5000/team_performance/${matchId}`);
      if (!res.ok) throw new Error("Failed to fetch teams performance");
      const data = await res.json();
      setTeamPerformance(data);
    } catch (error) {
      console.error("Error fetching teams performance:", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // When a match is selected, fetch its performance stats
  useEffect(() => {
    if (selectedMatchId) {
      fetchTeamsPerformance(selectedMatchId);
    }
  }, [selectedMatchId]);

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
        <Box
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(8px)",
            p: 4,
            borderRadius: 3,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              letterSpacing: 2,
              textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            }}
          >
            Select a Match
          </Typography>

          {/* Styled list of matches (score header style without scores) */}
          {matches.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
              {matches.map(match => {
                const isSelected = selectedMatchId === match.MATCH_ID;
                return (
                  <Paper
                    key={match.MATCH_ID}
                    onClick={() => setSelectedMatchId(match.MATCH_ID)}
                    elevation={isSelected ? 6 : 2}
                    sx={{
                      cursor: 'pointer',
                      position:'relative',
                      p: 2.5,
                      px: 3,
                      borderRadius: 2,
                      bgcolor: isSelected ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.55)',
                      color: '#fff',
                      backdropFilter: 'blur(4px)',
                      transition: 'all .25s',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' }
                    }}
                  >
                    {/* Top meta row */}
                    <Box sx={{ display:'flex', justifyContent:'space-between', fontSize:13, opacity:0.85, mb:1 }}>
                      <Typography variant="caption" sx={{ fontWeight:500 }}>Match #{match.MATCH_ID}</Typography>
                      <Typography variant="caption" sx={{ fontWeight:500 }}>{match.WINNING_TEAM ? (/^(draw|tie|d)$/i.test(match.WINNING_TEAM)?'Full-time (Draw)':'Full-time') : ''}</Typography>
                    </Box>
                    {/* Team names row (no scores as per request) */}
                    <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', gap: 6, flexWrap:'wrap' }}>
                      <Box sx={{ textAlign:'center', minWidth:140 }}>
                        <Typography variant="h5" sx={{ fontWeight:'bold', mb:0.5 }}>{match.TEAM_ONE}</Typography>
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight:'bold', opacity:0.35 }}>vs</Typography>
                      <Box sx={{ textAlign:'center', minWidth:140 }}>
                        <Typography variant="h5" sx={{ fontWeight:'bold', mb:0.5 }}>{match.TEAM_TWO}</Typography>
                      </Box>
                    </Box>
                    {/* Stadium line */}
                    <Typography variant="body2" sx={{ textAlign:'center', mt:1.5, opacity:0.8, fontStyle: match.STADIUM? 'normal':'italic' }}>
                      {match.STADIUM ? match.STADIUM : 'Stadium TBD'}
                    </Typography>
                  </Paper>
                );
              })}
            </Box>
          ) : (
            <Typography variant="body1" sx={{ color: "#fff" }}>
              No matches available.
            </Typography>
          )}
        </Box>

        {/* Side-by-side stats layout for selected match */}
        {selectedMatchId && teamPerformance.length > 0 && (
          <Box sx={{ bgcolor:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)', p:4, borderRadius:3, boxShadow:'0 4px 30px rgba(0,0,0,0.35)' }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight:'bold', color:'#fff', letterSpacing:2, textShadow:'2px 2px 8px rgba(0,0,0,0.7)' }}>
              Team Performance for Match {selectedMatchId}
            </Typography>
            {teamPerformance.length === 2 && (
              <StatsComparison teams={teamPerformance} />
            )}
            {teamPerformance.length !== 2 && (
              <Typography align="center" sx={{ color:'#fff', opacity:0.8 }}>Need exactly 2 team entries to compare.</Typography>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}

// --- Stats comparison component (side-by-side like reference) ---
const StatsComparison = ({ teams }) => {
  const [teamA, teamB] = teams; // assume length 2
  const order = [
    { key:'TOTAL_GOALS', label:'Goals' },
    { key:'TOTAL_ASSISTS', label:'Assists' },
    { key:'TOTAL_FOULS', label:'Fouls' },
    { key:'TOTAL_YELLOW_CARDS', label:'Yellow cards' },
  { key:'TOTAL_RED_CARDS', label:'Red cards' }
  ].filter(item => item.key in teamA || item.key in teamB);

  const negativeKeys = new Set(['TOTAL_FOULS','TOTAL_YELLOW_CARDS','TOTAL_RED_CARDS']);

  const numeric = v => typeof v === 'number' ? v : parseFloat((v||'').toString().replace(/[^0-9.]/g,''));

  const Pill = ({ value, highlight, color }) => (
    <Box sx={{
      minWidth:44,
      px:1.2,
      py:0.5,
      borderRadius:3,
      textAlign:'center',
      fontWeight:600,
      fontSize:14,
      bgcolor: highlight ? (color || '#1565c0') : 'transparent',
      color: highlight ? '#fff' : '#e0e0e0'
    }}>{value ?? '-'}</Box>
  );

  const Row = ({ stat }) => {
    const aVal = teamA[stat.key];
    const bVal = teamB[stat.key];
    const aNum = numeric(aVal);
    const bNum = numeric(bVal);
    let aHi=false, bHi=false;
    if(!isNaN(aNum) && !isNaN(bNum) && aNum !== bNum){
      if(negativeKeys.has(stat.key)){
        if(aNum < bNum) aHi=true; else bHi=true; // lower better
      } else {
        if(aNum > bNum) aHi=true; else bHi=true; // higher better
      }
    }
    const colorB = bHi && stat.key==='TOTAL_YELLOW_CARDS' ? '#ff9800' : (bHi && stat.key==='TOTAL_RED_CARDS' ? '#d50000': undefined);
    const colorA = aHi && stat.key==='TOTAL_YELLOW_CARDS' ? '#ff9800' : (aHi && stat.key==='TOTAL_RED_CARDS' ? '#d50000': undefined);
    return (
      <Box key={stat.key} sx={{ display:'flex', alignItems:'center', py:1.15, gap:2 }}>
        <Box sx={{ flex:1, display:'flex', justifyContent:'flex-end' }}>
          <Pill value={aVal} highlight={aHi} color={colorA} />
        </Box>
        <Box sx={{ flex:1.6, textAlign:'center' }}>
          <Typography variant="body2" sx={{ fontWeight:500, letterSpacing:0.5 }}>{stat.label}</Typography>
        </Box>
        <Box sx={{ flex:1 }}>
          <Pill value={bVal} highlight={bHi} color={colorB} />
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{ display:'flex', alignItems:'center', mb:2 }}>
        <Box sx={{ flex:1, textAlign:'right', pr:2 }}>
          <Typography variant="h5" sx={{ fontWeight:'bold', color:'#90caf9' }}>{teamA.TEAM_NAME}</Typography>
        </Box>
        <Box sx={{ flex:1.6, textAlign:'center' }}>
          <Typography variant="subtitle1" sx={{ color:'#bdbdbd', letterSpacing:2 }}>TEAM STATS</Typography>
        </Box>
        <Box sx={{ flex:1, pl:2 }}>
          <Typography variant="h5" sx={{ fontWeight:'bold', color:'#ef9a9a' }}>{teamB.TEAM_NAME}</Typography>
        </Box>
      </Box>
      <Box sx={{ height:2, bgcolor:'rgba(255,255,255,0.08)', mb:1.5 }} />
      {order.map(stat => <Row key={stat.key} stat={stat} />)}
    </Box>
  );
};

export default TeamPerformancePage;