async function fetchSessions() {
  const res = await fetch('/api/sessions');
  const data = await res.json();
  populateFilteredTable(data);
}

async function addOrUpdateSession(session) {
  const method = session.id ? 'PUT' : 'POST';
  const url = session.id ? `/api/sessions/${session.id}` : '/api/sessions';

  await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(session)
  });

  fetchSessions();
}

async function deleteSession(id) {
  if (confirm('Are you sure you want to delete this session?')) {
    await fetch(`/api/sessions/${id}`, { method: 'DELETE' });
    fetchSessions();
  }
}

function populateFilteredTable(data) {
  const tbody = document.getElementById('records-body');
  tbody.innerHTML = '';
  data.forEach(session => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${session.player_id}</td>
      <td>${session.type}</td>
      <td>${session.duration}</td>
      <td>${session.load}</td>
      <td>${session.session_date.split('T')[0]}</td>
      <td>${session.remarks || ''}</td>
      <td>
        <button onclick="editSession(${session.id})">Edit</button>
        <button onclick="deleteSession(${session.id})">Delete</button>
        <button onclick="viewMetrics('${session.player_id}')">Metrics</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

document.getElementById('training-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const id = document.getElementById('session-id').value;
  const session = {
    id: id ? parseInt(id) : Date.now(),
    player_id: document.getElementById('player-id').value,
    type: document.getElementById('session-type').value,
    duration: parseInt(document.getElementById('duration').value),
    load: parseInt(document.getElementById('load').value),
    session_date: document.getElementById('session-date').value,
    remarks: document.getElementById('remarks').value
  };

  await addOrUpdateSession(session);

  document.getElementById('training-form').reset();
  document.getElementById('session-id').value = '';
  document.getElementById('submit-btn').innerText = 'Add Session';
  document.getElementById('form-title').innerText = 'Add New Training Session';
});

function editSession(id) {
  fetch('/api/sessions')
    .then(res => res.json())
    .then(data => {
      const session = data.find(s => s.id === id);
      if (!session) return;

      document.getElementById('session-id').value = session.id;
      document.getElementById('player-id').value = session.player_id;
      document.getElementById('session-type').value = session.type;
      document.getElementById('duration').value = session.duration;
      document.getElementById('load').value = session.load;
      document.getElementById('session-date').value = session.session_date.split('T')[0];
      document.getElementById('remarks').value = session.remarks || '';

      document.getElementById('form-title').innerText = 'Edit Training Session';
      document.getElementById('submit-btn').innerText = 'Update Session';
    });
}

window.onload = fetchSessions;
