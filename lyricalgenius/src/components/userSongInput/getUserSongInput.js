import React, {Component} from 'react';
import axios from 'axios';

class GetUserInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            SongName: null,
            artistName: null
        }
    }

    handleSubmit = (event) => {
        //this will prevent data from refreshing
        event.preventDefault();
        //axios post will send the data to the backend in JSON format
        axios.post("http://localhost:3001/getLyrics", this.state).then(res => {
            //need to show response to user
            //console.log(res);
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            //you can specify multiple inputs here
            //they just need to have different names 
            //brackets are used to dynamically update
            //object key name
           [event.target.name] : event.target.value
        });
    }

    render () {
        //below is the same as saying SongName = this.state.SongName
        //and artistName = this.state.artistName
        const {SongName, artistName} = this.state
        return (
            <div>
                <h1>Input Form</h1>
                <p>The song name is: {SongName}</p>
                <p>The artist name is: {artistName}</p>
                <form onSubmit={this.handleSubmit}>
                    <p><input type='text' placeholder='Enter a Song Name' name='SongName' onChange={this.handleInputChange}/></p>
                    <p><input type='text' placeholder='Enter the Artist name' name='artistName' onChange={this.handleInputChange}/></p>
                    <p><button>Submit</button></p>
                </form>
            </div>
        )
    }
}
export default GetUserInput;
