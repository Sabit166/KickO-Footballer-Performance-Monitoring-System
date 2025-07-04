import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Players = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('/api/players');
                setPlayers(response.data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, []);

    return (
        <div>
            <h1>Players List</h1>
            <ul>
                {players.map(player => (
                    <li key={player.id}>
                        {player.name} - {player.position}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Players;