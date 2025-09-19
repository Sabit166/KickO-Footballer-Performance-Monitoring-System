import React, { useState, useEffect, useRef, useCallback, useReducer, memo } from 'react';
import { Box, Typography, TextField, Button, IconButton, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import backgroundImage from '../background_home.png';
import { useNavigate } from 'react-router-dom';

// Assumptions (adjust to your backend):
// 1. POST /matches with { MATCH_ID, TEAM_ONE, TEAM_TWO, STADIUM, WINNING_TEAM }
// 2. POST /player_performance/<match_id> with array of player stat objects: 
//    [{ MATCH_ID, TEAM_NAME, PLAYER_NAME, GOALS, ASSISTS, FOULS, YELLOW_CARDS, RED_CARDS }]
// 3. (Optional) GET /teams/<team_name>/players returns [{ PLAYER_NAME }] if you later want auto-fill.

// Reducer for match details (stable reference, minimal re-renders per field)
function matchReducer(state, action) {
  switch (action.type) {
    case 'FIELD':
      if (state[action.name] === action.value) return state; // avoid useless re-render
      return { ...state, [action.name]: action.value };
    case 'RESET':
      return initialMatchState;
    default:
      return state;
  }
}

const initialMatchState = { MATCH_ID: '', TEAM_ONE: '', TEAM_TWO: '', STADIUM: '', WINNING_TEAM: '' };

// Small client-side id generator for newly-added rows to keep stable react keys
function generateClientId() {
  return 'c_' + Math.random().toString(36).slice(2, 9);
}

// Memoized form component (prevents losing focus due to parent re-renders)
const MatchDetailsForm = memo(function MatchDetailsForm({ values, onField, canEdit }) {
  const firstInputRef = useRef(null);
  useEffect(() => { firstInputRef.current?.focus(); }, []); // only once
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    onField(name, value);
  }, [onField]);
  return (
    <Box component="form" autoComplete="off" sx={{ display:'flex', flexDirection:'column', gap:2 }}>
      <WhiteTextField inputRef={firstInputRef} label="Match ID" name="MATCH_ID" value={values.MATCH_ID} onChange={handleChange} disabled={!canEdit} />
      <WhiteTextField label="Team One" name="TEAM_ONE" value={values.TEAM_ONE} onChange={handleChange} disabled={!canEdit} />
      <WhiteTextField label="Team Two" name="TEAM_TWO" value={values.TEAM_TWO} onChange={handleChange} disabled={!canEdit} />
      <WhiteTextField label="Stadium" name="STADIUM" value={values.STADIUM} onChange={handleChange} disabled={!canEdit} />
      <WhiteTextField label="Winning Team (or Draw)" name="WINNING_TEAM" value={values.WINNING_TEAM} onChange={handleChange} disabled={!canEdit} />
    </Box>
  );
});

function AddMatchWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [serverMatchId, setServerMatchId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [match, dispatchMatch] = useReducer(matchReducer, initialMatchState);
  const handleField = useCallback((name, value) => {
    dispatchMatch({ type: 'FIELD', name, value });
  }, []);

  // Player stats structure: { TeamName: [...] }
  const [playersByTeam, setPlayersByTeam] = useState({});

  // Initialize teams container when proceeding to step 2
  useEffect(() => {
    // When entering step 2 (after match created) fetch players for each team including trigger-created stats rows.
    async function loadTeamPlayers(team) {
      if (!team) return [];
      try {
        const resp = await fetch(`http://localhost:5000/teams/${encodeURIComponent(team)}/players?match_id=${encodeURIComponent(serverMatchId||match.MATCH_ID||'')}`);
        if (!resp.ok) throw new Error('Failed to fetch team players');
        const data = await resp.json();
        // Map returned players into the local player structure expected by the form
        return data.map(p => ({
          PLAYER_ID: p.PLAYER_ID || generateClientId(),
          STATS_ID: p.STATS_ID || '',
          PLAYER_NAME: p.PLAYER_NAME || '',
          GOALS: p.GOALS || 0,
          ASSISTS: p.ASSISTS || 0,
          FOULS: p.FOULS || 0,
          YELLOW_CARDS: p.YELLOW_CARDS || 0,
          RED_CARDS: p.RED_CARDS || 0,
          MINUTES_PLAYED: p.MINUTES_PLAYED || 0,
        }));
      } catch (e) {
        console.error(e);
        return [];
      }
    }

    if (step === 2 && serverMatchId) {
      (async () => {
        const t1 = await loadTeamPlayers(match.TEAM_ONE);
        const t2 = await loadTeamPlayers(match.TEAM_TWO);
        setPlayersByTeam(prev => ({
          ...(prev||{}),
          [match.TEAM_ONE]: prev[match.TEAM_ONE] && prev[match.TEAM_ONE].length? prev[match.TEAM_ONE] : t1,
          [match.TEAM_TWO]: prev[match.TEAM_TWO] && prev[match.TEAM_TWO].length? prev[match.TEAM_TWO] : t2,
        }));
      })();
    }
  }, [step, match.TEAM_ONE, match.TEAM_TWO, match.MATCH_ID, serverMatchId]);

  const addPlayerRow = useCallback((team) => {
    const id = generateClientId();
    setPlayersByTeam(prev => ({
      ...prev,
  [team]: [ ...(prev[team]||[]), { PLAYER_ID: id, STATS_ID: '', PLAYER_NAME: '', GOALS: 0, ASSISTS: 0, FOULS: 0, YELLOW_CARDS: 0, RED_CARDS: 0, MINUTES_PLAYED: 0 } ]
    }));
    // Focus newly created row's name input after DOM update
    setTimeout(() => {
      try {
        const el = document.querySelector(`[data-playerid="${id}"] input`);
        el && el.focus();
      } catch (e) { /* ignore */ }
    }, 60);
  }, []);

  const updatePlayerField = useCallback((team, index, field, value) => {
    setPlayersByTeam(prev => {
      const copy = { ...prev };
  copy[team] = copy[team].map((p, i) => i === index ? { ...p, [field]: field === 'PLAYER_NAME' ? value : (value === '' ? '' : Number(value)) } : p);
      return copy;
    });
  }, []);

  const removePlayerRow = useCallback((team, index) => {
    setPlayersByTeam(prev => {
      const copy = { ...prev };
      copy[team] = copy[team].filter((_, i) => i !== index);
      return copy;
    });
  }, []);

  const teamGoals = useCallback((team) => (playersByTeam[team] || []).reduce((s,p)=> s + (Number(p.GOALS)||0), 0), [playersByTeam]);
  const teamColor = useCallback((team) => {
    const { TEAM_ONE: t1, TEAM_TWO: t2 } = match;
    if (!t1 || !t2) return '#fff';
    const g1 = teamGoals(t1); const g2 = teamGoals(t2);
    if (g1 === g2) return '#ffeb3b';
    if (team === t1) return g1 > g2 ? '#2196f3' : '#f44336';
    return g2 > g1 ? '#2196f3' : '#f44336';
  }, [match, teamGoals]);

  const canProceed = match.MATCH_ID && match.TEAM_ONE && match.TEAM_TWO && match.STADIUM; // basic validation

  const submitAll = useCallback(async () => {
    try {
      setSubmitting(true); setError(null);
      const payload = Object.entries(playersByTeam).flatMap(([team, arr]) =>
        arr.filter(p => p.PLAYER_NAME.trim()).map(p => ({
          TEAM_NAME: team,
          PLAYER_NAME: p.PLAYER_NAME,
          STATS_ID: p.STATS_ID || undefined,
          GOALS: p.GOALS,
          ASSISTS: p.ASSISTS,
          FOULS: p.FOULS,
          YELLOW_CARDS: p.YELLOW_CARDS,
          RED_CARDS: p.RED_CARDS,
          MINUTES_PLAYED: p.MINUTES_PLAYED
        }))
      );
      if (payload.length) {
        const resPlayers = await fetch(`http://localhost:5000/player_performance/${encodeURIComponent(serverMatchId)}` , {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
        if (!resPlayers.ok) {
          const text = await resPlayers.text();
          throw new Error('Player stats save failed: ' + text);
        }
      }
      navigate('/adminpage/match');
    } catch (e) { console.error(e); setError(e.message); }
    finally { setSubmitting(false); }
  }, [playersByTeam, navigate, serverMatchId]);

  return (
    <Box sx={{ minHeight:'100vh', backgroundImage:`url(${backgroundImage})`, backgroundSize:'cover', backgroundPosition:'center', display:'flex', alignItems:'center', justifyContent:'center', p:3 }}>
      <Paper sx={{ width:'100%', maxWidth:1100, maxHeight:'92vh', overflowY:'auto', p:5, pb:12, position:'relative', borderRadius:6, bgcolor:'rgba(0,0,0,0.75)', backdropFilter:'blur(10px)', boxShadow:'0 0 50px rgba(0,150,255,0.35)' }}>
        <IconButton onClick={()=>navigate('/adminpage/match')} sx={{ position:'absolute', top:12, right:12, color:'#fff' }}><CloseIcon /></IconButton>
        <Typography variant="h4" sx={{ fontWeight:'bold', color:'#fff', mb:3 }}>Add Match Data</Typography>
        {/* Custom non-focusable step indicator (avoid focus steal) */}
        <Box sx={{ display:'flex', justifyContent:'center', gap:4, mb:4 }}>
          {[1,2].map(n => (
            <Box key={n} sx={{ display:'flex', flexDirection:'column', alignItems:'center', opacity: n>step?0.4:1, transition:'0.25s'}}>
              <Box sx={{ width:46, height:46, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', fontSize:18, bgcolor: n===step? 'linear-gradient(135deg,#2196f3,#21cbf3)': 'rgba(255,255,255,0.15)', color:'#fff', border:'2px solid rgba(255,255,255,0.4)', boxShadow: n===step? '0 0 10px rgba(33,150,243,0.6)': 'none' }}>{n}</Box>
              <Typography sx={{ mt:1, fontSize:13, fontWeight:'bold', color:'#fff' }}>{n===1? 'Match Details':'Player Stats'}</Typography>
            </Box>
          ))}
        </Box>
        {step === 1 && (
          <>
            <Typography variant="h5" sx={{ fontWeight:'bold', mb:3, color:'#fff' }}>Match Details</Typography>
            <MatchDetailsForm values={match} onField={handleField} canEdit={step===1} />
          </>
        )}
        {step === 2 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight:'bold', mb:3, color:'#fff' }}>Player Statistics</Typography>
            <Typography variant="body2" sx={{ mb:2, opacity:0.8, color:'#fff' }}>Add players for each team and fill their stats (leave unused rows blank).</Typography>
            {(match.TEAM_ONE && match.TEAM_TWO) && (
              <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', gap:4, p:2, mb:4, borderRadius:3, bgcolor:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)' }}>
                <Typography variant="h5" sx={{ fontWeight:'bold', minWidth:140, textAlign:'center', color: teamColor(match.TEAM_ONE) }}>{match.TEAM_ONE}</Typography>
                <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
                  <Typography variant="h3" sx={{ fontWeight:'bold', lineHeight:1, color: teamColor(match.TEAM_ONE) }}>{teamGoals(match.TEAM_ONE)}</Typography>
                  <Typography variant="h4" sx={{ opacity:0.6 }}>-</Typography>
                  <Typography variant="h3" sx={{ fontWeight:'bold', lineHeight:1, color: teamColor(match.TEAM_TWO) }}>{teamGoals(match.TEAM_TWO)}</Typography>
                </Box>
                <Typography variant="h5" sx={{ fontWeight:'bold', minWidth:140, textAlign:'center', color: teamColor(match.TEAM_TWO) }}>{match.TEAM_TWO}</Typography>
              </Box>
            )}
            <Box sx={{ display:'flex', flexDirection:'column', gap:4 }}>
              {[match.TEAM_ONE, match.TEAM_TWO].filter(Boolean).map(team => (
                <Paper key={team} sx={{ p:2.5, bgcolor:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)' }}>
                  <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:2 }}>
                    <Typography variant="h6" sx={{ fontWeight:'bold', color:'#fff' }}>{team}</Typography>
                    <Button size="small" variant="outlined" startIcon={<AddIcon />} onClick={()=>addPlayerRow(team)}>Add Player</Button>
                  </Box>
                  <Box sx={{ display:'flex', flexDirection:'column', gap:1.5 }}>
                      {(playersByTeam[team]||[]).map((p,i)=>(
                        <Box key={p.PLAYER_ID || i} data-playerid={p.PLAYER_ID || ''} sx={{ display:'grid', gridTemplateColumns:'2fr repeat(6, 80px) 40px', gap:1.25, alignItems:'center' }}>
                          <WhiteTextField size="small" label="Name" value={p.PLAYER_NAME} onChange={e=>updatePlayerField(team,i,'PLAYER_NAME',e.target.value)} />
                          {['GOALS','ASSISTS','FOULS','YELLOW_CARDS','RED_CARDS','MINUTES_PLAYED'].map(field => (
                            <WhiteTextField key={field} size="small" type="number" label={field.replace('_',' ')} value={p[field]} onChange={e=>updatePlayerField(team,i,field,e.target.value)} />
                          ))}
                          <IconButton size="small" onClick={()=>removePlayerRow(team,i)}><CloseIcon fontSize="small" /></IconButton>
                        </Box>
                      ))}
                    {(!playersByTeam[team] || playersByTeam[team].length===0) && (
                      <Button size="small" startIcon={<AddIcon />} onClick={()=>addPlayerRow(team)}>Add first player</Button>
                    )}
                  </Box>
                </Paper>
              ))}
            </Box>
            <Divider sx={{ my:4, borderColor:'rgba(255,255,255,0.1)' }} />
            {error && <Typography color="error" sx={{ mb:2 }}>{error}</Typography>}
          </Box>
        )}
        {/* Sticky action bar */}
        <Box sx={{ position:'sticky', bottom:0, left:0, mt:5, pt:2, display:'flex', justifyContent:'space-between', alignItems:'center', gap:2, background:'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))' }}>
          {step === 2 && <Button variant="text" color="inherit" onClick={()=>setStep(1)} sx={{ color:'#fff' }}>Back</Button>}
          {step === 1 && <Button variant="contained" disabled={!canProceed || submitting} onClick={async ()=>{
            try {
              setSubmitting(true); setError(null);
              // Create match first so trigger generates placeholder stats
              const res = await fetch('http://localhost:5000/matches', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(match)
              });
              if (!res.ok) { const text = await res.text(); throw new Error('Match creation failed: ' + text); }
              const created = await res.json();
              setServerMatchId(created.MATCH_ID || match.MATCH_ID);
              setStep(2);
            } catch (e) { console.error(e); setError(e.message); }
            finally { setSubmitting(false); }
          }} sx={{ ml:'auto' }}>Next: Player Stats</Button>}
          {step === 2 && <Button variant="contained" color="success" disabled={submitting || !serverMatchId} onClick={submitAll} sx={{ ml:'auto' }}>{submitting? 'Saving...' : 'Finish & Save'}</Button>}
        </Box>
      </Paper>
    </Box>
  );
}

export default AddMatchWizard;

// Styled white text field (placed after export for clarity; can be moved above component if preferred)
const WhiteTextField = styled(TextField)(() => ({
  '& .MuiInputBase-input': { color: '#fff' },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.4)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2196f3' }
}));
