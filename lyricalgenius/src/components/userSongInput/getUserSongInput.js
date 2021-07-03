import React, { Component } from 'react';
import axios from 'axios';
import ListView from './songListComponent';
import LyricsModal from './modal'
import { getFromStorage, setInStorage } from '../functions/store.js';
import './getUserSongInput.css';
import { toast } from 'react-toastify';

class GetUserInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            launchModal: false,
            songObjIndex: -1,
            uniqueLyricData: [],
            allLyricData: []
        }
        this.initialState = this.state;
    }

    componentDidMount() {
        const token = getFromStorage("lgut")
        if (!token) { //lyricalgenius user token
            window.location.href = './';
        } else {
            axios.post("http://localhost:3001/verify", token).then(res => {
                if (res.data == "Invalid") {
                    window.location.href = './';
                }
            }).catch(error => {
                console.log(error)
            });
        }
    }


    handleListItemOnClick = async (songObj) => {
        this.setState({ songObjIndex: this.props.songData.indexOf(songObj) });
        await axios.post("http://localhost:3001/getLyrics", songObj).then(res => {
            res = res.data;

            this.setState({ uniqueLyricData: [], allLyricData: [] });
            this.setState({ uniqueLyricData: res.uniqueLyrics, allLyricData: res.originalyrics, launchModal: true });
            if (this.state.uniqueLyricData.length < 1) {
                this.notifyForMissingLyrics()
            } else {
                this.pauseOtherAudioPreviews(this);
            }
        })
            .catch(error => {
                console.log(error)
            });
    }

    notifyForMissingLyrics = async () => {
        await toast.warning('Lyrics for this song could not be found...' + '\n' + 'please try again', { position: toast.POSITION.TOP_CENTER, autoClose: 2500 })
        this.setState({ launchModal: false });
        setTimeout(() => window.location.reload(false), 2500);

    }


    handleCallBack = () => {
        setTimeout(
            () => this.setState({ launchModal: false }), 1000);
    }

    pauseOtherAudioPreviews = (event) => {
        for (const audio of document.querySelectorAll('audio')) {
            if (audio !== event.currentTarget) {
                audio.pause();
            }
        }
    }

    render() {
        const { launchModal, songObjIndex, uniqueLyricData, allLyricData } = this.state

        return (
            <div>
                <div class="row background">
                    <div class="col-1"></div>
                    <div class="col-10" align="center" style={{ "float": "left" }}>
                        {this.props.songData.map((songObj, index) => ( //Takes every index in array and place it into a list item
                            <li key={index}>
                                <div class="card text-center" onClick={this.handleListItemOnClick.bind(this, songObj)}>
                                    <ListView songObj={songObj} preview={this.props.preview} index={index} />
                                </div>
                            </li>
                        ))}
                    </div>
                    <div class="col-1"></div>

                    {launchModal === true &&
                        <LyricsModal handleCallBack={this.handleCallBack} preview={this.props.preview} songObj={this.props.songData} songObjIndex={songObjIndex} uniqueLyricData={uniqueLyricData} allLyricData={allLyricData} />
                    }
                </div>
            </div>

        )
    }
}
export default GetUserInput;
