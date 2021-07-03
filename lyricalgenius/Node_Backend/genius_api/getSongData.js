const { default: Axios } = require("axios");
const genius = require('genius-lyrics-api');

global.apiKey = "GaXTYV3DtHSYpUqMrNjOO7sgHm-dFUmYRLWY2Pg4UPhD4gvYLkXS28EoAV0SUeje";

let song = async function (songData) {

    options = {
        apiKey: global.apiKey,
        title: songData.title,
        artist: songData.name,
        optimizeQuery: true
    };

    function checkSongTitle(songData){

        let theSongTitle = songData.title.toLowerCase();
        let optionsTitle = options.title.toLowerCase();
        let theArtist = songData.name.toLowerCase();
        let optionsArtist = options.artist.toLowerCase();
        if(theSongTitle == optionsTitle && theArtist == optionsArtist){
            return songData;  
        }else if(theSongTitle == "" && theArtist.includes(optionsArtist)){
            return songData;
        }else if(theSongTitle.includes(optionsTitle) && theArtist == optionsArtist){
            return songData;
        }else if(theSongTitle == optionsTitle && theArtist.includes(optionsArtist)){
            return songData;
        }else if(optionsTitle === "" && theArtist.includes(optionsArtist)){
            return songData;
        }
    }
    
    var searchResult = await genius.searchSong(options);
    //console.log(searchResult)
    if(searchResult == null || searchResult.length < 0){
        return null;
    }else if(searchResult.length==1){
        return searchResult;
    }
    var result = searchResult.map(checkSongTitle) 
        result = result.filter(function(element){
            return element !== undefined;
        });
    return result;
}

let lyrics = async function (userSongChoice) {

    options = {
        apiKey: global.apiKey,
        title: userSongChoice.title,
        artist: userSongChoice.name,
        optimizeQuery: true
    };
    let song = await genius.getSong(options).catch(error => {
        console.log(error.response)
    });
    return song;
}
module.exports = {song, lyrics};