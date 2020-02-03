import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSong } from '../../store/actions';
import PropTypes from 'prop-types';
import './Audio.scss';

const { object } = PropTypes;

class Audio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSong: '',
            isPlaying: false,
            songInfo: {}
        }
        this.audioRef = React.createRef();
    }

    static propTypes = {
        canvas: object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.currentSong !== prevState.currentSong) {
            return {
                currentSong: nextProps.currentSong,
                songInfo: nextProps.songInfo
            };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentSong !== prevState.currentSong) {
            if (this.state.currentSong >= 0) {
                let song = this.state.songInfo.preview;
                this.audioRef.current.src = song;
                this.audioRef.current.play();
                this.setState({ isPlaying: true });
                this.visualize(this.audioRef.current.src);
            }
        }
        if (this.state.isPlaying !== prevState.isPlaying) {
            //play the song
            if (this.state.isPlaying) {this.audioRef.current.play()}
            //stop the song
            else {this.audioRef.current.pause()}
        }
    }

    playSong = () => {
        this.setState({isPlaying: true})
    }
    pauseSong = () => {
        this.setState({isPlaying: false})
    }
    playNextSong = () => {
        this.props.setCurrentSong(this.state.currentSong+1);
    }
    playPreviousSong = () => {
        this.props.setCurrentSong(this.state.currentSong-1);    
    }

    visualize = (url) => {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        const drawAudio = url => {
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => draw(normalizeData(filterData(audioBuffer)), 200, 200));
        };

        const filterData = audioBuffer => {
            const rawData = audioBuffer.getChannelData(0);
            const samples = 170;
            const blockSize = Math.floor(rawData.length / samples);
            const filteredData = [];
            for (let i = 0; i < samples; i++) {
                let blockStart = blockSize * i;
                let sum = 0;
                for (let j = 0; j < blockSize; j++) {
                sum = sum + Math.abs(rawData[blockStart + j]);
                }
                filteredData.push(sum / blockSize);
            }
            return filteredData;
        };

        const normalizeData = filteredData => {
            const multiplier = Math.pow(Math.max(...filteredData), -1);
            return filteredData.map(n => n * multiplier);
        }

        const draw = normalizedData => {
            const canvas = this.props.canvas.current;
            canvas.width = canvas.offsetWidth;
            canvas.height = 70;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = '#61868d';
            ctx.translate(0, canvas.offsetHeight);
            
            const width = canvas.offsetWidth / normalizedData.length;
            for (let i = 0; i < normalizedData.length; i++) {
                const x = width * i;
                let height = normalizedData[i] * canvas.offsetHeight;
                ctx.fillRect(x, 0, width, height-canvas.height);
            }
        };

        drawAudio(url);
    }

    render() {
        console.log(this.state.currentSong);
        return (
            <div className='audio-container'>
                <div className='audio-container__instruments'>
                    <button
                        onClick={this.playPreviousSong}
                    >
                        <img src={require('../../assets/previous-track.svg')}
                        alt="Previous" />
                    </button>
                    {this.state.isPlaying
                    ? <button onClick={this.pauseSong}>
                        <img src={require('../../assets/pause.svg')} alt="Pause"/>    
                    </button> 
                    : <button onClick={this.playSong}>
                        <img src={require('../../assets/play-btn.svg')} alt="Play"/>
                    </button>
                    }
                    <button onClick={this.playNextSong}>
                        <img src={require('../../assets/fast-forward.svg')} alt="Next"/>
                    </button>
                </div>
                <audio
                    ref={this.audioRef}
                >Your browser do not support audio
                </audio>    
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentSong: (index) => dispatch(setCurrentSong(index))
})

const mapStateToProps = (state) => ({
    currentSong: state.currentSong,
    songInfo: state.songInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(Audio);