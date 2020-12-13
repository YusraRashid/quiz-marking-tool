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
    let scores = [];
    const answerRows = rows.data.filter((index) => index !== 0);

    const test = answerRows.map(row => {
        const [, name, ...userResponses ] = row;

        const correctAnswers = userResponses.reduce((totalCorrect, userResponse, answerIndex) => {
            const formattedUserResponse = convertToComparableString(userResponse);
            const correctAnswer = answersArray[answerIndex].answer;
            const incorrectAnswers = answersArray[answerIndex].incorrectAnswers;
            const distanceBetweenWords = levenshtein(correctAnswer, formattedUserResponse);
            const isCorrect = distanceBetweenWords < 3 && !incorrectAnswers.includes(formattedUserResponse);
            
            return isCorrect ? totalCorrect + 1 : totalCorrect  
        }, 0);
        console.log(correctAnswers);
        return {name, correctAnswers};
    });
    return test;
}

const convertToComparableString = (answer) => answer
    .replace(/[.,\/#!$%\^&\*’';:{}=\-_`~()]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase();

const sortedResults = (scores) => scores.sort((a, b) => (b.score - a.score));

function calculateAndDisplayResults(rows) {
    const scores = calculateResults(rows);
    const leaderBoard = sortedResults(scores);
    console.log(leaderBoard);
}
