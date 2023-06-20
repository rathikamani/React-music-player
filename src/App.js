import "./App.css";
import { useCallback, useEffect, useState } from "react";

function App() {
  const songs = ["hey", "summer", "ukulele"];
  const [playstate, setPlayState] = useState("play");
  const [selectAudio, setSelectAudio] = useState(require(`./music/hey.mp3`));
  const [selectImg, setSelectImg] = useState(require(`./images/hey.jpg`));

  let songIndex = 0;
  useEffect(() => {
    playBtn();
  }, []);

  const playBtn = useCallback((event) => {
    if (event) {
      if (event.target.className.split(" ").includes("fa-play")) {
        pause();
      } else {
        play();
      }
    }
    console.log("1");
  });

  const play = useCallback(() => {
    const audio = document.getElementById("audio");
    setPlayState("play");
    audio.play();
    console.log("2");
  });

  const pause = useCallback(() => {
    const audio = document.getElementById("audio");
    setPlayState("pause");
    audio.pause();
    console.log("3");
  });

  const prevSong = useCallback(() => {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    //console.log(songIndex);
    let autioTitle = require(`./music/${songs[songIndex]}.mp3`);
    let chooseimg = require(`./images/${songs[songIndex]}.jpg`);

    setSelectAudio(autioTitle);
    setSelectImg(chooseimg);
    playBtn();
    console.log("4");
  }, [selectAudio, selectImg, playstate]);

  const nextSong = useCallback(() => {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = songs.length - 1;
    }
    console.log(songs);
    console.log(songIndex);
    let autioTitle = require(`./music/${songs[songIndex]}.mp3`);
    console.log(autioTitle);
    let chooseimg = require(`./images/${songs[songIndex]}.jpg`);

    setSelectAudio(autioTitle);
    setSelectImg(chooseimg);
    playBtn();
    console.log("5");
  }, [selectAudio, selectImg, playstate]);

  return (
    <div className={`music-container ${playstate}`} id="music-container">
      <div class="music-info">
        <h4 id="title"></h4>
        <div class="progress-container" id="progress-container">
          <div class="progress" id="progress"></div>
        </div>
      </div>

      <audio src={selectAudio} id="audio"></audio>

      <div class="img-container">
        <img src={selectImg} alt="music-cover" id="cover" />
      </div>
      <div class="navigation">
        <button id="prev" class="action-btn" onClick={prevSong}>
          <i class="fas fa-backward"></i>
        </button>
        <button
          id="play"
          className={`action-btn action-btn-big`}
          onClick={(event) => playBtn(event)}
        >
          <i
            className={`fas ${playstate == "play" ? `fa-play` : `fa-pause`}`}
          ></i>
        </button>
        <button id="next" class="action-btn" onClick={nextSong}>
          <i class="fas fa-forward"></i>
        </button>
      </div>
    </div>
  );
}

export default App;

