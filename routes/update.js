const router = require('express').Router();
const Candidate = require('../models/candidate');
const Position = require('../models/position');
const Skills = require('../models/skills');
const Qualification = require('../models/qualification');
const Location = require('../models/location');
const Client = require('../models/client');
const { registerValidation } = require('../validation/validation');

function checkLogin(req, res, next) {
  if (!req.session.userId){
    return res.redirect('/');
  }
  next();
}

//Update API
router.post('/update', checkLogin, function (req, res) {
  Candidate.findById(req.body.candidate_id, async function(err, candidate) {
    id = req.body.candidate_id;
    let current_record = await Candidate.findById(id);

    if (err){
      return res.render('edit', {
        records: current_record,
        success: '',
        error: err
      });
    }

    // Check validation of email
    const { error } = registerValidation(req.body);
    if (error) {
      return res.render('edit', {
        records: current_record,
        success: '',
        error: error.details[0].message
      });
    }

    if (req.body.name==""){
      //Issue : Error code ??
      return res.render('edit', {
        records: current_record,
        success: '',
        error: 'Name cannot be blank'
      });
    }


    //Checking and inserting into positions collection --  only if old position is modified
    let candidate_position_present = candidate.position;
    let candidate_position_new = req.body.position;
    if (candidate_position_new){
      candidate_position_new = candidate_position_new.toLowerCase();
      if (candidate_position_present != candidate_position_new) {
        const positionExist = await Position.findOne({
          position: candidate_position_new
        });
        if (!positionExist) {
          const pos = new Position({
            position: candidate_position_new
          });
          pos.save();
        }
      }
    }

    // Checking and inserting into qualification collection
    let candidate_qualification_present = candidate.qualification;
    let candidate_qualification_new = req.body.qualification;
    if (candidate_qualification_new) {
      candidate_qualification_new = candidate_qualification_new.toLowerCase();
      if (candidate_qualification_present != candidate_qualification_new){
        const qualificationExist = await Qualification.findOne({
          qualification: candidate_qualification_new
        });
        if (!qualificationExist) {
          const new_qualification = new Qualification({
            qualification: candidate_qualification_new
          });
          new_qualification.save();
        }
      }
    }

    // Checking and inserting into client collection
    let candidate_client_present = candidate.client;
    let candidate_client_new = req.body.client;
    if (candidate_client_new) {
      candidate_client_new = candidate_client_new.toLowerCase();
      if (candidate_client_present != candidate_client_new){
        const clientExist = await Client.findOne({
          client: candidate_client_new
        });
        if (!clientExist) {
          const new_client = new Client({
            client: candidate_client_new
          });
          new_client.save();
        }
      }
    }

    // Checking and inserting into location collection
    let candidate_location_present = candidate.location;
    let candidate_location_new = req.body.location;
    if (candidate_location_new) {
      candidate_location_new = candidate_location_new.toLowerCase();
      if (candidate_location_present != candidate_location_new){
        const locationExist = await Location.findOne({
          location: candidate_location_new
        });
        if (!locationExist) {
          const new_location = new Location({
            location: candidate_location_new
          });
          new_location.save();
        }
      }
    }

    // Checking and inserting into skills collection --only if skills array has been modified
    let candidate_skills_present = candidate.skills;
    let candidate_skills_new = req.body.skills;

    if(candidate_skills_new){
      if (typeof candidate_skills_new === 'object') {
        candidate_skills_new = candidate_skills_new.map(item => {
          return item.trim().toLowerCase();
        }).filter(Boolean);
      } else {
        candidate_skills_new = [candidate_skills_new.trim().toLowerCase()];
      }
      let skill;
      for (skill of candidate_skills_new) {
        if (!candidate_skills_present.includes(skill)){
          const skillsExist = await Skills.findOne({ skill: skill });
          if (!skillsExist) {
            const new_skill = new Skills({
              skill: skill
            });
            new_skill.save();
          }
        }
      }
    }
    else{
      //For empty input
      candidate_skills_new = []
    }


    //Processing companiesWorkedArray
    let companiesWorkedArray = req.body.companiesWorked;
    if (companiesWorkedArray){
      if (typeof companiesWorkedArray === 'object') {
        companiesWorkedArray = companiesWorkedArray.map(item => {
          return item.trim();
        }).filter(Boolean);
      } else {
        companiesWorkedArray = [companiesWorkedArray.trim()];
      }
    }
    else{
      //For empty input
      companiesWorkedArray = []
    }

    //Update candidate info here except date, resume-url
    candidate.name = req.body.name;
    candidate.email = req.body.email;
    candidate.position = candidate_position_new;
    if(req.body.experience)
      candidate.experience = req.body.experience;
    else
      candidate.experience = 0;
    candidate.qualification = candidate_qualification_new;
    candidate.candidateRating = req.body.candidateRating;
    if(req.body.salary)
      candidate.salary = req.body.salary;
    else
      candidate.salary = 0;
    candidate.phone = req.body.phone;
    candidate.companiesWorked = companiesWorkedArray;
    candidate.skills = candidate_skills_new;
    candidate.interviewFeedback = req.body.interviewFeedback;
    candidate.status = req.body.status;
    candidate.dob = req.body.dob;
    candidate.location = candidate_location_new;
    candidate.client = candidate_client_new;

    // save the candidate
    candidate.save(function(err) {
      if (err){
        return res.render('edit', {
          records: current_record,
          success: '',
          error: err.message
        });
      }
      res.send("Succesfully updated");
    });
  });
});

module.exports = router;
