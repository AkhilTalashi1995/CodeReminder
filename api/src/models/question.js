const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question_id: {
        type: Number,
        required: true,
    },
    // For now the question_frontend_id is given by the user as input
    question_frontend_id: {
        type: Number,
        required: true,
    },
    question_title: {
        type: String,
        required: true,
    },
    question_title_slug: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
    },
    num_solved:{
        type: Number,
        required: true,
    }
    // question_url:{
    //     type: String,
    //     required: true
    // }
})


const transformJSON = (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
}

questionSchema.methods.activate = function () {
    this.active = true;
}

questionSchema.set("toJSON", {transform: transformJSON});

const Question = mongoose.model("Question", questionSchema);

module.exports = {
    Question: Question
}