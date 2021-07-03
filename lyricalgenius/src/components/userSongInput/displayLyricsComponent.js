import React, { Component } from 'react';
import $ from 'jquery';
import LikeButton from './likeButton.js';
import ModalForUserInput from './modalForRecipient'
import { toast } from 'react-toastify';
import './modal.css'

class DisplayLyrics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            clearColors: [],
            isSectionsArrayEmpty: true
        }
    }

    notifyForNonClickedSelection = async () => {
        await toast.warning('Please select an option below...', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
      }

    sendSections = async () => {
        // //will send to Vlad from here
        if (this.state.sections.length !== 0) {
            await this.setState({ isSectionsArrayEmpty: false })
        }else{
            this.notifyForNonClickedSelection();
        }
        console.log(this.state.sections);
    }

    sendAll = async (allSections) => {
        await this.setState({ isSectionsArrayEmpty: false })
        //will send to Vlad from here
        console.log(allSections);
    }

    addToSectionsArray = async (songObj, index) => {
        await this.setState({ clearColors: [...this.state.clearColors, index] })
        await this.setState({ sections: [...this.state.sections, songObj] });

        console.log("Add to sections before " + this.state.sections)
    }


    removeFromSectionsArray = async (songObj, index) => {
        var array = [...this.state.clearColors]; // make a separate copy of the array
        if (index !== -1) {
            var getIndex = array.indexOf(index)
            array.splice(getIndex, 1);
            await this.setState({ clearColors: array });
        }

        var array = [...this.state.sections]; // make a separate copy of the array
        var index = array.indexOf(songObj)
        if (index !== -1) {
            array.splice(index, 1);
            console.log("this is what we are removing " + this.state.sections[index])
            await this.setState({ sections: array });
        }

        console.log("sections after " + this.state.sections)
    }

    clearAllClickedSections = (index) => {
        if ($("li.ListItemLyrics").eq(index).css("background-color") === "rgb(152, 193, 217)") {
            $("li.ListItemLyrics").eq(index).css("background-color", "#fff");
        }
    }

    setSectionsColor = (songObj, index) => {
        if ($("li.ListItemLyrics").eq(index).hasClass("changeColor")) {
            $("li.ListItemLyrics").eq(index).removeClass("changeColor");
            this.removeFromSectionsArray(songObj, index);
        } else {
            this.addToSectionsArray(songObj, index);
            $("li.ListItemLyrics").eq(index).addClass("changeColor");
        }   
    }

    resetState = async () => {
        await this.setState({ sections: [], clearColors: [] })
        console.log("this is sections " + this.state.sections)
    }

    handleResetModal = async () => {
        this.setState({ isSectionsArrayEmpty: true });
    }

    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-12">
                        {this.state.isSectionsArrayEmpty === false && <ModalForUserInput LyricsArray={this.state.sections} handleResetModal={this.handleResetModal.bind(this)} />}
                        <button onClick={this.sendSections.bind(this)}>Done</button>
                        <button onClick={this.sendAll.bind(this, this.props.allLyricData)}>Send All</button>
                        <button onClick={() => {
                            <li class="ListItemLyrics">
                                {this.state.clearColors.map((index) => {
                                    this.clearAllClickedSections(index);
                                })}
                                {this.resetState()}
                            </li>
                        }}>Clear Selections</button>
                        <LikeButton song={this.props} />
                        <br></br>
                        <br></br>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        {this.props.uniqueLyricData.map((songObj, index) => (
                            <li class="ListItemLyrics" onClick={() => {
                                this.setSectionsColor(songObj, index);
                            }}
                            >
                                {songObj}
                                <br></br>
                                <br></br>
                            </li>
                        ))}
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <br></br>
                        <button onClick={this.sendSections.bind(this)}>Done</button>
                        <button onClick={this.sendAll.bind(this, this.props.allLyricData)}>Send All</button>
                        <button onClick={() => {
                            <li class="ListItemLyrics">
                                {this.state.clearColors.map((index) => {
                                    this.clearAllClickedSections(index);
                                })}
                                {this.resetState()}
                            </li>
                        }}>Clear Selections</button>
                        <br></br>
                        <br></br>
                    </div>
                </div>
            </div>
        )
    }
}
export default DisplayLyrics;
