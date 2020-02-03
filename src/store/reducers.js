const initialState = {
    searchData: {},
    loading: false,
    error: false,
    errorInfo: ''
}

function reducer(state=initialState, action) {
    switch(action.type) {
        case 'FETCH_DATA_REQUEST':
            return Object.assign({}, state, {loading: true});
        case 'FETCH_DATA_SUCCESS':
            return Object.assign({}, state, {
                loading: false,
                searchData: action.data
            });
        case 'FETCH_DATA_FAILURE':
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorInfo: action.error
            });
        case 'SET_CURRENT_SONG':
            if (action.currentSong < 0) {
                let lastSong = state.searchData.length-1
                let songInfo = state.searchData[lastSong];
                return Object.assign({}, state, {
                    currentSong: lastSong,
                    songInfo: songInfo
                });
            }
            else if (action.currentSong >= state.searchData.length) {
                let songInfo = state.searchData[0];
                return Object.assign({}, state, {
                    currentSong: 0,
                    songInfo: songInfo
                });
            }
            else {
                let songInfo = state.searchData[action.currentSong];
                return Object.assign({}, state, {
                    currentSong: action.currentSong,
                    songInfo: songInfo
                });
            }
            
        default: return state;
    }
}

export default reducer;