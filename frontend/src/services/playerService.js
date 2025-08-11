export function fetchPlayers() {
  return fetch('http://127.0.0.1:5000/players')
    .then(response => response.json());
}