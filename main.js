const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.querySelector(".playlist"); // Değişiklik burada

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

let index;

let loop = true;
// Sarkı Listesi Obje Olarak

const songLists = [
  {
    name: "No ,No ,No ",
    link: "assets/cemkaraca.mp3",
    artist: "Cem Karaca",
    image: "assets/cemkaraca.jpeg",
  },
  {
    name: "Lucky Road",
    link: "assets/barismanco.mp3",
    artist: "Barış Manço",
    image: "assets/barismanco.jpeg",
  },
  {
    name: "My Delight",
    link: "assets/erkinkoray.mp3",
    artist: "Erkin Koray",
    image: "assets/erkinkoray.jpeg",
  },
  {
    name: "Boşver Arkadaş",
    link: "assets/ilhanirem.mp3",
    artist: "İlhan İrem",
    image: "assets/ilhanirem.jpeg",
  }
];

const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;

  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second} `;
};

const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songLists[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  playListContainer.classList.add("hide");
  playAudio();
};
//ses aç
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

//ses ilerlemesi
progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;
  let coorEnd = event.clientX;
  let progress = (coorEnd - coordStart) / progressBar.offsetWidth;
  currentProgress.style.width = progress * 100 + "%";
  audio.currentTime = progress * audio.duration;
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration).toFixed(3) * 100 + "%";
}, 1000);

audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

const nextSong = () => {
  if (loop) {
    if (index == songLists.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songLists.length);
    setSong(randIndex);
  }
};
audio.onended = () => {
  nextSong;
};

//repeat
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
  }
});

//shuffle
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    audio.loop = false;
  } else {
    shuffleButton.classList.add("active");
    audio.loop = true;
  }
});

const previousSong = () => {
  if (index > 0) {
    index -= 1;
  } else {
    index = songLists.length - 1;
  }
  setSong(index);
};

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

const initializePlaylist = () => {
  for (let i in songLists) {
    playListSongs.innerHTML += `<li class="playlistSong" onclick="setSong(${i})">
    <div class="playlist-image-container"><img src="${songLists[i].image}" /></div>
    <div class="playlist-song-details">
      <span id="playlist-song-name">${songLists[i].name}</span>
      <span id="playlist-song-artist-name">${songLists[i].artist}</span>
    </div>
  </li>`;
  }
};

window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializePlaylist();
};

//Play Button
playButton.addEventListener("click", playAudio);

//Next Button

nextButton.addEventListener("click", nextSong);

//Prev Button

prevButton.addEventListener("click", previousSong);

//Pause

pauseButton.addEventListener("click", pauseAudio);
