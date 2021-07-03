import React, { Component } from 'react';
import LogoWhite from '../../images/Logo-Orange.png'
import axios from 'axios';
import GetUserInput from './getUserSongInput.js';
import Chart from './charts.js';
import Home from '../pages/home.js';
import Favorite from './favoritedSongs.js';
import AboutUs from '../pages/aboutus.js';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { getFromStorage} from '../functions/store.js';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      name: "",
      renderChild: true,
      songData: [],
      preview: [],
      isReady: false
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
            else{
                this.setState({isReady: true});
            }
        }).catch(error => {
            console.log(error)
        });
    }
}

  handleSubmit = (event) => {
    if (this.state.title !== "" || this.state.name !== "") {
      event.preventDefault();
      axios.post("http://localhost:3001/getSong", this.state).then(res => {
        res = res.data;
        this.setState({ renderChild: false });
        if (res.length === 0) {
          this.notifyForSongAndArtist();
        } else {
          this.setState({ songData: res });
        }
        this.handleSongPreview(this.state.songData)
      }).catch(error => {
        console.log(error)
      });
    }
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

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  notifyForSongAndArtist = async () => {
    await toast.warning('Song/Artist could not be found...' + '\n' + 'please try again', { position: toast.POSITION.TOP_CENTER, autoClose: 2500 })
    setTimeout(() => window.location.reload(false), 2500);
  }

  handleChildUnmount = async () => {
    await this.setState({ renderChild: false });
  }

  render() {
    if(this.state.isReady){
      return (
        <div>
          <nav class="navbar navbar-dark navbar-expand-lg ournavbar">
            <a class="navbar-brand" href="/home">
              <img class="logo" src={LogoWhite} />
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item rounded-pill">
                  <a class="nav-link" href="/home">Home<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item rounded-pill">
                  <a class="nav-link" href="/chart">Charts</a>
                </li>
                <li class="nav-item rounded-pill">
                  <a class="nav-link" href="/favorite">My Favorites</a>
                </li>
                <li class="nav-item rounded-pill">
                  <a class="nav-link" href="/aboutus">About Us</a>
                </li>
              </ul>
              <form onSubmit={this.handleSubmit.bind(this)} class="form-inline my-2 my-lg-0 userinput">
                <input class="form-control rounded-pill transparent-input mr-sm-2" placeholder='Enter a Song Name' name='title' onChange={this.handleInputChange.bind(this)} />

                <input class="form-control rounded-pill transparent-input mr-sm-2" placeholder='Enter the Artist name' name='name' onChange={this.handleInputChange.bind(this)} />
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" style={{"marginRight": "10px"}}>Search</button>
              </form>
              <FontAwesomeIcon size= '2x' icon={faSignOutAlt} className="img-fluid" style={{"color": "white","cursor": "pointer"}} onClick={() => {let token = getFromStorage("lgut"); axios.post("http://localhost:3001/logout", {token: token}).then(res => {window.location.href = "./";}).catch(error => {console.log(error)})}} />
            </div>
          </nav>

          <Router>
            <Switch>
              <Route exact path="/home" component={this.state.renderChild ? Home : null} />
              <Route exact path="/aboutus" component={this.state.renderChild ? AboutUs : null} />
              <Route exact path="/chart" component={this.state.renderChild ? Chart : null} />
              <Route exact path="/favorite" component={this.state.renderChild ? Favorite : null} />
              <Route component={Error} />
            </Switch>
          </Router>
          <GetUserInput songData={this.state.songData} preview={this.state.preview} />
        </div>
      );
    }
    else{
      return null;
    }
  }
}
export default Navbar;