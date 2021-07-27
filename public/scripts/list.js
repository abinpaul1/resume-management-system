$(window).scroll(function() {
  sessionStorage.scrollTop = $(this).scrollTop();
});

$(document).ready(function() {
  //For keeping scroll position
  if (sessionStorage.scrollTop != "undefined") {
    $(window).scrollTop(sessionStorage.scrollTop);
  }

  const skillsAddDynamic = function() {
    var skills_max_fields = 10; //maximum input boxes allowed
    var skills_wrapper = $('.skills_input_fields_wrap'); //Fields wrapper
    var skills_add_button = $('.add_skills_button'); //Add button ID
    var x = 1; //initlal text box count

    $(skills_add_button).click(function(e) {
      //on add input button click
      e.preventDefault();
      if (x < skills_max_fields) {
        //max input box allowed
        x++; //text box increment
        $(skills_wrapper).append(
          '<div class="skills-entry col-md-12"><input type="text" name="filterskill" class="form-control" id="search-skills" placeholder="Enter Skill"/><button class="remove_skills btn btn-danger"><i class="fa fa-minus"></i></button></div>'
        );

        $(skills_wrapper)
          .find('input[type=text]:last')
          .autocomplete({
            source: function(req, res) {
              $.ajax({
                url: '/api/candidate/list/autocomplete/skills',
                dataType: 'jsonp',
                type: 'GET',
                data: req,
                success: function(data) {
                  res(data);
                  console.log('success entered');
                },
                error: function(err) {
                  console.log(err.status);
                  console.log('error entered');
                }
              });
            },

            minLength: 1,
            select: function(event, ui) {
              if (ui.items) {
                $('#search-position').text(ui.item.label);
              }
            }
          });
        //add input box
      }
    });

    $(skills_wrapper).on('click', '.remove_skills', function(e) {
      //user click on remove text
      e.preventDefault();
      $(this)
        .parent('div')
        .remove();
      x--;
    });
  };

  skillsAddDynamic();

  // Position Autocomplete
  $('#search-position').autocomplete({
    source: function(req, res) {
      $.ajax({
        url: '/api/candidate/list/autocomplete/position',
        dataType: 'jsonp',
        type: 'GET',
        data: req,
        success: function(data) {
          for (var i = 0; i<data.length; i=i+1){
            data[i]['label'] = data[i]['label'].replace(/\b\w+/g,function(s){return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();});
          }
          res(data);
        },
        error: function(err) {
          console.log(err.status);
        }
      });
    },

    minLength: 1,
    select: function(event, ui) {
      if (ui.items) {
        $('#search-position').text(ui.item.label);
      }
    }
  });

  // Skills Autocomplete
  $('#search-skills').autocomplete({
    source: function(req, res) {
      $.ajax({
        url: '/api/candidate/list/autocomplete/skills',
        dataType: 'jsonp',
        type: 'GET',
        data: req,
        success: function(data) {
          res(data);
        },
        error: function(err) {
          console.log(err.status);
        }
      });
    },

    minLength: 1,
    select: function(event, ui) {
      if (ui.items) {
        $('#search-position').text(ui.item.label);
      }
    }
  });

  //Qualification autocomplete
  $('#search-qualification').autocomplete({
    source: function(req, res) {
      $.ajax({
        url: '/api/candidate/list/autocomplete/qualification',
        dataType: 'jsonp',
        type: 'GET',
        data: req,
        success: function(data) {
          res(data);
        },
        error: function(err) {
          console.log(err.status);
        }
      });
    },

    minLength: 1,
    select: function(event, ui) {
      if (ui.items) {
        $('#search-qualification').text(ui.item.label);
      }
    }
  });

  //Location autocomplete
  $('#search-location').autocomplete({
    source: function(req, res) {
      $.ajax({
        url: '/api/candidate/list/autocomplete/location',
        dataType: 'jsonp',
        type: 'GET',
        data: req,
        success: function(data) {
          for (var i = 0; i<data.length; i=i+1){
            data[i]['label'] = data[i]['label'].replace(/\b\w+/g,function(s){return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();});
          }
          res(data);
        },
        error: function(err) {
          console.log(err.status);
        }
      });
    },

    minLength: 1,
    select: function(event, ui) {
      if (ui.items) {
        $('#search-location').text(ui.item.label);
      }
    }
  });

  //Client autocomplete
  $('#search-client').autocomplete({
    source: function(req, res) {
      $.ajax({
        url: '/api/candidate/list/autocomplete/client',
        dataType: 'jsonp',
        type: 'GET',
        data: req,
        success: function(data) {
          for (var i = 0; i<data.length; i=i+1){
            data[i]['label'] = data[i]['label'].replace(/\b\w+/g,function(s){return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();});
          }
          res(data);
        },
        error: function(err) {
          console.log(err.status);
        }
      });
    },

    minLength: 1,
    select: function(event, ui) {
      if (ui.items) {
        $('#search-client').text(ui.item.label);
      }
    }
  });

  //Back to top button
  var btn = $('#top-button');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
  });

  $('#select-all').click( function () {
    checkboxes = document.getElementsByClassName("row-checkbox");
    console.log(checkboxes.length)
    for(var i=0, n=checkboxes.length;i<n;i++) {
      checkboxes[i].checked = this.checked;
    }
  });

});


function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a
  // flash, so some of these are just precautions. However in
  // Internet Explorer the element is visible whilst the popup
  // box asking the user for permission for the web page to
  // copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copyied successfully');
  } catch (err) {
    console.log('Oops, unable to copy. Try upgrading browser');
  }

  document.body.removeChild(textArea);
}


//Checkbox function to copy emails of slected rows
function GetSelectedEmails() {
      //Reference the Table.
      var grid = document.getElementById("list-candidates");

      //Reference the CheckBoxes in Table.
      var checkBoxes = grid.getElementsByTagName("INPUT");
      message = "";

      //Loop through the CheckBoxes.
      for (var i = 1; i < checkBoxes.length; i++) {
          if (checkBoxes[i].checked) {
              var row = checkBoxes[i].parentNode.parentNode;
              message += row.cells[14].innerHTML;
              message += " ";
          }
      }

      copyTextToClipboard(message);
      alert("Copied email of selected rows");
}
