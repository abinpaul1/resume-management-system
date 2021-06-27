const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255
    },
    email: {
      type: String,
      max: 255,
      min: 6
    },
    position: {
      type: String,
      max: 255,
      min: 6,
      lowercase: true
    },
    experience: {
      type: Number,
      default: 0
    },
    qualification: {
      type: String
    },
    candidateRating: {
      type: Number
    },
    salary: {
      type: Number,
      default: 0
    },
    phone: {
      type: String
    },
    companiesWorked: {
      type: [String]
    },
    skills: {
      type: [String],
      lowercase: true
    },
    interviewFeedback: {
      type: String
    },
    resumeURL: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      required: true,
      default: 0
    },
    dob: {
      type: Date
    },
    location: {
      type: String
    },
    client: {
      type: String
    },
    uploadedBy: {
      type: String,
      max: 255,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Candidate', candidateSchema);
