require("dotenv").config();
const { Question } = require("../models/question");

const logLeetcodeQuestions = async () => {
  const response = await fetch(process.env.LEETCODE_URL);
  const questions = await response.json();
  console.log(questions);
};

const getQuestionById = async (id) => {
  return await Question.findOne({
    question_id: id,
  });
};

const getQuestionByFrontendId = async (frontendId) => {
  return await Question.findOne({
    question_frontend_id: frontendId,
  });
};

const getAllQuestions = async () => {
  return await Question.find();
};

const saveQuestion = async (questionData) => {
  const question = new Question({
    ...questionData,
  });
  return await question.save();
};

const updateQuestion = async (questionData, id) => {
  const questionUpdated = Question.findOneAndUpdate(
    { question_id: id },
    {
      question_frontend_id: questionData.question_frontend_id,
      question_title: questionData.question_title,
      question_title_slug: questionData.question_title_slug,
      difficulty: questionData.difficulty,
      num_solved: questionData.num_solved,
    }
  );
  return questionUpdated;
};

const deleteQuestion = async (id) => {
  const deletedQuestion = Question.deleteOne({
    question_id: id,
  });
  return deletedQuestion;
};

module.exports = {
  logLeetcodeQuestions: logLeetcodeQuestions,
  getQuestionById: getQuestionById,
  getAllQuestions: getAllQuestions,
  saveQuestion: saveQuestion,
  updateQuestion: updateQuestion,
  deleteQuestion: deleteQuestion,
  getQuestionByFrontendId: getQuestionByFrontendId,
};
