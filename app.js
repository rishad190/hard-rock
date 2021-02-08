document.getElementById("musicNameCapture").addEventListener("click",function(){
    const inputValue = document.getElementById("musicNameInput");
    fetch("https://api.lyrics.ovh/suggest/"+inputValue.value)
    .then(res => res.json())
    .then(data => musicDataCall(data.data))
})

const musicDataCall = data =>{

    const musicDiv = document.getElementById("musicList");
    musicDiv.innerHTML = "";
    
    data.forEach(musicName => {
        
        const newDiv = document.createElement('div');
        musicDiv.appendChild(newDiv);

        const allMusicData = `
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
        <h3 class="lyrics-name">${musicName.title}</h3>
        <p class="author lead">Album by <span>${musicName.artist.name}t</span></p>
        <audio
        controls
        src=${musicName.preview}>
        </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyrics('${musicName.artist.name}','${musicName.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        
        </div>
        `
        newDiv.innerHTML = allMusicData;
    });
    
}

const getLyrics = (artist,tittle) =>{
    fetch(" https://api.lyrics.ovh/v1/"+artist+"/"+tittle)
    .then(res => res.json())
    .then(data =>songLyrics(data))
    


}

const songLyrics = data =>{
    console.log(data);
    const lyricsDiv = document.getElementById("lyrics");
    lyricsDiv.innerHTML = data.lyrics;


} 