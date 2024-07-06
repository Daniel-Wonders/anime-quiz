import React from "react";
import { decode } from 'html-entities';

export default function Question(props) {
    const randomIndex = Math.floor(Math.random() * 4);
    const decodedWrongAnswers = decode(props.wrongs);
    const decodedRightAnswer = decode(props.right);

    // Create a new array by concatenating the decoded right answer into wrong answers
    const answers = [...decodedWrongAnswers];
    answers.splice(randomIndex, 0, decodedRightAnswer);

    const [answersArr, setAnswersArr] = React.useState(answers);

    function handleRightAnswer() {
        console.log("right");
    }

    function handleWrongAnswer() {
        console.log("wrong");
    }

    const buttons = answersArr.map((answer, index) => {
        const isRight = index === randomIndex;
        return (
            <button className="btn" key={index} onClick={isRight ? handleRightAnswer : handleWrongAnswer}>
                {answer}
            </button>
        );
    });

    return (
        <div id="Question">
            <p>
                Question: {decode(props.ask)}
            </p>

            <div id="buttons">
                {buttons}
            </div>
        </div>
    );
}
