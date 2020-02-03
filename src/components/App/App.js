import React from 'react';
import Header from '../Header';
import SongList from '../SongList';
import MusicPane from '../MusicPane';
import './App.scss';

function App() {
    return (
        <div className='grid'>
            <Header />
            <MusicPane />
            <SongList />
        </div>
    )
}

export default App;