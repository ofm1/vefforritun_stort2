const r = new XMLHttpRequest();
let data;
let categories;
let videos;
let form;

function getData() {
  // sæki gögn
  r.open('GET', 'videos.json', true);
  // r mun innihalda gögn um HTTP kall
  r.onload = function() {
    if (r.status >= 200 && r.status < 400) {
      data = JSON.parse(r.response);
      categories = data.categories;
      videos = data.videos;
      createInterface();
      }else {
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

// býr til viðmótið
function createInterface(){
  form = document.querySelector('form');
  for (let i = 0; i<categories.length; i++) {
      const cat = createSection(categories[i].title);
      for (let j = 0; j<videos.length; j++) {
      for (let k = 0; k<categories[i].videos.length; k++) {
        if(videos[j].id == categories[i].videos[k]) {
          const string = calcDuration(videos[j].duration);
          const video = createVideo(videos[j].title, videos[j].poster, findTime(videos[j].created), videos[j].id, videos[j].duration);
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
  const currentTime = new Date();
  const oneDay = 24*60*60*1000;
  const diffDays = Math.round(Math.abs((date - currentTime)/(oneDay)));
  if (diffDays>7) {
    if (diffDays > 30) {
      if (diffDays>360) {
        const years = "fyrir " + Math.round(((diffDays/7)/4)/12);
        return years;
      } else {
        const months = "fyrir " + Math.round((diffDays/7)/4) + " mánuðum síðan";
        return months;
      }
    } else {
      const weeks = "Fyrir " + Math.round(diffDays/7) + " vikum síðan";
      return weeks;
    }
  } else {
      const days = "Fyrir " + diffDays + " dögum síðan";
  }
}

// reiknar lengdina á videoinu
function calcDuration(duration) {
  const minutes = Math.floor(duration / 60);
  const secounds = duration - minutes * 60;
  if (secounds <10) {
    return (minutes + ':0' + secounds );
  } else {
    return (minutes + ':' + secounds);
  }
}



// býr til section fyrir hver category
function createSection(category) {
  const div=document.createElement('div');
  div.setAttribute('class', 'category');
  const h3 = document.createElement('h3');
  h3.appendChild(document.createTextNode(category));
  div.appendChild(h3);
  return div;
}

// býr til card fyrir videoin.
function createVideo(videoTitle, poster, created, videoId, videoDuration) {
  const div = document.createElement('div');
  div.setAttribute('class', 'video');
  const div_picture = document.createElement('div');
  div_picture.setAttribute('class', 'video__image');
  const img = document.createElement('img');
  img.setAttribute('class', 'video__img');
  img.setAttribute('src', poster);
  const content = document.createElement('div');
  content.setAttribute('class', 'video__content');
  const head = document.createElement('h3');
  head.setAttribute('class', "video__heading");
  head.appendChild(document.createTextNode(videoTitle));
  const time = document.createElement('p');
  time.appendChild(document.createTextNode(created));
  const duration = document.createElement('div');
  duration.setAttribute('class','video__duration');
  const string = calcDuration(videoDuration);
  duration.appendChild(document.createTextNode(string));
  div_picture.appendChild(duration);
  const videoForm = document.createElement('form');
  videoForm.setAttribute('class', videoTitle);
  content.appendChild(head);
  content.appendChild(time);
  div_picture.appendChild(img);
  videoForm.appendChild(div_picture);
  videoForm.appendChild(content);
  videoForm.addEventListener('click', function() {
    location.href = "video.html?id="+videoId;
  });
  div.appendChild(videoForm);
  return div;
}


getData();
