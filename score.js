const fs = require('fs');
const papa = require('papaparse');
const file = fs.createReadStream('quiz-time.csv');
const answers = require('./q_and_a/answers.json');
const answersArray = Object.values(answers);

papa.parse(file, {
    worker: true,
    complete: calculateResults,
});

function calculateResults(rows) {
    // Remove the first row from the excel sheet as its the headings/questions
    const answerRows = rows.data.filter((row, index) => index !== 0);

    // Loop through each row and check if answers are correct or not
    answerRows.forEach(row => {
        const [ time, name, ...userAnswers ] = row;
        console.log(name);

        const correctAnswers = userAnswers.reduce((totalCorrect, answer, answerIndex) => {
            const formattedAnswer = convertToComparableString(answer);
            const correctAnswer = answersArray[answerIndex];
            const isCorrect = formattedAnswer === correctAnswer;

            // Uncomment the following code to see what is happening
            // console.log(`${answerIndex + 1}.`, answer);
            // console.log('  -> Converted:', formattedAnswer);
            // console.log('  ->    Answer:', correctAnswer);
            // console.log('  ->   Correct:', isCorrect);
            // console.log(' ');

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