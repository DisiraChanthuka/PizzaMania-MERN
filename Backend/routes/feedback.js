const router = require('express').Router();
const { response } = require('express');
let Feedback = require("../models/feedback.model");

const {
    addFeedback,
    getFeedbacks,
    updateFeedback,
    getFeedbackById,
    deleteFeedback,
    FeedbackWithCustomer,
    FeedbackWithEmployee,
   
  } = require("../controller/feedback.controller");

  router.post("/", addFeedback);

  router.get("/", getFeedbacks);

  router.get("/:id", getFeedbackById);

  router.put("/:id", updateFeedback);

  router.delete("/:id", deleteFeedback);

  router.post('/getFeedbackWithUser', FeedbackWithCustomer)

  router.post('/getFeedbackWithEmployee', FeedbackWithEmployee)

module.exports = router;