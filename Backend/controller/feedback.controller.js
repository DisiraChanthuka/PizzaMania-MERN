const Feedback = require("../models/feedback.model");

const addFeedback = async (req, res) => {
    const { feedback, userContact, empID} =
      req.body;
  
    const newfeedback = new Feedback({
        feedback,
        userContact,
        empID,
    });
  
    await newfeedback
      .save()
      .then(() => res.json('Feedback added!'))
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const getFeedbacks = async (req, res) => {
    try {
      const feedback = await Feedback.find();
      res.json(feedback);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const getFeedbackById = async (req, res) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
      res.json(feedback);
    } catch (error) {
      res.status(500).send("Server Error" + error);
    }
  };

  const updateFeedback = async (req, res) => {
    Feedback.findByIdAndUpdate(req.params.id)
      .then((existingFeedback) => {
        existingFeedback.feedback = req.body.feedback;
        existingFeedback.userContact = req.body.userContact;
        existingFeedback.empID = req.body.empID;
        
        
        existingFeedback
          .save()
          .then(() => res.json('Feedback updated!'))
          .catch((error) => res.status(400).json("Error: " + error));
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };
  
  const deleteFeedback = async (req, res) => {
    Feedback.findByIdAndDelete(req.params.id)
      .then((deletedFeedback) => {
        res.json('Feedback deleted');
      })
      .catch((error) => res.status(400).json("Error: " + error));
  };

  const FeedbackWithCustomer = async (req,res) => {
    const feedbackData = await Feedback.find({_id:req.body.user}).populate('userContact');
  
    res.send(feedbackData);
  };

  const FeedbackWithEmployee = async (req,res) => {
    const feedbackData = await Feedback.find({_id:req.body.emp}).populate('empID');
  
    res.send(feedbackData);
  };
  
  module.exports = {
    addFeedback,
    getFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
    FeedbackWithCustomer,
    FeedbackWithEmployee,
   
  }