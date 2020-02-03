import axios from 'axios';

export default axios.create({
    baseURL: 'https://deezerdevs-deezer.p.rapidapi.com',
    timeout: 10000,
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "e9510966dbmsh456b94fb1f41073p1cf3abjsn3d3c00f83a97"
    }
});