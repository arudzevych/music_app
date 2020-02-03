import React from 'react';
import PropTypes from 'prop-types';
import './Song.scss';

const { func, string, number, bool } = PropTypes;

class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            isPlaying: ''
        }
    }

    static propTypes = {
        songNumber: number,
        songTitle: string,
        songDuration: number,
        onClick: func,
        isPlaying: bool
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.isPlaying !== prevState.isPlaying) {
            return {
                isPlaying: nextProps.isPlaying
            };
        }
        else return null;
    }

    handleClick = () => {
        this.props.onClick(this.props.songNumber-1);
    }

    render() {
        const { songNumber, songTitle, songDuration } = this.props;
        const isPlaying = this.state.isPlaying;
        const duration = (songDuration/60).toFixed(2).replace('.', ':');
        return (
            <li className='song-li'
                onClick={this.handleClick}
            >
                {
                    isPlaying
                    ? <span className='song-number playing'>
                        <img
                            src={require('../../assets/bar_chart.svg')}
                            alt="bars"/>
                    </span>
                    : <span className='song-number'>{ songNumber }</span>
                }
                <span
                    className={isPlaying
                        ? 'song-title playing'
                        : 'song-title'}>
                    { songTitle }
                </span>
                <span
                    className={isPlaying
                        ? 'song-duration play-duration playing'
                        : 'song-duration'}>
                    { duration }
                </span>
            </li>
        )    
    }
}

export default Song;