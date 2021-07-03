import React, {Component} from 'react';
import axios from 'axios';

function getFavorites (token){
    axios.post("http://localhost:3001/getFavorites", token).then((response) => {
    },(error) => {
        console.log(error.response)
    });
}

export default getFavorites;