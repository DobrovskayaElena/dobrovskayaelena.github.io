/* проверка наличия localStorage */

if (localStorage.getItem("project") === null) {
  localStorage.setItem("project", JSON.stringify(project))
} else {
  console.log("It was created")
};
if (localStorage.getItem("BASE") === null) {
  localStorage.setItem("BASE", JSON.stringify(project))
} else {
  console.log("It was created")
};

/* проверка закончена */


let burger = document.getElementById("burger").onclick = function() {
  let menu = document.getElementById("menu-ul");
  menu.classList.toggle("header-menu_navigation_visible");
}

let modal = document.getElementById('myModal');
let btn = document.getElementById("add-btn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let btnCancel = document.getElementById("cancel-album-button");
btnCancel.onclick = function() {
  modal.style.display = "none";
}

function random() {
  return Math.floor(Math.random() * 100000)
};


function funсonload() {
  let info = "";
  $(".right-content").html("");

  function artistsData(returnObj) {
    for (let i = 0; i < returnObj.length; i++) {
      let infoData = returnObj[i].album;
      for (let j = 0; j < infoData.length; j++) {
        info += '<table cellspacing="5" cellpadding="10" id="mytable' + infoData[j].id + '" class="mytable" data-id="' + infoData[j].id + '"><tbody><tr><td><img src="' + infoData[j].url + '"></img></td><td>' + infoData[j].name + '<p class="add-info"><big>Duration: </big> ' + infoData[j].time + '</p><p class="add-info"><big>Year: </big>' + infoData[j].year + '</p><p><button id="edit" class="open-modal-btn">Edit</button><button id="delete" class="open-modal-btn">Delete</button></p></td></tr></tbody></table>';

      }

    }

    let albumsInfo = document.getElementById("albums-info");
    albumsInfo.innerHTML = info;

  }


  artistsData(returnObj);

}

window.onload = funсonload;

/* Create artists list */

let artists = document.getElementById("artists").onclick = function() {
  let info = "";
  $(".right-content").html("");

  for (let i = 0; i < returnObj.length; i++) {
    info += '<table cellspacing="5" cellpadding="10" id="mytable' + random() + '" class="mytable"><tbody><tr><td><img src="' + returnObj[i].url + '"></img></td><td>' + returnObj[i].artist + '<p>Cenre: ' + returnObj[i].genre + '</p><p>Style: ' + returnObj[i].style + '</p></td></tr></tbody></table>';
  }
  let albumsInfo = document.getElementById("albums-info");
  albumsInfo.innerHTML = info;

}

/* Create albums list */

let albums = document.getElementById("albums").onclick = function() {
  funсonload();
}

/* Create genres list */

let genres = document.getElementById("genres").onclick = function() {
  let info = "";
  $(".right-content").html("");

  for (let i = 0; i < returnObj.length; i++) {
    let infoData = returnObj[i].genre;
    for (let j = 0; j < infoData.length; j++) {

      info += '<table cellspacing="5" cellpadding="10" id="mytable' + random() + '" class="mytable"><tbody><tr><td>' + infoData[j] + '</td></tr></tbody></table>';


    }
  }



  let albumsInfo = document.getElementById("albums-info");
  albumsInfo.innerHTML = info;

}

/* Create styles list */

let styles = document.getElementById("styles").onclick = function() {
  let info = "";
  $(".right-content").html("");

  for (let i = 0; i < returnObj.length; i++) {
    let infoData = returnObj[i].style;

    for (let j = 0; j < infoData.length; j++) {


      info += '<table cellspacing="5" cellpadding="10" id="mytable' + random() + '" class="mytable"><tbody><tr><td>' + infoData[j] + '</td></tr></tbody></table>';

    };
  }

  let albumsInfo = document.getElementById("albums-info");
  albumsInfo.innerHTML = info;
}

/* Create songs list */

let songs = document.getElementById("songs").onclick = function() {
  let info = "";
  $(".right-content").html("");

  for (let i = 0; i < returnObj.length; i++) {
    let infoData = returnObj[i].album;
    for (let j = 0; j < infoData.length; j++) {
      let infoSongs = infoData[j].songs;
      for (let k = 0; k < infoSongs.length; k++) {
        info += '<table cellspacing="5" cellpadding="10" id="mytable' + random() + '" class="mytable"><tbody><tr><td style="width: 300px;">' + infoSongs[k] + '</td><td>' + returnObj[i].artist + '</td><td>' + infoData[j].name + '</td></tr></tbody></table>';
      }

    }
  }
  let albumsInfo = document.getElementById("albums-info");
  albumsInfo.innerHTML = info;

}


$(document).ready(function() {
  $("#search").keyup(function() {
    _this = this;

    $.each($(".mytable tbody tr"), function() {
      if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
        $(this).hide();
      } else {
        $(this).show();
      };
    });
  });
});


var form = document.querySelector('form');
var input = document.querySelector('[data-text');
var button = document.getElementById('clone');

button.addEventListener("click", clone);

function clone() {
  let cloneButton = input.cloneNode(true);
  form.appendChild(cloneButton);
};

$('#add-album-button').bind('touchstart click', function() {

  let idAlbum = Math.floor(Math.random() * 100000);

  let newObject = new Object();

  newObject.url = $('form input[name="artist-cover"]').val();
  newObject.artist = $('form input[name="artist"]').val();
  newObject.id = idAlbum;
  newObject.genre = [$('form input[name="artist-genre"]').val()];
  newObject.style = [$('form input[name="artist-style"]').val()];
  newObject.album = [{
    "url": $('form input[name="album-cover"]').val(),
    "name": $('form input[name="album-title"]').val(),
    "time": $('form input[name="album-time"]').val(),
    "id": idAlbum,
    "year": $('form input[name="album-year"]').val(),
    "songs": $('input[name="songs[]"]').map(function() {
      return this.value
    }).get()
  }];

  let getObject = JSON.parse(localStorage.getItem('project'));
  getObject.push(newObject);

  localStorage.setItem('project', JSON.stringify(getObject));

  modal.style.display = "none";

});


let returnObj = JSON.parse(window.localStorage.getItem('project'));

let rightnInfo = "";

$(document).on('click', '.mytable', function() {
  rightnInfo = "";
  let album = $(this).attr("data-id");
  $.each(returnObj, function(index, obj) {
    if (album == obj.id) {
      let takeSongs = this.album['0'].songs;
      for (let a = 0; a < takeSongs.length; a++) {
        rightnInfo += '<ul>';
        rightnInfo += '<li>' + takeSongs[a] + '</li>';
        rightnInfo += '</ul>';

      }

      $(".right-content").html(rightnInfo);

    }
  })
})