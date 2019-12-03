const router = require('express').Router();
const User = require('../models/candidate');

router.post('/register', async (req, res) => {
  // Checing if the user exits in DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send('Email already exits');
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
    position: req.body.position,
    yearsOfService: req.body.yearsOfService,
    qualification: req.body.qualification,
    candidateRating: req.body.candidateRating,
    salary: req.body.salary,
    phone: req.body.phone,
    companiesWorked: req.body.companiesWorked,
    skills: req.body.skills,
    interviewFeedback: req.body.interviewFeedback
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
