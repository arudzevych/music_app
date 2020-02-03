import React from 'react';
import './Search.scss';
import { fetchData } from '../../store/actions';
import {connect} from 'react-redux';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ''
        }
    }

    componentDidMount() {
        this.props.findMusic('eminem');
    }

    handleChange = ({target: {value}}) => {
        this.setState({searchQuery: value}, console.log(this.state.searchQuery));
    }

    //find songs
    handleSearch = (e) => {
        if (e.target.tagName === 'IMG' || (e.target.tagName === 'INPUT' && e.key === 'Enter')) {
            this.props.findMusic(this.state.searchQuery);
        }
    }

    render() {
        return (
            <div className='search'>
                <input
                    placeholder='Search'
                    onChange={this.handleChange}
                    onKeyPress={this.handleSearch}
                    value={this.state.searchQuery}

                />
                    <img
                        src={require('../../assets/search-icon.svg')}
                        alt='search-icon'
                        onClick={this.handleSearch}
                    /> 
            </div>
        )    
    }
}

const mapDispatchToProps = dispatch => ({
    findMusic: (query) => dispatch(fetchData(query))
})

export default connect(null, mapDispatchToProps)(Search);

