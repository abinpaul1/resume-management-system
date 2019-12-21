$(document).ready(function() {
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
      e.preventDefault();
      $(this)
        .parent('div')
        .remove();
      x--;
    });
  };

  const companiesAddDynamic = function() {
    var companies_max_fields = 10; //maximum input boxes allowed
    var companies_wrapper = $('.companies_input_fields_wrap'); //Fields wrapper
    var companies_add_button = $('.add_companies_button'); //Add button ID
    var x = 1; //initlal text box count

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
      e.preventDefault();
      $(this)
        .parent('div')
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

  //Location autocomplete
  $('#location').autocomplete({
    source: function(req, res) {
      $.ajax({
        url: '/api/candidate/list/autocomplete/location',
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
        $('#search-location').text(ui.item.label);
      }
    }
  });

  //Client autocomplete
  $('#client').autocomplete({
    source: function(req, res) {
      $.ajax({
        url: '/api/candidate/list/autocomplete/client',
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
        $('#search-client').text(ui.item.label);
      }
    }
  });

  //Qualification autocomplete
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

  // Position Autocomplete
  $('#position').autocomplete({
    source: function(req, res) {
      $.ajax({
        url: '/api/candidate/list/autocomplete/position',
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
});
