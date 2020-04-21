const fs = require('fs');
const papa = require('papaparse');
const file = fs.createReadStream('answers.csv');
const answers = require('./q_and_a/answer-key.json');
const answersArray = Object.values(answers);

papa.parse(file, {
    worker: true,
    complete: calculateResults,
});

function calculateResults(rows) {
    const answerRows = rows.data.filter((row, index) => index !== 0);

    answerRows.forEach(row => {
        const [ time, name, ...userAnswers ] = row;
        console.log(name);

        const correctAnswers = userAnswers.reduce((totalCorrect, answer, answerIndex) => {
            const formattedAnswer = convertToComparableString(answer);
            const correctAnswer = answersArray[answerIndex];
            const isCorrect = formattedAnswer === correctAnswer;

            if (isCorrect) {
                return totalCorrect + 1;
            } else {
                return totalCorrect;
            }
        }, 0);

        console.log(`Total Correct for ${name}:`, correctAnswers);
        console.log(' ');
    });

}

function convertToComparableString(answer) {
    return answer
        .replace(/[.,\/#!$%\^&\*’';:{}=\-_`~()]/g, '')
        .replace(/\s+/g, '')
        .toLowerCase();
}