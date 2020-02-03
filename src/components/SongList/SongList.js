import React from 'react';
import Song from '../Song';
import './SongList.scss';
import { connect } from 'react-redux';
import { setCurrentSong } from '../../store/actions';

class SongList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errorInfo: '',
            searchData: {},
            currentSong: null,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.searchData !== prevState.searchData) {
            return {searchData: nextProps.searchData,
                errorInfo: nextProps.errorInfo,
                loading: nextProps.loading,
                currentSong: null
            };
        }
        if (nextProps.currentSong !== prevState.currentSong) {
            return {currentSong: nextProps.currentSong}
        }
        else return null;
    }

    setNewCurrentSong = (index) => {
        this.props.setCurrentSong(index);
        this.setState({currentSong: index});
    }

    render() {
        const renderSongList = () => {
            return this.state.searchData.map( ( song, index) => {
                const isPlaying = this.state.currentSong === index ? true : false;
                return (<Song 
                    key={song.id}
                    songNumber={index + 1}
                    songTitle={song.title}
                    songDuration={song.duration}
                    onClick={this.setNewCurrentSong}
                    isPlaying={isPlaying}
                />)
            })
        }
        return (
            <div className='songs-pane'>
            {this.state.loading
                ? <img
                    src={require('../../assets/loading.gif')}
                    className='songs-pane_loading'
                    alt="loading"
                />
                : null
            }
                {this.state.searchData && this.state.searchData.length
                    ? renderSongList()
                    : null}
            </div>
        )    
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentSong: (index) => dispatch(setCurrentSong(index))
})

const mapStateToProps = (state) => ({
    searchData: state.searchData,
    loading: state.loading,
    errorInfo: state.errorInfo,
    currentSong: state.currentSong
})

export default connect(mapStateToProps, mapDispatchToProps)(SongList);