import React, {Component} from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

// Phone/Email input component in modal
class SendLyrics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneEmailAddress: ""
        }
    }

    // Update input
    handleInput(event) {
        const v = event.target.value;
        this.setState({
            phoneEmailAddress: v
        });
    }

    // Create POST request
    sendLyrics = (event) => {

        event.preventDefault();

        axios.post('http://localhost:3001/sendEmail', {
            address: this.state.phoneEmailAddress,
            data: this.props.LyricsArray,
        }).then(resp => {
            console.log(resp);
            toast.warning(resp.data.msg, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        }).catch(err => {
            console.log(err);
            toast.warning("Error sending lyrics!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        });
    }

    render() {
        return (
            <form onSubmit={this.sendLyrics}>
                <input type='text' name="phoneEmailAddress" placeholder="Enter email or phone" onChange={(event) => this.handleInput(event)}/>
                <button type="submit" onClick={this.sendLyrics}>Send</button>
            </form>
        )
    }
}
export default SendLyrics;
