import axios from "../axios.config";

const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

export function fetchData(query) {
    return function(dispatch) {
        dispatch({type: FETCH_DATA_REQUEST});
        axios.get('/search?q=' + query)
            .then(res => dispatch({type: FETCH_DATA_SUCCESS, data: res.data.data}))
            .catch(err => dispatch({type: FETCH_DATA_FAILURE, error: err}))
    }
}


export function setCurrentSong(index) {
    return {type: SET_CURRENT_SONG, currentSong: index}
}
