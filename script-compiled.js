'use strict';

var r = new XMLHttpRequest();
var data;
var categories;
var videos;
var form;

function getData() {
  // sæki gögn
  r.open('GET', 'videos.json', true);
  // r mun innihalda gögn um HTTP kall
  r.onload = function () {
    if (r.status >= 200 && r.status < 400) {
      data = JSON.parse(r.response);
      categories = data.categories;
      videos = data.videos;

      createInterface();
    } else {
      console.log('villa!', r);
    }
  };
  // Fall sem keyrir ef villa kemur upp
  r.onerror = function () {
    console.log('villa í tengingu');
  };
  // Senda af stað -- verðum að kalla í þetta!
  r.send();
}

// býr til viðmótið
function createInterface() {
  form = document.querySelector('form');

  for (var i = 0; i < categories.length; i++) {
    var cat = createSection(categories[i].title);
    for (var j = 0; j < videos.length; j++) {
      for (var k = 0; k < categories[i].videos.length; k++) {
        if (videos[j].id == categories[i].videos[k]) {
          var string = calcDuration(videos[j].duration);
          var video = createVideo(videos[j].title, videos[j].poster, findTime(videos[j].created), videos[j].id, videos[j].duration);
          cat.appendChild(video);
        }
      }
    }
    console.log(cat);
    form.appendChild(cat);
  }
}

// finnur út hve langt síðan myndbandið var búið til
function findTime(date) {
  var currentTime = new Date();
  var oneDay = 24 * 60 * 60 * 1000;
  var diffDays = Math.round(Math.abs((date - currentTime) / oneDay));
  if (diffDays > 7) {
    if (diffDays > 30) {
      if (diffDays > 360) {
        var years = "fyrir " + Math.round(diffDays / 7 / 4 / 12);
        return years;
      } else {
        var months = "fyrir " + Math.round(diffDays / 7 / 4) + " mánuðum síðan";
        return months;
      }
    } else {
      var weeks = "Fyrir " + Math.round(diffDays / 7) + " vikum síðan";
      return weeks;
    }
  } else {
    var days = "Fyrir " + diffDays + " dögum síðan";
  }
}

// reiknar lengdina á videoinu
function calcDuration(duration) {
  var minutes = Math.floor(duration / 60);
  var secounds = duration - minutes * 60;
  if (secounds < 10) {
    return minutes + ':0' + secounds;
  } else {
    return minutes + ':' + secounds;
  }
}

// býr til section fyrir hver category
function createSection(category) {
  var div = document.createElement('div');
  div.setAttribute('class', 'category');
  var h3 = document.createElement('h3');
  h3.appendChild(document.createTextNode(category));
  div.appendChild(h3);
  return div;
}

// býr til card fyrir videoin.
function createVideo(videoTitle, poster, created, videoId, videoDuration) {

  var div = document.createElement('div');
  div.setAttribute('class', 'video');

  var div_picture = document.createElement('div');
  div_picture.setAttribute('class', 'video__image');
  var img = document.createElement('img');
  img.setAttribute('class', 'video__img');
  img.setAttribute('src', poster);
  var content = document.createElement('div');
  content.setAttribute('class', 'video__content');
  var head = document.createElement('h3');
  head.setAttribute('class', "video__heading");
  head.appendChild(document.createTextNode(videoTitle));
  var time = document.createElement('p');
  time.appendChild(document.createTextNode(created));
  var duration = document.createElement('div');
  duration.setAttribute('class', 'video__duration');
  var string = calcDuration(videoDuration);
  duration.appendChild(document.createTextNode(string));
  div_picture.appendChild(duration);
  var videoForm = document.createElement('form');
  videoForm.setAttribute('class', videoTitle);
  content.appendChild(head);
  content.appendChild(time);
  div_picture.appendChild(img);
  videoForm.appendChild(div_picture);
  videoForm.appendChild(content);
  videoForm.addEventListener('click', function () {
    location.href = "video.html?id=" + videoId;
  });

  div.appendChild(videoForm);
  return div;
}

getData();

//# sourceMappingURL=script-compiled.js.map