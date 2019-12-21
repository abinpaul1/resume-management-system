const router = require('express').Router();
const Position = require('../models/position');
const Skills = require('../models/skills');
const Qualification = require('../models/qualification');
const Location = require('../models/location');
const Client = require('../models/client');

// Autocomplete position API
router.get('/list/autocomplete/position', function(req, res, next) {
  // console.log('entered');
  const regex = new RegExp(req.query['term'], 'i');
  // console.log('entered');
  const userFilter = Position.find({ position: regex }, { position: 1 }).limit(
    20
  );
  userFilter.exec(function(err, data) {
    // console.log(data);
    const result = [];
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach(user => {
          const obj = {
            id: user._id,
            label: user.position
          };
          result.push(obj);
        });
      }
      // console.log(result);
      res.jsonp(result);
    }
  });
});

// Autocomplete skills API
router.get('/list/autocomplete/skills', function(req, res, next) {
  // console.log('entered');
  const regex = new RegExp(req.query['term'], 'i');
  // console.log('entered');
  const userFilter = Skills.find({ skill: regex }, { skill: 1 }).limit(20);
  userFilter.exec(function(err, data) {
    // console.log(data);
    const result = [];
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach(user => {
          const obj = {
            id: user._id,
            label: user.skill
          };
          result.push(obj);
        });
      }
      // console.log(result);
      res.jsonp(result);
    }
  });
});

// Autocomplete qualification API
router.get('/list/autocomplete/qualification', function(req, res, next) {
  // console.log('entered');
  const regex = new RegExp(req.query['term'], 'i');
  // console.log('entered');
  const userFilter = Qualification.find(
    { qualification: regex },
    { qualification: 1 }
  ).limit(20);
  userFilter.exec(function(err, data) {
    // console.log(data);
    const result = [];
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach(user => {
          const obj = {
            id: user._id,
            label: user.qualification
          };
          result.push(obj);
        });
      }
      // console.log(result);
      res.jsonp(result);
    }
  });
});

// Autocomplete location API
router.get('/list/autocomplete/location', function(req, res, next) {
  // console.log('entered');
  const regex = new RegExp(req.query['term'], 'i');
  // console.log('entered');
  const userFilter = Location.find(
    { location: regex },
    { location: 1 }
  ).limit(20);
  userFilter.exec(function(err, data) {
    // console.log(data);
    const result = [];
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach(user => {
          const obj = {
            id: user._id,
            label: user.location
          };
          result.push(obj);
        });
      }
      // console.log(result);
      res.jsonp(result);
    }
  });
});

// Autocomplete client API
router.get('/list/autocomplete/client', function(req, res, next) {
  // console.log('entered');
  const regex = new RegExp(req.query['term'], 'i');
  // console.log('entered');
  const userFilter = Client.find(
    { client: regex },
    { client: 1 }
  ).limit(20);
  userFilter.exec(function(err, data) {
    // console.log(data);
    const result = [];
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach(user => {
          const obj = {
            id: user._id,
            label: user.client
          };
          result.push(obj);
        });
      }
      // console.log(result);
      res.jsonp(result);
    }
  });
});

module.exports = router;
