import React, { Component } from 'react';
import axios from 'axios';
import './getUserSongInput.css';
import { getFromStorage, setInStorage} from '../functions/store.js';


class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: []
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
                else{ // load data
                    const token = getFromStorage("lgut");
                    axios.post("http://localhost:3001/getFavorites", token)
                    .then(res => {
                        this.setState({favorites: res.data});
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
                <h1 className="display-4" align="center" style={{"color":"white","paddingTop":"20px"}}>Favorites</h1>
                <div className="container-fluid" align="center">
                <div id="favoriteCard" className="card" style={{"width": "50%","minWidth":"400px"}}>
                    <div className="card-header" align="center" style={{"font-family":"cursive","background":"#dd6c4d","color":"white"}}></div>
                    <div className="card-body">
                        <table className="table" align="center">
                        {/* <thead align="center">
                            <td>Song</td>
                            <td>Artist</td>
                        </thead> */}
                        <tbody align="center">
                        {this.state.favorites.map((fav,index) => {
                            return (
                                <tr key={index}>
                                    <td align="left" width="20%"><img className="img-fluid" src={fav.albumArt} style={{"height":"18%","width":"100%","minWidth":"140px","minHeight":"200px"}}></img></td>
                                    <td style={{"fontSize": "18px","vertical-align":"middle","text-align":"left"}}>{fav.title}</td>
                                    <td style={{"fontSize": "18px","vertical-align":"middle"}}>{fav.name}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Charts;
