import React from 'react';
import { decode } from 'html-entities';
import he from 'he';

function Question(props) {
    const [isAnswered, setIsAnswered] = React.useState(false);
    const [answersArr, setAnswersArr] = React.useState([]);
    const [randomIndex,setRandomIndex] = React.useState(Math.floor(Math.random() * 4))

    React.useEffect(() => {
        //setRandomIndex(Math.floor(Math.random() * 4))
        const decodedWrongAnswers=props.wrongs.map((answer)=>{return (he.decode(answer))})//Had to decode each str
        const decodedRightAnswer = he.decode(props.right);

        //const rightAnswer = typeof decodedRightAnswer === 'string' ? decodedRightAnswer : console.log("soy el erroneao");

        // Create a new array by concatenating the decoded right answer into wrong answers
        const answers = [...decodedWrongAnswers];
        answers.splice(randomIndex, 0, decodedRightAnswer);


        setAnswersArr(answers);
    }, []); 

    function handleRightAnswer() {
        setIsAnswered(true);
        props.incrementCounter();
        props.incrementTotalCounter()
        
    }

    function handleWrongAnswer() {
        setIsAnswered(true);
        props.incrementTotalCounter()

    }

    const buttons = answersArr.map((answer, index) => {
        const isRight = index === randomIndex;

        let btnClass = "";
        if (isAnswered && isRight) {
            btnClass = "rightBtn";
        }

        return (
            <button
                className={"btn" + " " + btnClass}
                key={index}
                onClick={isRight ? handleRightAnswer : handleWrongAnswer}
                disabled={isAnswered}
            >
                {answer}
            </button>
        );
    });

    return (
        <div id="Question">
            <p>{he.decode(props.ask)}</p>

            <div id="buttons">{buttons}</div>
        </div>
    );
}

export default Question;
