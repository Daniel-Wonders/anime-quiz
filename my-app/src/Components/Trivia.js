import React from "react";
import Question from "./Question";

export default function Trivia(props){
    const [questions, setQuestions] = React.useState([]);
    const [fetchError, setFetchError] = React.useState(null);

    React.useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("https://opentdb.com/api.php?amount=5&category=31&type=multiple");
                if (!response.ok) {
                    props.crashed()
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setQuestions(data.results || []);
            } catch (error) {
                props.crashed()
                setFetchError(error.message);
            }
        };
    
        fetchQuestions();
    }, []);
    

    let counterColor=props.counter===0?"redCounter":"greenCounter"
    counterColor= props.counter===5 ? "goldenCounter":counterColor
  

    return (
        <div id="Trivia" className={props.dimmed?"dimmed":""}>
            <p id="correctCounter">
                YOU'VE ANSWERED CORRECTLY &nbsp;
                <span id={counterColor}>{props.counter}</span>
                /5 QUESTIONS
            </p>
            {fetchError ? (
                <div className="error">Error fetching data: {fetchError}</div>
            ) : (
                questions.length > 0 ? (
                    questions.map((question, index) => (
                        <Question
                            key={index}
                            ask={question.question}
                            right={question.correct_answer}
                            wrongs={question.incorrect_answers}
                            incrementCounter={props.incrementCounter}
                            incrementTotalCounter={props.incrementTotalCounter}
                        />
                    ))
                ) : (
                    <img src={process.env.PUBLIC_URL+`/loading.svg`} />
                )
            )}
        </div>
    );
}
