//https://api.deezer.com/search?q=artist:"aloe blacc" track:"i need a dollar"
const axios = require('axios');

module.exports = async function deezer(songData){
    var searchURL = "https://api.deezer.com/search?q=artist:"+ "\"" + songData.name + "\"" + " track:" + "\""+songData.title + "\"";
    //console.log(searchURL);
    let song= await axios.get(searchURL);
    return song.data.data[0].preview;
}