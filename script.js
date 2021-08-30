let video = document.querySelector("#video");
let video_player = document.querySelector(".video_player");
let playBtn = document.querySelector("#play");
let video_list = document.querySelector(".video_list");
let progress = document.querySelector(".progress");
let progress_container = document.querySelector(".progress-container");
let range = document.querySelector('input[type="range"]');
let volumeRange = document.querySelector(".volume");
let smallScreen = document.querySelector(".small");
let bigScreen = document.querySelector(".big");
let video_link = [
  "carMusic",
  "gaybulla-yaxshi-korardim",
  "Luis Fonsi - Despacito",
  "TARKAN - Dudu",
  "Willy William - Ego",
];
let videoIndex = 0;

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  video.onloadeddata = function () {
    let ds = parseInt(video.duration % 60);
    let dm = parseInt((video.duration / 60) % 60);
    video_player.querySelector("span").innerHTML = `${dm}:${ds}`;
  };
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = video.duration;

  video.currentTime = (clickX / width) * duration;
}

function play() {
  video_player.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  video.play();
}

function pause() {
  video_player.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  video.pause();
}

let loadVideo = (videos) => {
  video.setAttribute("src", `./video/${videos}.mp4`);
};

function nextVideo() {
  videoIndex++;

  if (videoIndex > video_link.length - 1) {
    videoIndex = 0;
  }

  loadVideo(video_link[videoIndex]);
  play();
}

playBtn.addEventListener("click", () => {
  let video_check = video_player.classList.contains("play");
  if (video_check) {
    pause();
  } else {
    play();
  }
});

video_link.forEach((photo, index) => {
  let img = document.createElement("img");
  img.setAttribute("src", `./poster/${photo}.jpg`);
  img.setAttribute("data-id", index);
  video_list.appendChild(img);
});

video_list.querySelectorAll("img").forEach((play, index=0) => {
  video.setAttribute("poster", `./poster/${video_link[index]}.jpg`);
  video.setAttribute("src", `./video/${video_link[index]}.mp4`);
  play.addEventListener("click", () => {
    video.setAttribute("poster", `./poster/${video_link[index]}.jpg`);
    video.setAttribute("src", `./video/${video_link[index]}.mp4`);
    pause();
    videoIndex = index;
  });
});

progress_container.addEventListener("click", setProgress);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("ended", nextVideo);

range.addEventListener("input", () => {
  video.volume = range.value;
  if (range.value > 0.8) {
    volumeRange.querySelector("i.fas").classList.remove("fa-volume-mute");
    volumeRange.querySelector("i.fas").classList.add("fa-volume-up");
    console.log("1" + range.volume);
  }
  if (range.value < 0.6) {
    volumeRange.querySelector("i.fas").classList.remove("fa-volume-up");
    volumeRange.querySelector("i.fas").classList.add("fa-volume-down");
    console.log("0.5" + range.volume);
  }
  if (range.value <= 0) {
    volumeRange.querySelector("i.fas").classList.remove("fa-volume-down");
    volumeRange.querySelector("i.fas").classList.add("fa-volume-mute");
    console.log("0" + range.volume);
  }
  if (range.value > 0.4) {
    volumeRange.querySelector("i.fas").classList.remove("fa-volume-mute");
    volumeRange.querySelector("i.fas").classList.add("fa-volume-down");
  }


});

document.body.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    video_player.classList.remove("big");
  }
});

smallScreen.addEventListener("click", () => {
  video_player.classList.remove("big");
});

bigScreen.addEventListener("click", () => {
  video_player.classList.add("big");
  bigScreen.addEventListener("keydown", (e) => {
    e.target.code = "F11";
    console.log(e);
  });
});
