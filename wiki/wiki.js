/* проверка наличия localStorage */

if (localStorage.getItem("favorite") === null) {
  localStorage.setItem("favorite", JSON.stringify([]))
} else {
  console.log("Favorite was created")
}

if (localStorage.getItem("best") === null) {
  localStorage.setItem("best", JSON.stringify([]))
} else {
  console.log("Best was created")
}

$(function() {

  $('#searchTerm').keypress(function(e) {
    if (e.keyCode === 13) {
      $('#output').html('');
      let searchTerm = $('#searchTerm').val();
      let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&format=json&callback=?';
      $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        async: false,
        dataType: 'json',
        success: function(data, status, jqXHR) {
          console.log(data);
          for (let i = 0; i <= 5; i++) { //data[1].length
            $('#output').prepend('<div id="wiki' + i + '" class="view"><div class="well"><a href=' + data[3][i] + '><h4>' + data[1][i] + '</h4><p>' + data[2][i] + '</p></a><button id="add' + i + '" class="button">Add to Favorite</button></div></div>');
          }
        },
      })
    }
    console.log(e);
  });

  $('#search').on('click', function() {
    $('#output').html('');
    let searchTerm = $('#searchTerm').val();
    let url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm + '&format=json&callback=?';
    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        async: true,
        dataType: 'json',
        success: function(data, status, jqXHR) {
          console.log(data);
          for (let i = 0; i <= 5; i++) { //data[1].length
            $('#output').prepend('<div id="wiki' + i + '" class="view"><div class="well"><a href=' + data[3][i] + '><h4>' + data[1][i] + '</h4><p>' + data[2][i] + '</p></a><button id="add' + i + '" class="button">Add to Favorite</button></div></div>');
          }
        },
      })
      .done(function() {
        console.log('success');

      })
      .fail(function() {
        console.log('error');
      })
      .always(function() {
        console.log('complete');
      });
  });
});

$(function() {

  $('#searchTerm').keypress(function(e) {
    if (e.keyCode === 13) {
      $('#outputNews').html('');
      let searchTerm = $('#searchTerm').val();
      $.ajax({
        url: "https://newsapi.org/v2/everything?q=" + searchTerm + "&from=2019-04-18&sortBy=popularity&apiKey=b98968fec60c4d94832c527a47d11028",
        type: "GET",

        async: true,

        success: function(data) {
          console.log(data);
          for (let i = 0; i < data.articles.length; i++) {
            let source = data.articles[i].source;
            if (data.articles[i].author !== null && source.id !== null) {
              $('#outputNews').prepend('<div id="news' + i + '" class="view"><div class="well"><a href=' + data.articles[i].url + '><img src=' + data.articles[i].urlToImage + '><h4>' + data.articles[i].author + '</h4><p>' + data.articles[i].title + '</p></a><button id="addNews' + i + '" class="button">Add to Favorite</button></div></div>');
            }
          }
        },


      });
    }
    console.log(e);
  });

  $('#search').on('click', function() {
    $('#outputNews').html('');
    let searchTerm = $('#searchTerm').val();
    $.ajax({
        url: "https://newsapi.org/v2/everything?q=" + searchTerm + "&from=2019-04-18&sortBy=popularity&apiKey=b98968fec60c4d94832c527a47d11028",
        type: "GET",

        async: true,

        success: function(data) {
          console.log(data);
          for (let i = 0; i < data.articles.length; i++) {
            let source = data.articles[i].source;
            if (data.articles[i].author !== null && source.id !== null) {
              $('#outputNews').prepend('<div id="news' + i + '" class="view"><div class="well"><a href=' + data.articles[i].url + '><img src=' + data.articles[i].urlToImage + '><h4>' + data.articles[i].author + '</h4><p>' + data.articles[i].title + '</p></a><button id="addNews' + i + '" class="button">Add to Favorite</button></div></div>');
            }
          }
        },
      })

      .done(function() {
        console.log('success');
      })
      .fail(function() {
        console.log('error');
      })
      .always(function() {
        console.log('complete');
      });
  });
});


/* Создание списка 'favorite' */

$('#searchTerm').keypress(function(e) {
  if (e.keyCode === 13) {
    let favObject = JSON.parse(localStorage.getItem('favorite'));
    if ($('#searchTerm').val() !== "") {
      favObject.push($('#searchTerm').val());
      localStorage.setItem('favorite', JSON.stringify(favObject));
    }
  }
});

$('#search').on('click', function() {
  let favObject = JSON.parse(localStorage.getItem('favorite'));
  if ($('#searchTerm').val() !== "") {
    favObject.push($('#searchTerm').val());
    localStorage.setItem('favorite', JSON.stringify(favObject));
  }
});

let favInfo = JSON.parse(localStorage.getItem('favorite') || []);

function getFav() {
  let set = new Set(favInfo);
  let lastSearch = set.values();
  let lastArray = Array.from(lastSearch);
  for (let j = 0; j < lastArray.length; j++) {
    $('#last').prepend('<a href="#" id="favList' + lastArray[j] + '" class="favList">' + lastArray[j] + '</a>');
  }
}
getFav();

/* Добавление значения в 'Search' */
$(function() {
  $('.favList').on('click', function(event) {
    document.getElementById('searchTerm').value = this.innerHTML;
  });
});

$(document).on('click', '.view', function(e) {
  let id = document.getElementById(this.id);
  console.log(id);

  let bestObject = JSON.parse(localStorage.getItem('best'));
  bestObject.push(document.getElementById(this.id).innerHTML);
  console.log(bestObject);
  localStorage.setItem('best', JSON.stringify(bestObject));

})

let bestInfo = JSON.parse(localStorage.getItem('best') || []);

function getBest() {
  let setBest = new Set(bestInfo);
  let bestSearch = setBest.values();
  let bestArray = Array.from(bestSearch);
  for (let j = 0; j < bestArray.length; j++) {
    $('#popular').html('');
    $('#popular').prepend(bestArray);
  }
}
getBest();
