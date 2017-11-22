var r = new XMLHttpRequest();
var data;
var categories;
var videos;

function getData(){
  // sæki gögn
  r.open('GET', 'videos.json', true);
  // r mun innihalda gögn um HTTP kall
  r.onload = function() {
    if (r.status >= 200 && r.status < 400) {
      data = JSON.parse(r.response);
      categories = data.categories
      videos = data.videos;

      createInterface();
      } else {
      console.log('villa!', r);
    }
  };
  // Fall sem keyrir ef villa kemur upp
  r.onerror = function() {
    console.log('villa í tengingu');
  };
  // Senda af stað -- verðum að kalla í þetta!
  r.send();
}


//býr til viðmótið og hlustar á takkana
function createInterface(){
  var id = (getParameterByName('id')-1);
  var h1 = document.createElement('h1');
  h1.appendChild(document.createTextNode(videos[id].title));
  var film = document.querySelector('div');
  film.appendChild(h1);
  var videoContainer = document.createElement('div');
  videoContainer.setAttribute('class','videocontainer');
  var video = document.createElement('video');
  video.setAttribute('src', videos[id].video);
  videoContainer.appendChild(video);
  var overlay = document.createElement('div');
  overlay.setAttribute('class','overlay');
  videoContainer.appendChild(overlay);
  film.appendChild(videoContainer);
  var buttons = document.createElement('div');
  buttons.setAttribute('class', 'videoFilm__buttons');
  var back = document.createElement('button');
  back.setAttribute('class', 'videoFilm__back');
  var play = document.createElement('button');
  play.setAttribute('class', 'videoFilm__play');
  var mute = document.createElement('button');
  mute.setAttribute('class', 'videoFilm__mute');
  var full = document.createElement('button');
  full.setAttribute('class', 'videoFilm__full');
  var forward = document.createElement('button');
  forward.setAttribute('class', 'videoFilm__forward');

  // hlustar á play takkann
  play.addEventListener('click', function() {
    if(video.paused){
      overlay.style.display = 'none';
      video.play();
      play.setAttribute('class', 'videoFilm__pause');
    } else {
      overlay.style.display = 'block';
      video.pause();
      play.setAttribute('class', 'videoFilm__play');
    }
  });
  //hlustar á mute takkann
  mute.addEventListener('click', function() {
    if(video.muted){
      video.muted = false;
      mute.setAttribute('class', 'videoFilm__mute');
    } else {
      video.muted = true;
      mute.setAttribute('class', 'videoFilm__unmute');
    }
  });

  //hlustar á fullscreen takkann
  full.addEventListener('click', function() {
    video.webkitRequestFullscreen();
  });

  forward.addEventListener('click', function() {
    video.currentTime +=2;
  });

  back.addEventListener('click', function(){
    video.currentTime -=2;
  });

  buttons.appendChild(back);
  buttons.appendChild(play);
  buttons.appendChild(mute);
  buttons.appendChild(full);
  buttons.appendChild(forward);
  film.appendChild(buttons);

  // býr til "tilbaka" takkana
  var front = document.createElement('button');
  front.setAttribute('class', 'history');
  front.addEventListener('click', function(){
    window.history.back();
  });
  front.appendChild(document.createTextNode('Til baka'));
  film.appendChild(front);
}

// sækir id úr querystring
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}




getData();
