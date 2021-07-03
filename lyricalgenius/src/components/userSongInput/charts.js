import React, { Component } from 'react';
import axios from 'axios';
import './getUserSongInput.css';
import { getFromStorage} from '../functions/store.js';


class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topartists: [],
            topsongs: []
        }
    }

    componentDidMount(){
        const token = getFromStorage("lgut")
        if(!token){ //lyricalgenius user token
            window.location.href = './';
        }else{
            axios.post("http://localhost:3001/verify", token).then(res => {
                if (res.data == "Invalid") {
                    window.location.href = './';
                }
                else{ // Load data
                    axios.post("http://localhost:3001/getCharts", this.state)
                    .then(res => {
                        let entries = res.data;
                        let topCounts = [];
                        let topSongs = [];
                        let topSongsTally = [];
                        let topArtists = [];
                        let topArtistsTally = [];
                        entries.forEach(element => {
                            topCounts.push(element.count);
                        });
                        let topCounts2 = [...topCounts];
                        let m = 0;
                        while(topSongs.length < 25){
                            m = Math.max.apply(Math, topCounts);
                            if(m != 0){
                                let index = topCounts.indexOf(m);
                                if(entries[index].title !== ''  && !topSongs.includes(entries[index].title)){
                                    topSongs.push(entries[index].title);
                                    topSongsTally.push(topCounts[index]);
                                }
            
                                topCounts[index] = 0;
                            }
                            else{
                                break;
                            }
                        }
            
                        while(topArtists.length < 25){
                            m = Math.max.apply(Math, topCounts2)
                            if(m != 0){
                                let index = topCounts2.indexOf(m);
                                if(entries[index].name !== '' && !topArtists.includes(entries[index].name)){
                                    topArtists.push(entries[index].name);
                                    topArtistsTally.push(topCounts2[index]);
                                }
                                topCounts2[index] = 0;
                            }
                            else{
                                break;
                            }
                        }
            
                        let topSongObjects = [];
                        let topArtistObjects = [];
            
                        for(let i = 0; i < topSongs.length; i++){
                            topSongObjects.push({song: topSongs[i], count: topSongsTally[i]});
                        }
                        for(let i = 0; i < topArtists.length; i++){
                            topArtistObjects.push({artist: topArtists[i], count: topArtistsTally[i]});
                        }
                        console.log(topSongObjects);
                        console.log(topArtistObjects);
                        this.setState({topartists: topArtistObjects});
                        this.setState({topsongs: topSongObjects});
            
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }).catch(error => {
                console.log(error)
            });
        }
    }   

    render() {
        return (
            <div className="background">
                <h1 className="display-4" align="center" style={{"color":"white","paddingTop":"20px"}}>Lyrical Genius Trending</h1>
                <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <div className="card" style={{"width":"100%"}}>
                            <div className="card-header" align="center" style={{"background":"#dd6c4d","color":"white"}}>
                            Trending Song Searches
                            </div>
                            <div className="card-body">
                                <table className="table">
                                <thead style={{"background":"#3D5A80","color":"white"}}>
                                    <td></td>
                                    <td align="center">Song</td>
                                    <td align="right">Searches</td>
                                </thead>
                                {this.state.topsongs.map((song,index) => {
                                    return (
                                        <tr key={index}>
                                            <td></td>
                                            <td align="center">{song.song}</td>
                                            <td align="right">{song.count}</td>
                                        </tr>
                                    )
                                })}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card" style={{"width":"100%"}}>
                            <div className="card-header" align="center" style={{"background":"#dd6c4d","color":"white"}}>
                            Trending Artist Searches
                            </div>
                            <div className="card-body">
                                <table className="table">
                                <thead style={{"background":"#3D5A80","color":"white"}}>
                                    <td></td>
                                    <td align="center">Artist</td>
                                    <td align="right">Searches</td>
                                </thead>
                                {this.state.topartists.map((artist,index) => {
                                    return (
                                        <tr key={index}>
                                            <td></td>
                                            <td align="center">{artist.artist}</td>
                                            <td align="right">{artist.count}</td>
                                        </tr>
                                    )
                                })}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>    
                </div>     
            </div>
        )
    }
}
export default Charts;
