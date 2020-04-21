# Quiz Marking Tool

## Description

Marks and displays quiz results that have been collected via Google Forms.

## Usage

* `npm install`
* Enter your correct quiz answers to this project in the file `/q_and_a/answer-key.json`. Answers should be all lower case with no punctuation or spaces. E.g. Donald's Trump = donaldstrump. You may add as many question/answers as you like.
* Download Google Forms answer set as a csv file and save as `answers.csv`. Ensure that the Google Form is not in it's Quiz setting - use a normal form.
* Copy your `answers.csv` file into this project.
* To start the application, run `node score.js` in your terminal. This will display your players names and their results in the terminal.

## Next Iterations

1. Display results in order.
2. Accommodate for spelling mistakes.