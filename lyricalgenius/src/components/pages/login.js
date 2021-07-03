
// Imports
import React, {Component} from 'react';
import Account from './user.js';
import axios from 'axios';
import '../../login.css';
import { getFromStorage, setInStorage} from '../functions/store.js';


// Login Component
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            errors: {username: "",password: ""},
            userValid: false,
            passValid: false,
            submitRes: ""
        }
    }

    // Handles form submit
    handleSubmit = (event) => {
        // This will prevent data from refreshing
        event.preventDefault();

        // Clears the submit message
        this.setState({
            submitRes: ""
        })

        // Only allow submit if the form is filled correctly
        if(this.state.userValid && this.state.passValid){
            axios.post("http://localhost:3001/login", this.state).then((response) => {
                if(response.data != "Incorrect Password"){
                    // Set the current user
                    setInStorage("lgut",{token: response.data});
                    window.location.href = window.location.href + "home";
                }
                else{
                    this.setState({
                        submitRes: "Invalid Username or Password"
                    })
                }
            },(error) => {
                console.log(error.response)
            });
        }
    }

    // As user enters data check it
    handleInput(event) {
        const n = event.target.name; // Get the name of the dom element that triggered the event
        const v = event.target.value; // Get the value of that object
        this.setState({  // Set its value to the state
            [n]: v
        },
            () => {this.validate(n,v)} // Validates the input
        );
    }

    // Function to validate user input
    validate(name, value){
        let errors = this.state.errors;
        let userValid = this.state.userValid;
        let passValid = this.state.passValid;

        if(name == "username"){ // It is the username field
            userValid = value.length > 0;
            errors.username = userValid ? "" : "Username can not be empty";
        }
        else{ // It is the password field
            passValid = value.length > 0;
            errors.password = passValid ? "" : "Password can not be empty";
        }

        this.setState({ // Updates the errors
                errors: errors,
                userValid: userValid,
                passValid: passValid
        });
    }

    render () {
        const {errors,submitRes} = this.state
        return (
            <div id="login" className="container-fluid" align="center" style={{'paddingTop': '20px','color': 'white'}}>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='Username'>Username</label>
                    <br/>
                    <input className="form-field" type='text' name='username' onChange={(event) => this.handleInput(event)}/>
                    <br/>
                    <span className="error-message">{errors.username}</span>
                    <br/>
                    <label htmlFor='Password'>Password</label>
                    <br/>
                    <input className="form-field" type='password' name='password' onChange={(event) => this.handleInput(event)}/>
                    <br/>
                    <span className="error-message">{errors.password}</span>
                    <br/>
                    <span style={{"color": "red"}}>{submitRes}</span>
                    <p><button id='submit-button'>Login</button></p>
                </form>
            </div>
        )
    }
}

export default Login;
