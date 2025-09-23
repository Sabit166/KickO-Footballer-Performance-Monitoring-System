import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  Button as MuiButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert as MuiAlert,
  IconButton,
  Chip,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

// Utility: API base
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

// Simple wrappers to keep Tailwind-friendly className on MUI Cards/Buttons
const Card = ({ children, className, ...rest }) => (
  <MuiCard {...rest} className={className} sx={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)', color: '#fff' }}>{children}</MuiCard>
);
const Button = ({ children, className, ...rest }) => (
  <MuiButton {...rest} className={className} sx={{ textTransform: 'none', borderRadius: '9999px' }}>{children}</MuiButton>
);
const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

// Image helpers
const knownImageMap = {
  'lionel messi': '/Lionel Messi.jpg',
  'lionel andres messi': '/Lionel Messi.jpg',
  'messi': '/messi.jpg',
  'cristiano ronaldo': '/Ronaldo.jpg',
  'cristiano ronaldo dos santos aveiro': '/Ronaldo.jpg',
  'ronaldo': '/Ronaldo.jpg',
  'kylian mbappe': '/Mbappe.jpg',
  //'kylian mbappe lottin': '/Mbappe.jpg',
  //'kylian mbappé': '/Mbappe.jpg',
  //'mbappe': '/Mbappe.jpg',
  'neymar jr': '/Neymar Jr.jpg',
  'neymar': '/Neymar Jr.jpg',
  'mohamed salah': '/Mohamed Salah.jpeg',
  'robert lewandowski': '/Robert_Lewandowski.jpg',
  'virgil van dijk': '/Vargil Van Dijk.jpg',
  'harry kane': '/Harry Kane.jpg',
  'kevin de bruyne': '/Kevin De Brunye.jpg',
  'manuel neuer': '/Manuel Neur.jpg',
};

function normalizeName(s = '') {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[_]+/g, ' ')
    .trim()
    .toLowerCase();
}

function buildImageCandidates(player) {
  const nameRaw = String(player?.PLAYER_NAME || player?.name || '').trim();
  const name = normalizeName(nameRaw);
  if (!name) return ['/football.png'];

  const tokens = name.split(/\s+/);
  // removed unused 'first'
  const last = tokens[tokens.length - 1] || '';

  const mapped = knownImageMap[name] || knownImageMap[last] || null;

  // Special-case: Mbappé often saved with varying cases/accents
  const specials = [];
  if (name.includes('mbapp??') || last === 'mbapp??') {
    specials.push('/Mbappe.jpg', '/mbappe.jpg', '/Mbappe.JPG', '/mbappe.JPG', '/Kylian Mbappé.jpg', '/Kylian Mbappe.jpg');
  }

  const exts = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
  const withExts = (base) => exts.map((e) => `${base}${e}`);

  const variants = [
    // Prefer explicit known mapping first
    ...(mapped ? [mapped] : []),
    // Special-cased common filenames for well-known players
    ...specials,
    // Raw name variants
    ...withExts(`/${nameRaw}`),
    // normalized name variants
    ...withExts(`/${name}`),
    // separators
    ...withExts(`/${name.replace(/\s+/g, '_')}`),
    ...withExts(`/${name.replace(/\s+/g, '-')}`),
    // last-name only
    ...(last ? withExts(`/${last}`) : []),
    // Final fallback only
    '/football.png',
  ];

  // Deduplicate while preserving order and remove empties
  const seen = new Set();
  const unique = [];
  for (const v of variants) {
    if (v && !seen.has(v)) { seen.add(v); unique.push(v); }
  }
  return unique;
}

function PlayerImg({ player, className }) {
  const cands = React.useMemo(() => buildImageCandidates(player), [player]);
  const [idx, setIdx] = React.useState(0);
  const onError = React.useCallback(() => {
    setIdx((i) => (i + 1 < cands.length ? i + 1 : i));
  }, [cands.length]);
  const src = React.useMemo(() => encodeURI(cands[idx]), [cands, idx]);
  return <img src={src} onError={onError} alt={player?.PLAYER_NAME || 'Player'} className={className} />;
}

export default function TrainingDashboard() {
  // Data state
  const [players, setPlayers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [records, setRecords] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [avg, setAvg] = useState({ avgDistance: 0, avgPassingAccuracy: 0, avgSprintCount: 0, avgShotsOnTarget: 0 });
  const [sinceIso, setSinceIso] = useState(null); // for incremental polling

  // UI state
  const [adminOpen, setAdminOpen] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [showTeamAvg, setShowTeamAvg] = useState(false); // Added missing state for team/individual toggle

  // Carousel state
  const [activeIndex, setActiveIndex] = useState(0);
  const autoRef = useRef(null);

  // Forms: Add Training (type) and Add Training Record
  const [trainingForm, setTrainingForm] = useState({ time_of_day: '', type: '', focus: '', intensity: '', duration: '', activities: '' });
  const [recordForm, setRecordForm] = useState({ training_id: '', player_id: '', day: new Date().toISOString().substring(0, 10), distance_covered: '', sprint_count: '', shots_on_target: '', duration: '01:00:00', passing_accuracy: '' });

  // Fetch base data
  useEffect(() => {
    const loadAll = async () => {
      try {
        const [plrRes, trnRes, recRes, perfRes] = await Promise.all([
          fetch(`${API_BASE}/players`),
          fetch(`${API_BASE}/trainings/`),
          fetch(`${API_BASE}/training_records`),
          fetch(`${API_BASE}/training_records/performance_metrics`),
        ]);
        if (!plrRes.ok) throw new Error(`players ${plrRes.status}`);
        if (!trnRes.ok) throw new Error(`trainings ${trnRes.status}`);
        if (!recRes.ok) throw new Error(`training_records ${recRes.status}`);
        if (!perfRes.ok) throw new Error(`performance_metrics ${perfRes.status}`);
        const [plrs, trns, recs, perf] = await Promise.all([
          plrRes.json(),
          trnRes.json(),
          recRes.json(),
          perfRes.json(),
        ]);
        setPlayers(plrs || []);
        setTrainings(trns || []);
        setRecords(recs || []);
        // Establish baseline for incremental polling: last seen day
        const lastDay = (recs || [])
          .map((r) => new Date(r.day))
          .filter((d) => !isNaN(d))
          .sort((a, b) => b - a)[0];
        if (lastDay) setSinceIso(lastDay.toISOString().slice(0, 10));
        // set defaults so selects are usable immediately
        setRecordForm((rf) => ({
          ...rf,
          player_id: (plrs?.[0]?.PLAYER_ID) || rf.player_id,
          training_id: (trns?.[0]?.training_id) || rf.training_id,
        }));
        // Process perf data for charts
        const formatted = (perf || []).map((d) => ({
          ...d,
          day: new Date(d.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        }));
        setPerformanceData(formatted);
        // Fetch server-side aggregate summary (SQL AVG)
        try {
          const sumRes = await fetch(`${API_BASE}/training_records/summary${(plrs?.length ? '' : '')}`);
          if (sumRes.ok) {
            const s = await sumRes.json();
            setAvg({
              avgDistance: Number(s.avgDistance || 0).toFixed(2),
              avgPassingAccuracy: Number(s.avgPassingAccuracy || 0).toFixed(2),
              avgSprintCount: Number(s.avgSprintCount || 0).toFixed(2),
              avgShotsOnTarget: Number(s.avgShotsOnTarget || 0).toFixed(2),
            });
          }
        } catch {}
      } catch (e) {
        setSnackbar({ open: true, message: `Failed to load data: ${e.message}`, severity: 'error' });
      }
    };
    loadAll();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActiveIndex((i) => (players.length ? (i + 1) % players.length : 0));
    }, 4000);
    return () => clearInterval(autoRef.current);
  }, [players.length]);

  const activePlayer = players[activeIndex] || null;

  // When user selects a player in carousel, prefill the record form
  // Remove effect that syncs record form player_id with carousel animation

  // Derived map of playerId->name for tables
  const playerNameById = useMemo(() => {
    const m = new Map();
    players.forEach((p) => m.set(p.PLAYER_ID || p.player_id, p.PLAYER_NAME || p.name));
    return m;
  }, [players]);

  // Filtered data by selected player
  const filteredRecords = useMemo(() => {
    if (!activePlayer) return records;
    return records.filter((r) => String(r.player_id) === String(activePlayer.PLAYER_ID));
  }, [records, activePlayer]);
  // Sort records by date desc (newest first) for table rendering
  const sortedRecordsDesc = useMemo(() => {
    const list = (filteredRecords.length ? filteredRecords : records).slice();
    list.sort((a, b) => {
      const ad = new Date(a.day);
      const bd = new Date(b.day);
      const cmp = bd - ad;
      if (cmp !== 0) return cmp;
      // tie-breaker by training_id desc if available
      const ati = Number(a.training_id || 0);
      const bti = Number(b.training_id || 0);
      return bti - ati;
    });
    return list;
  }, [filteredRecords, records]);
  const filteredPerf = useMemo(() => {
    if (!activePlayer) return performanceData;
    return performanceData.filter((d) => String(d.player_id) === String(activePlayer.PLAYER_ID));
  }, [performanceData, activePlayer]);

  // Quick summary for selected player
  const playerSummary = useMemo(() => {
    const list = filteredRecords.slice(-30); // last 30 entries
    if (!list.length) return null;
    const dist = list.reduce((s, r) => s + Number(r.distance_covered || 0), 0);
    const acc = list.reduce((s, r) => s + Number(r.passing_accuracy || 0), 0) / list.length;
    const sprints = list.reduce((s, r) => s + Number(r.sprint_count || 0), 0);
    const shots = list.reduce((s, r) => s + Number(r.shots_on_target || 0), 0);
    return { sessions: list.length, dist: dist.toFixed(1), acc: acc.toFixed(0), sprints, shots };
  }, [filteredRecords]);

  // Handlers
  const handleTrainingSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...trainingForm };
      if (payload.activities) {
        try { payload.activities = JSON.parse(payload.activities); } catch { /* keep as string */ }
      }
      const res = await fetch(`${API_BASE}/trainings/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(await res.text());
      setSnackbar({ open: true, message: 'Training type added', severity: 'success' });
      const list = await (await fetch(`${API_BASE}/trainings/`)).json();
      setTrainings(list || []);
      setTrainingForm({ time_of_day: '', type: '', focus: '', intensity: '', duration: '', activities: '' });
    } catch (e) {
      setSnackbar({ open: true, message: `Failed to add training: ${e.message}`, severity: 'error' });
    }
  };

  const handleRecordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/training_records`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(recordForm) });
      if (!res.ok) throw new Error(await res.text());
      const created = await res.json();
      // Optimistically add the created record so UI updates instantly
      if (created && created.record) {
        setRecords((prev) => [...prev, created.record]);
      }
      setSnackbar({ open: true, message: 'Training record added', severity: 'success' });
      const list = await (await fetch(`${API_BASE}/training_records`)).json();
      setRecords(list || []);
      // Refresh performance too
      const perf = await (await fetch(`${API_BASE}/training_records/performance_metrics`)).json();
      const formatted = (perf || []).map((d) => ({ ...d, day: new Date(d.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }));
      setPerformanceData(formatted);
    } catch (e) {
      setSnackbar({ open: true, message: `Failed to add record: ${e.message}`, severity: 'error' });
    }
  };

  // Lightweight polling to keep records and metrics fresh ("real-time")
  useEffect(() => {
    let timer = null;
    const poll = async () => {
      try {
        // Incremental records fetch since last seen day
        const recUrl = sinceIso
          ? `${API_BASE}/training_records/_since?since=${encodeURIComponent(sinceIso)}${activePlayer ? `&player_id=${activePlayer.PLAYER_ID}` : ''}`
          : `${API_BASE}/training_records${activePlayer ? `?player_id=${activePlayer.PLAYER_ID}` : ''}`;
        const [recRes, perfRes] = await Promise.all([
          fetch(recUrl),
          fetch(`${API_BASE}/training_records/performance_metrics${activePlayer ? `?player_id=${activePlayer.PLAYER_ID}` : ''}`),
        ]);
        if (recRes.ok) {
          const recs = await recRes.json();
          if (sinceIso) {
            // merge new recs, de-dup by composite key
            setRecords((prev) => {
              const key = (r) => `${r.player_id}|${r.training_id}|${r.day}`;
              const map = new Map(prev.map((r) => [key(r), r]));
              (recs || []).forEach((r) => map.set(key(r), r));
              const merged = Array.from(map.values());
              // update since to latest day
              const lastDay = merged
                .map((r) => new Date(r.day))
                .filter((d) => !isNaN(d))
                .sort((a, b) => b - a)[0];
              if (lastDay) setSinceIso(lastDay.toISOString().slice(0, 10));
              return merged;
            });
          } else {
            setRecords(recs || []);
            const lastDay = (recs || [])
              .map((r) => new Date(r.day))
              .filter((d) => !isNaN(d))
              .sort((a, b) => b - a)[0];
            if (lastDay) setSinceIso(lastDay.toISOString().slice(0, 10));
          }
        }
        if (perfRes.ok) {
          const perf = await perfRes.json();
          const formatted = (perf || []).map((d) => ({
            ...d,
            day: new Date(d.day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          }));
          setPerformanceData(formatted);
        }
      } catch (_) {
        // ignore transient errors during polling
      }
    };
    // start immediately and then every 12s
    poll();
    timer = setInterval(poll, 12000);
    return () => clearInterval(timer);
  }, [activePlayer, sinceIso]);

  // Carousel card style
  const cardStyle = (index) => {
    if (!players.length) return {};
    const offset = index - activeIndex;
    const abs = Math.abs(offset);
    const translateX = offset * 220; // spacing
    const rotate = offset * -6;
    const scale = Math.max(0.8, 1 - abs * 0.05);
    const z = 100 - abs;
    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotate}deg)`,
      zIndex: z,
      transition: 'transform 600ms cubic-bezier(.2,.8,.2,1)',
      boxShadow: offset === 0 ? '0 20px 60px rgba(0,0,0,0.6)' : '0 10px 25px rgba(0,0,0,0.35)',
      border: offset === 0 ? '1px solid rgba(0,188,212,0.4)' : '1px solid rgba(255,255,255,0.08)'
    };
  };

  return (
    <div className="min-h-screen text-foreground" style={{
      backgroundImage: "url('/bg3.jpg')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="backdrop-blur-[1px] min-h-screen bg-black/35">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/kicko.png" alt="KickO" className="w-10 h-10 rounded-full" />
            <h1 className="text-xl font-bold text-white">Training Dashboard</h1>
            {activePlayer && !showTeamAvg && (
              <>
                <Chip label={`Player: ${activePlayer.PLAYER_NAME}`} size="medium" sx={{ ml: 2, color:'#fff', borderColor:'#fff', bgcolor:'rgba(0,0,0,0.12)', border: '1px solid' }} variant="outlined" />
                <Chip label={`Avg Dist: ${playerSummary ? playerSummary.dist : '0'} km`} size="medium" sx={{ ml: 2, color:'#fff', borderColor:'#0ea5b7', bgcolor:'rgba(14,165,183,0.12)', border: '1px solid' }} variant="outlined" />
                <Chip label={`Avg Acc: ${playerSummary ? playerSummary.acc : '0'}%`} size="medium" sx={{ ml: 1, color:'#fff', borderColor:'#16a34a', bgcolor:'rgba(22,163,74,0.12)', border: '1px solid' }} variant="outlined" />
              </>
            )}
            {showTeamAvg && (
              <>
                <Chip label={`Team Avg Dist: ${avg.avgDistance} km`} size="medium" sx={{ ml: 2, color:'#fff', borderColor:'#0ea5b7', bgcolor:'rgba(14,165,183,0.12)', border: '1px solid' }} variant="outlined" />
                <Chip label={`Team Avg Acc: ${avg.avgPassingAccuracy}%`} size="medium" sx={{ ml: 1, color:'#fff', borderColor:'#16a34a', bgcolor:'rgba(22,163,74,0.12)', border: '1px solid' }} variant="outlined" />
              </>
            )}
            <Button variant="contained" sx={{ minWidth: 40, minHeight: 40, borderRadius: 2, ml: 2, bgcolor: showTeamAvg ? '#0ea5b7' : '#222', color: '#fff', fontWeight: 'bold', boxShadow: 'none' }} onClick={() => setShowTeamAvg((v) => !v)}>
              {showTeamAvg ? 'P' : 'T'}
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <img src="/kicko.png" alt="KickO" className="w-10 h-10 rounded-full ring-2 ring-white/20" />
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setAdminOpen((v) => !v)}>
              {adminOpen ? 'Hide Admin' : 'Show Admin'}
            </Button>
          </div>
        </div>

        {/* Admin Panel */}
        {adminOpen && (
          <div className="px-4 py-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Add Training Type */}
            <Card className="glow-border">
              <CardHeader title="Add Training Type" sx={{ '& .MuiCardHeader-title': { color: '#fff' } }} />
              <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleTrainingSubmit}>
                  <TextField label="Time of Day" value={trainingForm.time_of_day} onChange={(e) => setTrainingForm({ ...trainingForm, time_of_day: e.target.value })} fullWidth size="small" InputLabelProps={{ style: { color: '#e5e7eb' } }} inputProps={{ style: { color: '#fff' } }} />
                  <TextField label="Type" value={trainingForm.type} onChange={(e) => setTrainingForm({ ...trainingForm, type: e.target.value })} fullWidth size="small" InputLabelProps={{ style: { color: '#e5e7eb' } }} inputProps={{ style: { color: '#fff' } }} />
                  <TextField label="Focus" value={trainingForm.focus} onChange={(e) => setTrainingForm({ ...trainingForm, focus: e.target.value })} fullWidth size="small" InputLabelProps={{ style: { color: '#e5e7eb' } }} inputProps={{ style: { color: '#fff' } }} />
                  <TextField label="Intensity" value={trainingForm.intensity} onChange={(e) => setTrainingForm({ ...trainingForm, intensity: e.target.value })} fullWidth size="small" InputLabelProps={{ style: { color: '#e5e7eb' } }} inputProps={{ style: { color: '#fff' } }} />
                  <TextField label="Duration (min)" value={trainingForm.duration} onChange={(e) => setTrainingForm({ ...trainingForm, duration: e.target.value })} fullWidth size="small" InputLabelProps={{ style: { color: '#e5e7eb' } }} inputProps={{ style: { color: '#fff' } }} />
                  <TextField label="Activities (JSON or text)" value={trainingForm.activities} onChange={(e) => setTrainingForm({ ...trainingForm, activities: e.target.value })} fullWidth size="small" InputLabelProps={{ style: { color: '#e5e7eb' } }} inputProps={{ style: { color: '#fff' } }} />
                  <div className="md:col-span-2 flex justify-end">
                    <Button type="submit" variant="contained" color="primary">Create</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Add Training Record */}
            <Card className="glow-border">
              <CardHeader title="Add Training Record" sx={{ '& .MuiCardHeader-title': { color: '#fff' } }} />
              <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-3" onSubmit={handleRecordSubmit}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="player-select" sx={{ color: '#e5e7eb', '&.Mui-focused': { color: '#fff' } }}>Player</InputLabel>
                    <Select labelId="player-select" label="Player" value={recordForm.player_id} onChange={(e) => setRecordForm({ ...recordForm, player_id: e.target.value })} MenuProps={{ PaperProps: { sx: { bgcolor: '#0b1220', color: '#fff' } } }} sx={{ color: '#fff' }}>
                      {players.map((p) => (
                        <MenuItem key={p.PLAYER_ID} value={p.PLAYER_ID}>{p.PLAYER_NAME} ({p.PLAYER_ID})</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="training-select" sx={{ color: '#e5e7eb', '&.Mui-focused': { color: '#fff' } }}>Training</InputLabel>
                    <Select labelId="training-select" label="Training" value={recordForm.training_id} onChange={(e) => setRecordForm({ ...recordForm, training_id: e.target.value })} MenuProps={{ PaperProps: { sx: { bgcolor: '#0b1220', color: '#fff' } } }} sx={{ color: '#fff' }}>
                      {trainings.map((t) => (
                        <MenuItem key={t.training_id} value={t.training_id}>{t.type} · {t.focus}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField type="date" label="Day" InputLabelProps={{ shrink: true, style: { color: '#e5e7eb' } }} size="small" value={recordForm.day} onChange={(e) => setRecordForm({ ...recordForm, day: e.target.value })} fullWidth inputProps={{ style: { color: '#fff' } }} />
                  <TextField label="Distance (km)" size="small" type="number" value={recordForm.distance_covered} onChange={(e) => setRecordForm({ ...recordForm, distance_covered: Number(e.target.value) })} fullWidth InputLabelProps={{ style: { color: '#e5e7eb' } }} inputProps={{ style: { color: '#fff' } }} />
                  <TextField label="Sprints" size="small" type="number" value={recordForm.sprint_count} onChange={(e) => setRecordForm({ ...recordForm, sprint_count: Number(e.target.value) })} fullWidth InputLabelProps={{ style: { color: '#e5e7eb' } }} inputProps={{ style: { color: '#fff' } }} />
                  <TextField label="Shots on Target" size="small" type="number" value={recordForm.shots_on_target} onChange={(e) => setRecordForm({ ...recordForm, shots_on_target: Number(e.target.value) })} fullWidth InputLabelProps={{ style: { color: '#e5e7eb' } }} inputProps={{ style: { color: '#fff' } }} />
                  <TextField label="Duration (HH:MM:SS)" size="small" value={recordForm.duration} onChange={(e) => setRecordForm({ ...recordForm, duration: e.target.value })} fullWidth InputLabelProps={{ style: { color: '#e5e7eb' } }} inputProps={{ style: { color: '#fff' } }} />
                  <TextField label="Passing Accuracy (%)" size="small" type="number" value={recordForm.passing_accuracy} onChange={(e) => setRecordForm({ ...recordForm, passing_accuracy: Number(e.target.value) })} fullWidth InputLabelProps={{ style: { color: '#e5e7eb' } }} inputProps={{ style: { color: '#fff' } }} />
                  <div className="md:col-span-3 flex justify-end mt-1">
                    <Button type="submit" variant="contained" color="success">Add Record</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Player Carousel Section */}
        <div className="px-4 py-6">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">Players</h2>
              <div className="flex items-center gap-2">
                <IconButton color="inherit" onClick={() => setActiveIndex((i) => (players.length ? (i - 1 + players.length) % players.length : 0))}><ArrowBackIosNewIcon /></IconButton>
                <IconButton color="inherit" onClick={() => setActiveIndex((i) => (players.length ? (i + 1) % players.length : 0))}><ArrowForwardIosIcon /></IconButton>
              </div>
            </div>

            <div className="relative h-[360px] flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
                {players.length === 0 && (
                  <div className="text-white/80 text-sm">No players found. Add players in Admin or seed the database.</div>
                )}
                {players.map((p, idx) => (
                  <MuiCard key={p.PLAYER_ID} className="absolute w-[220px] h-[320px] overflow-hidden rounded-xl text-white" sx={cardStyle(idx)} onClick={() => setActiveIndex(idx)}>
                    <div className="w-full h-full relative">
                      <PlayerImg player={p} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-extrabold text-primary/90">{String(p.PLAYER_ID).slice(-2)}</span>
                          <span className="text-sm opacity-80">ID</span>
                        </div>
                        <div className="text-lg font-bold leading-tight">{p.PLAYER_NAME}</div>
                      </div>
                    </div>
                  </MuiCard>
                ))}
              </div>
            </div>

            {activePlayer && (
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
                <div className="lg:col-span-2 text-sm text-white/90">
                  <span className="opacity-80 mr-2">Selected:</span>
                  <span className="font-semibold">{activePlayer.PLAYER_NAME} (#{activePlayer.PLAYER_ID})</span>
                </div>
                <div className="flex gap-3 text-xs">
                  {playerSummary ? (
                    <>
                      <div className="px-3 py-2 rounded border border-white/10 bg-black/30">Sessions: <b>{playerSummary.sessions}</b></div>
                      <div className="px-3 py-2 rounded border border-white/10 bg-black/30">Dist: <b>{playerSummary.dist} km</b></div>
                      <div className="px-3 py-2 rounded border border-white/10 bg-black/30">Acc: <b>{playerSummary.acc}%</b></div>
                      <div className="px-3 py-2 rounded border border-white/10 bg-black/30">Sprints: <b>{playerSummary.sprints}</b></div>
                    </>
                  ) : (
                    <div className="px-3 py-2 rounded border border-white/10 bg-black/30">No recent training</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Records Table + Charts */}
        <div className="px-4 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Table */}
          <Card className="lg:col-span-2">
            <CardHeader title={activePlayer ? `Training Records · ${activePlayer.PLAYER_NAME}` : 'Recent Training Records'} sx={{ '& .MuiCardHeader-title': { color: '#fff' } }} />
            <CardContent>
              <div className="overflow-x-auto">
                <Table size="small" sx={{ '& td, & th': { borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.92)' } }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Player</TableCell>
                      <TableCell>Training</TableCell>
                      <TableCell align="right">Distance (km)</TableCell>
                      <TableCell align="right">Accuracy (%)</TableCell>
                      <TableCell align="right">Sprints</TableCell>
                      <TableCell align="right">Shots</TableCell>
                      <TableCell>Duration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedRecordsDesc.slice(0, 20).map((r, i) => (
                      <TableRow key={`${r.player_id}-${r.training_id}-${r.day}-${i}`} hover>
                        <TableCell>{new Date(r.day).toLocaleDateString()}</TableCell>
                        <TableCell className="whitespace-nowrap">{playerNameById.get(r.player_id) || r.player_id}</TableCell>
                        <TableCell>{r.training_id}</TableCell>
                        <TableCell align="right">{Number(r.distance_covered).toFixed(2)}</TableCell>
                        <TableCell align="right">{Number(r.passing_accuracy).toFixed(0)}</TableCell>
                        <TableCell align="right">{r.sprint_count}</TableCell>
                        <TableCell align="right">{r.shots_on_target}</TableCell>
                        <TableCell>{r.duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <Card>
            <CardHeader title={activePlayer ? `Distance (30d) · ${activePlayer.PLAYER_NAME}` : 'Distance Covered (30d)'} sx={{ '& .MuiCardHeader-title': { color: '#fff' } }} />
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={(filteredPerf.length ? filteredPerf : performanceData)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,188,212,0.2)" />
                  <XAxis dataKey="day" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', color: '#fff' }} />
                  <Legend />
                  <Line type="monotone" dataKey="distance_covered" name="km" stroke="#00bcd4" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Snackbar */}
        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
