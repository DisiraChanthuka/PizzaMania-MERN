const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({

    feedback: {type :String, required : true},
    userContact : {type : String,required : true},
    empID : {type : String,required : true}
    
     
},{
        timestamps : true,
    
});


const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;