require("dotenv").config();
const cheerio = require("cheerio");
const questionService = require("../services/questions_service");

// const logLeetcodeQuestions = async (request, response) => {

//   try {
//     const questionsResponse = await axios.get('https://leetcode.com/api/problems/algorithms/', {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36',
//         'Cookie': 'your_cookie_value_here'
//       }
//     });
//     const html = await questionsResponse.text();

//     if (html) {
//         const $ = cheerio.load(html);
//         console.log($('body').text());
//         return response.status(200);
//     } else {
//       return response
//         .status(403)
//         .json({ "message": "Questions not available. Try later." });
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return response.status(500).json({ error: "Internal Server Error" });
//   }
// };

const logLeetcodeQuestions = async (request, response) => {
  try {
    const questionsResponse = await axios.get(
      "https://leetcode.com/api/problems/algorithms/",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          Accept: "application/json,text/plain,text/html,*/*",
          "Accept-Language": "en-US,en;q=0.5",
          Referer: "https://www.google.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Content-Security-Policy":
            "frame-ancestors 'self' https://*.leetcode.com https://leetcode.com https://www.growingio.com https://challenges.cloudflare.com",
        },
      }
    );

    const $ = cheerio.load(questionsResponse.data);
    const bodyText = $("body").text();

    // Assuming the JSON is the entire body text
    let jsonData;
    try {
      jsonData = JSON.parse(bodyText);
    } catch (error) {
      console.error("Error parsing JSON from body text:", error);
      throw error;
    }

    console.log(jsonData);

    // Process data as needed
    return response.status(200).json(jsonData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

const getAQuestionById = async (request, response) => {
  const id = request.params.id;
  try {
    const data = await questionService.getQuestionById(id);
    if (data) {
      response.status(200).json(data);
    } else {
      response.status(404).json({ message: "Question cannot be found" });
    }
  } catch (error) {
    response.status(503).json({
      message: "Service currently unavailable. Please try again later.",
    });
  }
};

const getListOfQuestions = async (request, response) => {
  try {
    const data = await questionService.getAllQuestions();
    response.status(200).json(data);
  } catch (error) {
    response.status(503).json({
      message: "Service currently unavailable. Please try again later.",
    });
  }
};

const createAQuestion = async (request, response) => {
  const body = request.body;
  try {
    const questionExists = await questionService.getQuestionByFrontendId(
      body.question_frontend_id
    );
    if (questionExists) {
      response
        .status(400)
        .json({ message: "Question already exists! Please add a new one!" });
    } else {
      const data = await questionService.saveQuestion({
        ...body
      });
      response.status(201).json(data);
    }
  } catch (error) {
    console.log(error);
    response.status(503).json({
      message: "Service currently unavailable. Please try again later.",
    });
  }
};

const deleteQuestionEntry = async (request, response) => {
  const key = request.params.id;
  try {
    const questionExists = await questionService.getQuestionById(key);
    if (questionExists) {
      const data = await questionService.deleteQuestion(key);
      response.status(204).json({ message: "Question deleted successfully!" });
    } else {
      response.status(404).json({ errorMessage: "Question cannot be found" });
    }
  } catch (error) {
    console.log(error);
    response.status(503).json({
      message: "Service currently unavailable. Please try again later.",
    });
  }
};

const updateQuestion = async (request, response) => {
  const key = request.params.id;
  const body = request.body;
  console.log(body);
  try {
    const questionExists = await questionService.getQuestionById(key);
    if (questionExists) {
      const data = await questionService.updateQuestion(
        {
          question_frontend_id: body.question_frontend_id,
          question_title: body.question_title,
          question_title_slug: body.question_title_slug,
          difficulty: body.difficulty,
          num_solved: body.num_solved,
        },
        key
      );
      response.status(200).json(data);
    } else {
      response.status(404).json({ errorMessage: "Question cannot be found" });
    }
  } catch (error) {
    console.log(error);
    response
      .status(503)
      .json({ errorMessage: "Service currently unavailable" });
  }
};

module.exports = {
  logLeetcodeQuestions: logLeetcodeQuestions,
  getAQuestionById: getAQuestionById,
  getListOfQuestions: getListOfQuestions,
  createAQuestion: createAQuestion,
  deleteQuestionEntry: deleteQuestionEntry,
  updateQuestion: updateQuestion
};
