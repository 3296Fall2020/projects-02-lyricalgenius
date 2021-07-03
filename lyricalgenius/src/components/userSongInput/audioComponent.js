import React, { Component } from 'react';

class Audio extends Component {

    pauseOtherAudioPreviews = (event) => {
        for (const audio of document.querySelectorAll('audio')) {
            if (audio !== event.currentTarget) {
                audio.pause();
            }
        }
    }
    
    render() {
        return (
            <div>
                {this.props.preview !== "" &&
                    <audio src={this.props.preview} controls="controls"
                        onPlay={this.pauseOtherAudioPreviews} type='audio/mpeg'></audio>
                }
            </div>
        )
    }
}

export default Audio;