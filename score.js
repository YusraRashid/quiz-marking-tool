const fs = require('fs');
const papa = require('papaparse');
const file = fs.createReadStream('answers.csv');
const answers = require('./q_and_a/answer-key.json');
const answersArray = Object.values(answers);

papa.parse(file, {
    worker: true,
    complete: calculateAndDisplayResults,
});

function calculateResults(rows) {
    let scores = [];
    const answerRows = rows.data.filter((row, index) => index !== 0);

    answerRows.forEach(row => {
        const [ time, name, ...userAnswers ] = row;

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

        return scores.push({'name': name,
        'score': correctAnswers});
        
    });
    return scores;
}

function convertToComparableString(answer) {
    return answer
        .replace(/[.,\/#!$%\^&\*’';:{}=\-_`~()]/g, '')
        .replace(/\s+/g, '')
        .toLowerCase();
}

function sortResults(scores) {
    const sortedScores = scores.sort(function(a, b) {
        return (b.score - a.score)
    })
    console.log(sortedScores);
}

function calculateAndDisplayResults(rows) {
    const scores = calculateResults(rows);
    sortResults(scores);

    return;
}
