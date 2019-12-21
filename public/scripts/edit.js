$(document).ready(function() {
  const skillsAddDynamic = function() {
    var skills_max_fields = 10; //maximum input boxes allowed
    var skills_wrapper = $('.skills_input_fields_wrap'); //Fields wrapper
    var skills_add_button = $('.add_skills_button'); //Add button ID
    var x = $('.skills-entry').length + 1; //initlal text box count
    console.log(x);

    $(skills_add_button).click(function(e) {
      //on add input button click
      e.preventDefault();
      if (x < skills_max_fields) {
        //max input box allowed
        x++; //text box increment
        $(skills_wrapper).append(
          '<div class="skills-entry"><input type="text" class="form-control" name="skills"/><button class="remove_skills btn btn-danger"><i class="fa fa-minus"></i></button></div>'
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
      //Changed parent("div") to parent().closest('div')
      e.preventDefault();
      $(this)
        .parent()
        .closest('div')
        .remove();
      x--;
    });
  };

  const companiesAddDynamic = function() {
    var companies_max_fields = 10; //maximum input boxes allowed
    var companies_wrapper = $('.companies_input_fields_wrap'); //Fields wrapper
    var companies_add_button = $('.add_companies_button'); //Add button ID
    var x = $('.companies-entry').length + 1; //initlal text box count

    $(companies_add_button).click(function(e) {
      //on add input button click
      e.preventDefault();
      if (x < companies_max_fields) {
        //max input box allowed
        x++; //text box increment
        $(companies_wrapper).append(
          '<div class="companies-entry"><input type="text" class="form-control" name="companiesWorked"/><button class="remove_companies btn btn-danger"><i class="fa fa-minus"></i></button></div>'
        );

        $(companies_wrapper)
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

    $(companies_wrapper).on('click', '.remove_companies', function(e) {
      //user click on remove text
      //Changed parent("div") to parent().closest('div')
      e.preventDefault();
      $(this)
        .parent()
        .closest('div')
        .remove();
      x--;
    });
  };

  skillsAddDynamic();
  companiesAddDynamic();

  $("input[name^='skills']").autocomplete({
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

  // Position Autocomplete
  $('#position').autocomplete({
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

  // Qualification Autocomplete
  $('#qualification').autocomplete({
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

  // Location Autocomplete
  $('#location').autocomplete({
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

  // Client Autocomplete
  $('#client').autocomplete({
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

  // Skills Autocomplete
  $('.skills').autocomplete({
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

  //Input filter function -- https://jsfiddle.net/emkey08/zgvtjc51
  function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }
  //Filter for salary - Integer -- >=0
  setInputFilter(document.getElementById("salary"), function(value) {
  return /^\d*$/.test(value); });
  //Filter for experience - Float -- >=0
  setInputFilter(document.getElementById("experience"), function(value) {
  return /^\d*[.]?\d*$/.test(value); });
  //Filter for candidate rating - Float -->=0
  setInputFilter(document.getElementById("candidateRating"), function(value) {
  return /^\d*[.]?\d*$/.test(value); });

});
