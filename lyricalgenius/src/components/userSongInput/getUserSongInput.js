import React, { Component } from 'react';
import axios from 'axios';
import './getUserSongInput.css';
import ListView from './songListComponent';
import LyricsModal from './modal'

class GetUserInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            name: "",
            launchModal: false,
            songObjIndex: -1,
            uniqueLyricData: [],
            allLyricData: [],
            songData: [],
            preview: []
        }
        this.initialState = this.state;
    }


    handleSubmit = (event) => {
        if (this.state.title !== "" || this.state.name !== "") {
            event.preventDefault();
            axios.post("http://localhost:3001/getSong", this.state).then(res => {
                res = res.data;
                if (res.length === 0) {
                    this.setState = this.initialState;
                    alert("song/artist could not be found");
                    window.location.reload(false);
                } else {
                    this.setState({ songData: res });
                }
                this.handleSongPreview(this.state.songData)
            }).catch(error => {
                console.log(error)
            });
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleListItemOnClick = async (songObj) => {
        this.setState({ songObjIndex: this.state.songData.indexOf(songObj) });
        await axios.post("http://localhost:3001/getLyrics", songObj).then(res => {
            res = res.data;

            this.setState({ uniqueLyricData: [], allLyricData: [] });
            this.setState({ uniqueLyricData: res.uniqueLyrics, allLyricData: res.originalyrics, launchModal: true });
            console.log("this is modal " + this.state.launchModal)
            if (this.state.uniqueLyricData.length < 1) {
                alert("Lyrics for this song not found");
                window.location.reload(false);
            }
        })
            .catch(error => {
                console.log(error)
            });
    }

    handleSongPreview = (songObj) => {
        if (this.state.preview.length !== 0) {
            this.setState({ preview: [] });
        }

        songObj.map(async (songObj, index) => (
            await axios.post("http://localhost:3001/getPreview", songObj).then(res => {
                let new_state = Object.assign({}, this.state);
                let a = new_state.preview;
                a[index] = res.data;
                this.setState({ preview: a });
            })
                .catch(error => {
                    console.log(error.response)
                })
        ))
    }

    handleCallBack = () => {
        setTimeout(
            () => this.setState({ launchModal: false }), 1000);
    }

    render() {
        const { songData, launchModal, songObjIndex, preview, uniqueLyricData, allLyricData } = this.state


        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <form onSubmit={this.handleSubmit.bind(this)} class="form-inline my-2 my-lg-0">
                            <input class="form-control rounded-pill transparent-input mr-sm-2" placeholder='Enter a Song Name' name='title' onChange={this.handleInputChange.bind(this)} />

                            <input class="form-control rounded-pill transparent-input mr-sm-2"  placeholder='Enter the Artist name' name='name' onChange={this.handleInputChange.bind(this)} />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>


                <div class="row justify-content-center">
                    {songData.map((songObj, index) => ( //Takes every index in array and place it into a list item
                        <li key={index}>
                            <div class="col-sm-4">
                                <div class="card" onClick={this.handleListItemOnClick.bind(this, songObj)}>
                                    <ListView songObj={songObj} preview={preview} index={index} />
                                </div>
                            </div>
                        </li>
                    ))}
                    {launchModal === true &&
                        <LyricsModal handleCallBack={this.handleCallBack} preview={preview} songObj={songData} songObjIndex={songObjIndex} uniqueLyricData={uniqueLyricData} allLyricData={allLyricData} />
                    }
                </div>
            </div>
        )
    }
}
export default GetUserInput;
