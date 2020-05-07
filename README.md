# Quiz Marking Tool

## Features

- Marks and displays quiz results that have been collected via Google Forms.

- Checks for the 'distance' between two strings rather than for spelling mistakes. The sensitivity has been set to a degree of 3.

```
E.g. 'kitten -> sitting' has a distance of 3 as three changes are required to transform the word
'kitten' to 'sitting'.
```

- Allows blacklisting of specific words in responses. This is useful if you have an answer that is spelt similarly to another word.

```
E.g. If the correct answer to a question is 'Thursday' and a user response is 'Tuesday',
the distance between the words is a factor of 2, so this response would be marked as correct.
In this case, 'Tuesday' would need to be blacklisted as an incorrect answer so ensure
that it is not marked as correct.
```

## Usage

- `npm install`
- Enter your correct quiz answers to this project in the file `/q_and_a/answer-key.json`. Answers should be all lower case with no punctuation or spaces. E.g. Donald's Trump = donaldstrump. You may add as many question/answers as you like.
- Download Google Forms answer set as a csv file and save as `answers.csv`. Ensure that the Google Form is not in it's Quiz setting - use a normal form.
- Import your `answers.csv` file into this project.
- To start the application, run `npm start`. This will display your players names and their results in the terminal.

## Next Iterations

1. Option to add multiple correct answers.
2. Front end for displaying results.
