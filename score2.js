const fs = require('fs');
const papa = require('papaparse');
const levenshtein = require('js-levenshtein');
const file = fs.createReadStream('answers.csv');
const answers = require('./q_and_a/answer-key.json');
const answersArray = Object.values(answers);

papa.parse(file, {
  worker: true,
  complete: calculateAndDisplayResults,
});

const calculateResults = (rows) => {
  const answerRows = rows.data.filter((row, index) => index !== 0);

  const scores = answerRows.map(row => {
    const [time, name, ...userResponses] = row;

    const correctAnswers = userResponses.reduce((totalCorrect, userResponse, answerIndex ) => {
      const formattedUserResponse = convertToComparableString(userResponse);
      

    }


  })
}

const convertToComparableString = (answer) => answer
    .replace(/[.,\/#!$%\^&\*’';:{}=\-_`~()]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase();
