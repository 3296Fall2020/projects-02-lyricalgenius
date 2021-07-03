const { default: Axios } = require("axios");
const genius = require('genius-lyrics-api');
//var $ = require("jquery");


module.exports = function (songData) {
    var lyrics = songData.split("\n\n"); //splits into an array with each new line being a new element

     let filteredLyrics = lyrics.filter((c, index) => {
         return lyrics.indexOf(c) === index;
     });
     for(var i = 0; i < lyrics.length; i++)
     {
        lyrics[i] = lyrics[i].replace(/(\r\n|\n|\r|`)/gm, " ");
     }
     for(var j = 0; j < filteredLyrics.length; j++)
     {
        filteredLyrics[j] = filteredLyrics[j].replace(/(\r\n|\n|\r|`)/gm, " ");
        if(filteredLyrics[j].charAt(filteredLyrics[j].length - 1) == "]")
        {
            console.log(filteredLyrics[j]);
            filteredLyrics.splice(j,1);
        }
     }

    //console.log(lyrics); //UNCOMMENT TO VIEW LYRICS IN CONSOLE
    return {
        uniqueLyrics: filteredLyrics,
        originalyrics: lyrics
    }

}