(function() {
var $filters = $('#filters');
var templatesAvailable = $('.template', '.templates').not('.filter-chooser').length;

// Save movies to localStorage
var saveMovies = function (data) {
  localStorage.setItem('movies', JSON.stringify(data));
};
// Get movies from localStorage
var getMovies = function () {
  return JSON.parse(localStorage.getItem('movies'));
}
// Remove the old results from the page before showing the new ones
var removeResults = function () {
  $('tr:has(td)', '#results').remove();
};

// Show results based on filter conditions
var showResults = function () {
  var titleCondition = $filters.find('select[name="title-condition"]').val();
  var title = $filters.find('input[name="title"]').val();
  var binderMin = parseInt($filters.find('input[name="binder-min"]').val(), 10);
  var binderMax = parseInt($filters.find('input[name="binder-max"]').val(), 10);
  var yearMin = parseInt($filters.find('input[name="year-min"]').val(), 10);
  var yearMax = parseInt($filters.find('input[name="year-max"]').val(), 10);
  var viewed = $filters.find('input[name="viewed"]:checked').val();

  // Clear previous results, but not headers
  removeResults();
  var results = $.grep(getMovies(), function (element, index) {
    return (
      (
        (titleCondition === undefined && title === undefined) ||
        (titleCondition === 'contains' && element.title.indexOf(title) >= 0) ||
        (titleCondition === 'starts-with' && element.title.indexOf(title) === 0) ||
        (titleCondition === 'ends-with' && element.title.indexOf(title) === element.title.length - title.length) ||
        (titleCondition === 'equals' && element.title === title)
      ) &&
      (isNaN(binderMin) || element.binder >= binderMin) &&
      (isNaN(binderMax) || element.binder <= binderMax) &&
      (isNaN(yearMin) || element.year >= yearMin) &&
      (isNaN(yearMax) || element.year <= yearMax) &&
      (viewed === undefined || element.viewed === (viewed === 'true'))
    );
  });

  var row;
  // This loop can be optimized but we wanted to recall that you can create an element on the fly using
  // jQuery. The optimization can be done putting all the rows as a string inside the variable "row" and
  // appending all the elements in one call after the loop.
  for (var i = 0; i < results.length; i++) {
    row = '<td>' + results[i].title + '</td>';
    row += '<td>' + results[i].year + '</td>';
    row += '<td>' + results[i].binder + '</td>';
    row += '<td>' + results[i].page + '</td>';
    row += '<td>' + results[i].slot + '</td>';
    row += '<td>' + (results[i].viewed ? 'X' : '') + '</td>';

    $('#results').append(
      $('<tr>').html(row)
    );
  }
};

// Load movies from json file and save them to localStorage for future usage
// Fill in the year options in the select drop-down list of 'Add film' form
$.getJSON('movies.json', function (data) {
  if (typeof (Storage) !== "undefined") {
    saveMovies(data);
    $(document).trigger('moviesLoaded');            // Init filter options and events
    $(document).trigger('yearOptionsLoaded');       // Fill in the selection list with years
  }
  else {
    // Hide the functions of adding and removing films if localStorage is not supported by the browser
    $('#editFilms').css('visibility', 'hidden');
    alert('Your browser does not support the localStorage. Adding and removing films functions require the support for localStorage.');
  }
});
// Movies loaded event
$(document).on('moviesLoaded', function () {
  $('#filters')
    .on('change', '.filter-type', function () {
      var $this = $(this);
      var $filter = $this.closest('.filter');
      var filterType = $this.find(':selected').data('template-type');

      $('.qualifier', $filter).remove();
      $('div.template.' + filterType)
        .clone()
        .addClass('qualifier')
        .appendTo($filter);
      $this.find('option[value=""]').remove();
    })
    .on('click', '.filter-remover', function () {
      $(this).closest('.filter').remove();
    });

  $('#filter-add')
    .click(function () {
      // Check if the button was pressed before selecting a filter
      if ($filters.find('.template:last .filter-type').val() === '') {
        return;
      }

      // Find filters already in use
      var filterInUse = $filters
        .children()
        .map(function () {
          return $(this)
            .children('.template')
            .attr('class')
            .match(/\b(template-.+?)\b/g)[0];
        })
        .get();

      // All the filters available are already in use
      if (filterInUse.length === templatesAvailable) {
        return;
      }

      var $filterChooser = $('div.template.filter-chooser')
        .clone()
        .removeClass('filter-chooser')
        .addClass('filter');

      // Remove filters already in use
      $filterChooser
        .find('option[data-template-type]')
        .filter(function () {
          return filterInUse.indexOf($(this).data('template-type')) >= 0;
        })
        .remove();
      $filterChooser.appendTo($filters);
    })
    .click();

  $('#form-filters').submit(function (event) {
    event.preventDefault();
    showResults();
  });


});

// Click on the X button of the Filters
$(document).on('click', '.filter-remover', function (event) {
  $('#filters').children().length > 0 ? showResults() : removeResults();
});

// Toggle selection of the result rows
$(document).on('click', '#results tr:has(td)', function () {
  $(this).toggleClass('rowSelected');
  $('#results tr.rowSelected').length > 0 ? $deleteFilm.prop('disabled', false) : $deleteFilm.prop('disabled', true);
});

// Fill in the selection options in the "Add film" form
$(document).on('yearOptionsLoaded', function () {
  var options = '<option value="">Select the year of publication</option>';
  var year;
  options += $.map($(Array(101)), function (val, i) {
    year = 2017 - i;
    return '<option value=' + year + '>' + year + '</option>';
  });
  $('#year').append(options);
});

// Add film event
$(document).on('click', '#doAddFilm', function (event) {
  event.preventDefault();

  var title = $('#title').val().trim()
    , year = parseInt($('#year option:selected').val())
    , binder = parseInt($('#binder').val())
    , page = parseInt($('#page').val())
    , slot = parseInt($('#slot').val())
    , viewed = $('#myModal input[name=viewed]:checked').val();

  if (validForm(title, year, binder, page, slot)) {
    var movies = getMovies();
    var foundIndex = movies.findIndex(function (movie) {
      return movie.title === title;
    });

    if (foundIndex < 0) {
      movies.unshift({                // Add the new movie
        "title": title,
        "year": year,
        "binder": binder,
        "page": page,
        "slot": slot,
        "viewed": viewed === "true"
      });
      saveMovies(movies);              // Save movies to localStorage
      $('#myModal').modal('hide');     // Hide the popup
      $('[type=reset]').trigger('click');
      showResults();                   // Refresh the results
    }
    else {
      $('#error').val('This movie already exists in the database.')
        .show();
    }

  }
  else {
    $('#error').val('Make sure all fields are filled and have valid values.')
      .show();
  }

});
// Validate the "Add film" form
var currentYear = (new Date()).getYear() + 1900;
var startingYear = 1917;
var validNumber = function (num) {
  return (!isNaN(num) && num > 0)
}
var validForm = function (title, year, binder, page, slot) {
  return (title !== undefined && title !== "")
    && (validNumber(year) && year <= currentYear && year >= startingYear)
    && validNumber(binder)
    && validNumber(page)
    && validNumber(slot);
}


// Sort by column event
$(document).on('click', '#results tr th', function () {
  var property = $(this).find("span:first-child").text().toLowerCase();
  var $arrow = $(this).find("span:last-child");

  // Add ascend-sorting arrow if the sorting arrow is absent 
  // or the descend-sorting arrow shows
  if ($.inArray($arrow.text(), ["", "▼"]) >= 0) {
    $arrow.html("&#x25B2;"); // Ascend-sorting arrow
    saveMovies(sortMoviesBy(property));
  }
  else {
    $arrow.html("&#x25BC;"); // Descend-sorting arrow
    saveMovies(sortMoviesBy(property, false));
  }
  // Remove the sorting arrows in the other columns
  $('#results tr th').not(this).find("span:last-child").text("");

  showResults();
});
// Sort the movies by property
var sortMoviesBy = function (property, ascend) {
  var asc = (ascend === undefined || ascend) ? 1 : -1;
  return getMovies().sort(function (a, b) {
    if (property === 'title')
      return asc * a[property].localeCompare(b[property]);
    else
      return asc * (a[property] - b[property]);
  });
}

var $deleteFilm = $('#deleteFilm');
// Delete film
$(document).on('click', '#deleteFilm', function () {
  var movies = getMovies();
  // Remove from the page, localStorage and disable the button afterwards
  $('tr.rowSelected td').slideUp("slow", function () {
    // Remove from localStorage          
    $('tr.rowSelected td:first-child').each(function (index, element) {
      movies = movies.filter(function (movie) {
        return movie.title !== $(element).text();
      });
    });
    saveMovies(movies);

    // Disable the "Delete Film" button  
    $deleteFilm.prop('disabled', true);
  });
});
})();