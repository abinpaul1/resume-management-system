// Import libraries
const router = require('express').Router();
const bcrypt = require('bcryptjs');

// Import Models
const Candidate = require('../models/candidate');
const Position = require('../models/position');
const Skills = require('../models/skills');
const Qualification = require('../models/qualification');
const Admin = require('../models/admin');

// Import Validation
const {
  registerValidation,
  adminRegisterValidation,
  adminLoginValidation
} = require('../validation/validation');


router.post('/adminreg', async (req, res) => {
  console.log(req.body);
  const { error } = adminRegisterValidation(req.body);
  if (error) {
    return res.render('admin', { adError: error, adSuccess: '' });
  }

  const emailExist = await Admin.findOne({ email: req.body.email });
  if (emailExist) {
    return res.render('admin', {
      adError: 'Email already exists',
      adSuccess: ''
    });
  }

  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try {
    const savedAdmin = await admin.save();
    return res.render('admin', {
      adError: '',
      adSuccess: 'Sucessfully Registered'
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/adminlogin', async (req, res) => {
  console.log(req.session);
  const { error } = adminLoginValidation(req.body);
  if (error) {
    return res.render('admin', { adError: error, adSuccess: '' });
  }
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    return res.render('admin', {
      adError: 'No account is linked with the entered email',
      adSuccess: ''
    });
  }
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) {
    return res.render('admin', { adError: 'Password Invalid', adSuccess: '' });
  }

  req.session.userId = req.body.email;
  res.redirect('/api/candidate/list');
});

function checkLogin(req, res, next) {
  if (!req.session.userId){
    return res.render('loginerror');
  }
  next();
}

router.get('/adminlogout', checkLogin, function(req, res) {
  console.log(req.session)
  req.session.destroy(err =>{
    if (err){
      return res.send(err) //Check immmminent problem
    }
    res.clearCookie(process.env.SESSION_NAME)
    res.render('admin', { adError: '', adSuccess: 'Logout successful' });
  })
});

router.get('/sort/:x', checkLogin, function(req, res, next) {
  //Getting data from session cookie
  let filterParameter = JSON.parse(req.session.filterParameter)
  let sortParameter = JSON.parse(req.session.sortParameter)
  let set_status = req.session.set_status
  let ascFlag = req.session.ascFlag
  let descFlag = req.session.descFlag

  const { x } = req.params;
  if (sortParameter[x] === 1) {
    descFlag = 1;
    ascFlag = 0;
    // console.log('previously set as 1');
  } else if (sortParameter[x] === undefined || sortParameter[x] === -1) {
    ascFlag = 1;
    descFlag = 0;
  }
  sortParameter = {};
  // console.log(x);
  if (ascFlag === 1) {
    sortParameter[x] = 1;
    // console.log('ascending');
  } else if (descFlag === 1) {
    sortParameter[x] = -1;
    // console.log('descending');
  }
  //Updating session cookie
  console.log(sortParameter);
  req.session.ascFlag = ascFlag;
  req.session.descFlag = descFlag;
  req.session.sortParameter = JSON.stringify(sortParameter)

  const perPage = 3;
  const page = req.params.page || 1;
  Candidate.find(filterParameter)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort(sortParameter)
    .exec(function(err, data) {
      if (err) throw err;
      Candidate.countDocuments(filterParameter).exec((err, count) => {
        res.render('list', {
          records: data,
          select_status: set_status,
          error: '',
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
});

// index page
router.get('/', checkLogin, async (req, res) => {
  res.render('insert_users', { success: '', error: '' });
});

// Register API
router.post('/register', checkLogin, async (req, res) => {
  // Check validation of phone, email
  const { error } = registerValidation(req.body);
  if (error) {
    return res.render('insert_users', {
      success: '',
      error: error.details[0].message
    });
  }
  // Checking if the candidate exits in DB
  const emailExist = await Candidate.findOne({ email: req.body.email });
  if (emailExist) {
    return res.render('insert_users', {
      success: '',
      error: 'Email already exists'
    });
  }

  /* One thing to note here is the request we get from input html form maybe array/string (for skills and companies worked).
  If multiple inputs of the same name send request it will be an array, if only one input
  with the name send request, it will be a string. Hence the if-else conditions below for
  "multiple-input-cased" inputs */

  let companiesWorkedArray = req.body.companiesWorked;
  let skillsArray = req.body.skills;

  // For skills
  if (skillsArray) {
    if (typeof skillsArray === 'object') {
      skillsArray = skillsArray
        .map(item => {
          return item.trim().toLowerCase();
        })
        .filter(Boolean);
    } else {
      skillsArray = [skillsArray.trim().toLowerCase()];
    }
  } else {
    // For empty input
    skillsArray = [];
  }

  // For companies worked
  if (companiesWorkedArray) {
    if (typeof req.body.companiesWorked === 'object') {
      companiesWorkedArray = req.body.companiesWorked
        .map(item => {
          return item.trim();
        })
        .filter(Boolean);
    } else {
      companiesWorkedArray = [req.body.companiesWorked.trim()];
    }
  } else {
    // For empty input
    companiesWorkedArray = [];
  }

  // For position
  let { position } = req.body;
  if (position) position = position.toLowerCase();

  // For Qualification
  let { qualification } = req.body;
  if (qualification) qualification = qualification.toLowerCase();

  const candidate = new Candidate({
    name: req.body.name,
    email: req.body.email,
    position: position,
    experience: req.body.experience,
    qualification: qualification,
    candidateRating: req.body.candidateRating,
    salary: req.body.salary,
    phone: req.body.phone,
    companiesWorked: companiesWorkedArray,
    skills: skillsArray,
    interviewFeedback: req.body.interviewFeedback,
    resumeURL: req.body.resumeURL
  });

  await candidate
    .save()
    .then(async function() {
      // Checking and inserting into position collection
      const candidatePosition = candidate['position'];
      if (candidatePosition) {
        const positionExist = await Position.findOne({
          position: candidatePosition
        });
        if (!positionExist) {
          const pos = new Position({
            position: candidatePosition
          });
          pos.save();
        }
      }

      // Checking and inserting into skills collection
      const candidateSkills = candidate['skills'];
      if (candidateSkills) {
        candidateSkills.forEach(async skill => {
          const skillsExist = await Skills.findOne({ skill: skill });
          if (!skillsExist) {
            const new_skill = new Skills({
              skill: skill
            });
            new_skill.save();
          }
        });
      }

      // Checking and inserting into qualification collection
      const candidate_qualification = candidate['qualification'];
      if (candidate_qualification) {
        const qualificationExist = await Qualification.findOne({
          qualification: candidate_qualification
        });
        if (!qualificationExist) {
          const new_qualification = new Qualification({
            qualification: candidate_qualification
          });
          new_qualification.save();
        }
      }

      return res.render('insert_users', {
        success: 'Record inserted successfully',
        error: ''
      });
    })
    .catch(err => res.render('insert_users', {success:"",error:err}) );
});

// View candidates
router.get('/list', checkLogin, (req, res) => {
  let set_status = req.session.set_status
  let filterParameter = {};
  let sortParameter = {};
  const perPage = 3;
  const page = req.params.page || 1;

  //Update session cookie here
  req.session.filterParameter = JSON.stringify(filterParameter)
  req.session.sortParameter = JSON.stringify(sortParameter)

  console.log(filterParameter)
  Candidate.find(filterParameter)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort(sortParameter)
    .exec(function(err, data) {
      if (err) throw err;
      Candidate.estimatedDocumentCount({}).exec((err, count) => {
        res.render('list', {
          records: data,
          select_status: set_status,
          error: '',
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
});

router.get('/list/:page', checkLogin, function(req, res, next) {
  let filterParameter = JSON.parse(req.session.filterParameter)
  let sortParameter = JSON.parse(req.session.sortParameter)
  let set_status = req.session.set_status

  const perPage = 3;
  const page = req.params.page || 1;

  console.log(filterParameter)
  Candidate.find(filterParameter)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort(sortParameter)
    .exec(function(err, data) {
      if (err) throw err;
      Candidate.countDocuments(filterParameter).exec((err, count) => {
        res.render('list', {
          records: data,
          select_status: set_status,
          error: '',
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
});

// Delete API
router.get('/delete/:id', checkLogin, async (req, res) => {
  const { id } = req.params;
  const del = Candidate.findByIdAndDelete(id);
  del.exec(err => {
    if (err) throw err;
    res.redirect('/api/candidate/list');
  });
});

// Edit API
router.get('/edit/:id', checkLogin, async (req, res) => {
  const { id } = req.params;
  const edit = Candidate.findById(id);
  edit.exec((err, data) => {
    if (err) throw err;
    res.render('edit', { records: data, success: '', error: '' });
  });
});

// Search-Filter API
router.post('/search', checkLogin, function(req, res, next) {
  filterParameter = {};
  sortParameter = {};
  let set_status = req.session.set_status

  const filterPosition = req.body.filterposition;
  const filterName = req.body.filtername;
  const filterQualification = req.body.filterqualification;

  // Taking skill as array
  let filterSkill = req.body.filterskill;
  console.log(typeof filterSkill);
  if (typeof filterSkill === 'object') {
    filterSkill = filterSkill
      .map(item => {
        return item.trim().toLowerCase();
      })
      .filter(Boolean);
  } else {
    filterSkill = [filterSkill.trim().toLowerCase()];
  }

  // Taking min and max exerience
  const filterExp = {};
  if (
    req.body.filterExpMin !== null &&
    req.body.filterExpMin !== '' &&
    req.body.filterExpMin !== undefined &&
    !isNaN(req.body.filterExpMin)
  )
    filterExp.$gte = req.body.filterExpMin;
  if (
    req.body.filterExpMax !== null &&
    req.body.filterExpMax !== '' &&
    req.body.filterExpMax !== undefined &&
    !isNaN(req.body.filterExpMax)
  )
    filterExp.$lte = req.body.filterExpMax;

  // Taking min and max salay
  const filterSal = {};
  if (
    req.body.filterSalMin !== null &&
    req.body.filterSalMin !== '' &&
    req.body.filterSalMin !== undefined &&
    !isNaN(req.body.filterSalMin)
  )
    filterSal.$gte = req.body.filterSalMin;
  if (
    req.body.filterSalMax !== null &&
    req.body.filterSalMax !== '' &&
    req.body.filterSalMax !== undefined &&
    !isNaN(req.body.filterSalMax)
  )
    filterSal.$lte = req.body.filterSalMax;

  if (req.body.filterposition !== '') filterParameter.position = filterPosition;
  if (req.body.filterskill !== '' && Object.entries(filterSkill).length !== 0)
    filterParameter.skills = { $all: filterSkill };
  if (Object.entries(filterExp).length !== 0)
    filterParameter.experience = filterExp;
  if (Object.entries(filterSal).length !== 0)
    filterParameter.salary = filterSal;
  if (req.body.filtername !== '') {
    name_obj = {}
    name_obj.$regex = req.body.filtername;
    name_obj.$options = "i";
    filterParameter.name = name_obj;
  }
  if (req.body.filterqualification !== '') {
    qualification_obj = {}
    qualification_obj.$regex = req.body.filterqualification;
    qualification_obj.$options = "i";
    filterParameter.qualification = qualification_obj;
  }
  console.log(req.body);
  if (req.body.selectStatus == 1 || req.body.selectStatus == 0) {
    filterParameter.status = req.body.selectStatus;
    set_status = req.body.selectStatus;
  } else filterParameter.status = set_status;

  //Update session cookie here
  req.session.filterParameter = JSON.stringify(filterParameter)
  req.session.sortParameter = JSON.stringify(sortParameter)
  req.session.set_status = set_status

  console.log(filterParameter)
  const perPage = 3;
  const page = req.params.page || 1;
  const candidateFilter = Candidate.find(filterParameter)
    .skip(perPage * page - perPage)
    .limit(perPage)
    .sort(sortParameter)
    .exec(function(err, data) {
      if (err) throw err;
      if (data.length != 0) {
        res.redirect('../candidate/list/1');
      } else {
        console.log('Data is empty');
        res.render('list', {
          records: [],
          select_status: set_status,
          error: '',
          current: 0,
          pages: 0
        });
      }
    });
});

module.exports = router;
