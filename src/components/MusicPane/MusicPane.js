import React from 'react';
import { connect } from 'react-redux';
import Audio from '../Audio';
import './MusicPane.scss';

class MusicPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songInfo: {}
        };
        this.canvas = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.songInfo !== prevState.songInfo) {
            return {
                songInfo: nextProps.songInfo
            };
        }
        else return null;
    }

    render() {
        console.log(this.state.songInfo);
        const songTitle = this.state.songInfo
            ? this.state.songInfo.title
            : null;
        const songAuthor = this.state.songInfo
            ? this.state.songInfo.artist.name
            : null;
        const albumCover = this.state.songInfo
            ? this.state.songInfo.album.cover_medium
            : null;
        return (
            <div className='music-pane'>
                <div className="music-pane__visualization">
                    <div className='album-image'>
                        {albumCover
                            ? <img src={albumCover} alt="album cover"/>
                            : null}
                    </div>
                    <div className='song-playback'>
                        <div className="play-time">
                            <span>1:25</span>
                            <span>4:24</span>    
                        </div>
                        <canvas
                            ref={this.canvas}
                            className="song-visualization">
                        </canvas>
                    </div>    
                </div>
                
                <div className="music-pane__divider"></div>

                <div className="music-pane__instruments">
                    <Audio canvas={this.canvas} />
                    <div className='song-details'>
                        <div className="song-round-img">
                            {albumCover
                                ? <img src={albumCover} alt="album cover"/>
                                : null}
                        </div>
                        <div className='song-details__container'>
                            <p className='song-title'>{songTitle}</p>
                            <p className='song-author'>{songAuthor}</p>
                        </div>
                    </div>
                    <div className="volume-level">
                        <img
                            src={require('../../assets/volume-up.svg')}
                            alt="volume-icon"
                        />
                        <div className="volume-bar"></div>
                    </div>
                </div>
                
            </div>
        )    
    }
    
}

const mapStateToProps = (state) => ({
    songInfo: state.songInfo
})

export default connect(mapStateToProps)(MusicPane);