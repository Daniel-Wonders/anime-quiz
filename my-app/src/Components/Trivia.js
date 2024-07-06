import React from "react";
import Question from "./Question";

export default function Trivia(){
    const [questions,setQuestions]=React.useState([])

    React.useEffect(() => {
        console.log("Fetching questions...");
        const fetchQuestions = async () => {
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=5&category=31&type=multiple");
            const data = await response.json();
            handleData(data)
            
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
        };

        fetchQuestions();
    }, []);

    const handleData = (data) => {
        setQuestions(data.results)
        console.log("hey" )
        console.log(data)
    };

    return(<div id="Trivia">

        {questions.map((question, index) => (
          <Question
            key={index}
            ask={question.question}
            right={question.correct_answer}
            wrongs={question.incorrect_answers}
          />
        ))}

        
    </div>

    )
}