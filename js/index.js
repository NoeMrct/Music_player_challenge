var played = false;
var duration = 1;
var currentMusicTime = 0;
var children = null;
var audio = null;
var ID = null;
var arrayPosition = 0;
var musics = [
  "Nuit_noire",
  "Wishlist",
  "Colorado",
  "Dream_on",
  "Falling_down",
  "ТАЙМАУТ",
  "August",
];

function playStop(id) {
  ID = id;
  audio = document.getElementById("audio");
  children = document.getElementById(id).children;
  if (document.getElementById(id).classList == "block") {
    var element = document.querySelector(".block_active");
    if (typeof element != "undefined" && element != null) {
      document.querySelector(".block_active").classList = "block";
      audio.pause();
    }
    document.getElementById(id).classList = "block_active";
    children[0].children[1].style.display = "none";

    //Set audio
    audio.src = "./music/" + id + ".mp3";
    audio.onloadedmetadata = function () {
      duration = parseInt(audio.duration);
      children[1].children[1].setAttribute("max", duration);
      audio.play();
      audio.volume = 0.1;
      played = true;
    };
  } else {
    if (played == true) {
      children[0].children[1].style.display = "block";
      children[0].children[2].style.display = "none";
      audio.pause();
      played = false;
    } else {
      children[0].children[2].style.display = "block";
      children[0].children[1].style.display = "none";
      audio.play();
      played = true;
    }
  }
}

function musicTimer(timer) {
  children[1].children[1].value = parseInt(timer);
  children[1].children[1].setAttribute("value", parseInt(timer));

  if (children[1].children[1].value >= duration) {
    next();
  }
}

function changeTime(slider) {
  audio.currentTime = slider.value;
  children[1].children[1].value = slider.value;
  children[1].children[1].setAttribute("value", slider.value);
  audio.pause();
  audio.play();
}

function previous() {
  if (musics.indexOf(ID) == 0) {
    playStop(musics[musics.length - 1]);
  } else {
    arrayPosition = musics.indexOf(ID);
    playStop(musics[arrayPosition - 1]);
  }
}

function next() {
  if (musics.indexOf(ID) == musics.length - 1) {
    playStop(musics[0]);
  } else {
    arrayPosition = musics.indexOf(ID);
    playStop(musics[arrayPosition + 1]);
  }
}
