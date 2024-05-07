const express = require('express');
const questionController = require('../controllers/questions_controller');
const questionRouter = express.Router();

// questionRouter.get('/list',questionController.logLeetcodeQuestions);
questionRouter.get('/:id',questionController.getAQuestionById);
questionRouter.get('/', questionController.getListOfQuestions);
questionRouter.post('/', questionController.createAQuestion);
questionRouter.put('/:id', questionController.updateQuestion);
questionRouter.delete('/:id', questionController.deleteQuestionEntry);

module.exports = {
    questionRouter : questionRouter
}

