import React, { Component } from 'react';
import LoginRegisterPage from './loginregister.js';
import '../../login.css';
import logo from '../../images/Logo-Orange.png';
import { getFromStorage} from '../functions/store.js';
import axios from 'axios';


class Signin extends Component {

    componentDidMount(){
        const token = getFromStorage("lgut");
        if(token){
            axios.post("http://localhost:3001/logout", {token: token}).then(res => {
            }).catch(error => {
                console.log(error)
            });
        }
    }

    render() {
    return (
        <div>
        <header className="App-header">
            <div className="container-fluid" id="back">
                <div style={{"textAlign":"center"}}>
                <img src={logo} alt="" width="20%" height="20%" style={{"background":"transparent","position":"relative"}}></img>
                </div>
            <LoginRegisterPage />
            
            </div>
        </header>
        </div>
    );
    }
}

export default Signin;