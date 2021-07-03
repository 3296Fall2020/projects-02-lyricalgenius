import React, { Component } from 'react';
import './home.css';
import axios from 'axios';
import { getFromStorage} from '../functions/store.js';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            isLoading: true
        }
    }

    componentDidMount(){
        const token = getFromStorage("lgut")
        if(!token){ //lyricalgenius user token
            window.location.href = './';
        }
        else{
            axios.post("http://localhost:3001/getName", token).then(res => {
                console.log(res);
                if (res.data != "") {
                    this.setState({
                        name: res.data,
                        isLoading: false
                    })
                }
                else{
                    this.setState({
                        isLoading: false
                    })
                }
            });
        }
    }


    render() {
        if(!this.state.isLoading){
        return (
            <div>
                <div className="container-fluid" id="homeheader">
                    <div class="hero-image">
                        <div class="hero-text">
                            <h1 class="display-4">Welcome {this.state.name}!</h1>
                            <p>Check out what's trending</p>
                            <button class="btn btn-outline-success my-2 my-sm-0" id="trendingbutton" onClick={function(){window.location.href= './chart'}}>What's Popular</button>
                        </div>
                    </div>
                </div>

                <div class="row text-center homerow">
                    <div class="col-xl-4 col-sm-4 mb-5">
                        <div class="home py-5 px-4">
                            <h5 class="mb-0 display-4 homelargetext">Simple</h5>
                            <span class="text-muted display-8 homesmalltext">
                                Send lyrics from any of your favorite songs to any device in the world in just a few clicks. Find the song you 
                                want, select the specific lyrics you would like to send, then enter the email or phone number of who you would
                                like to send it to, and you're done!
                            </span>
                            <ul class="social mb-0 list-inline mt-3">
                            </ul>
                        </div>
                    </div>

                    <div class="col-xl-4 col-sm-4 mb-5">
                        <div class="home py-5 px-4">
                            <h5 class="mb-0 display-4 homelargetext">Powerful</h5>
                            <span class="text-muted display-8 homesmalltext">
                                LyricalGenius utilizes the GeniusAPI, the engine behind one of the most powerful lyrical databases in the world. 
                                This ensures that you will have the freshest, most recent lyrics to just about any song, right at the tips of your
                                fingers. 
                            </span>
                            <ul class="social mb-0 list-inline mt-3">
                            </ul>
                        </div>
                    </div>

                    <div class="col-xl-4 col-sm-4 mb-5">
                        <div class="home  py-5 px-4">
                            <h5 class="mb-0 display-4 homelargetext">Effective</h5>
                            <span class="text-muted display-8 homesmalltext">
                                LyricalGenius can send your lyrics to just about any device in the world. Whether the person you sent the lyrics too 
                                is still sticking with e-mails, or it's your techy friend, LyricalGenius will have a way to reach them. We wanted to create
                                an application for everyone, so nobody is limited by their tech prowess.
                            </span>
                            <ul class="social mb-0 list-inline mt-3">
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
        }
        else{
            return null;
        }
    }
}
export default Home;