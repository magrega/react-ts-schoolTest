import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import Results from "./Result";
import styles from './Quiz.module.css';

const Quiz = () => {
    const [questions, setQuestions] = useState<string[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [questionNum, setQuestionNum] = useState(0);
    const [commentsBatchNum, setCommentsBatchNum] = useState(0);
    const [timer, setTimer] = useState(900);

    const handleNextQuestion = () => {
        setQuestionNum(prev => prev + 1);
        setCommentsBatchNum(prev => prev + 4);
    }

    useEffect(() => {
        const timerCountdown = setTimeout(() => {
            if (timer === 0) {
                clearTimeout(timerCountdown);
                return;
            };
            setTimer(prev => prev - 1);
        }, 1000);
    }, [timer]);


    useEffect(() => {
        const api = `https://jsonplaceholder.typicode.com/`
        const questionsUrl = `posts`;
        const answersUrl = `comments`;

        const fetchTestData = async (url: string) => {
            const data = await fetch(`${api}${url}`);
            return await data.json();
        }

        const fetchQuestions = () => {
            fetchTestData(questionsUrl)
                .then(questions => questions.slice(0, 10).map((question: { body: string }) => question.body))
                .then(questions => setQuestions(questions));
        }

        const fetchAnswers = () => {
            fetchTestData(answersUrl)
                .then(answers => answers.slice(0, 40).map((answers: { body: string }) => answers.body))
                .then(answers => setAnswers(answers));
        }
        fetchQuestions();
        fetchAnswers();

    }, [])

    return (
        <div className={styles['quiz-container']}>
            <div className={styles["quiz-heading-container"]}>
                <h2 className={styles['quiz-title']}>Тестирование</h2>
                <span className={timer < 60 ? `${styles.timer} ${styles['almost-out-of-time']}` : styles.timer}>
                    {`${Math.floor(timer / 60)}`.padStart(2, '0')} : {`${timer % 60}`.padStart(2, '0')}
                </span>
            </div>
            <div className={styles['quiz-progress-bar']}>
                {Array(10).fill('').map((question, index) => {
                    const isCurrent = index === questionNum ? `${styles['current-question']}` : "";
                    const isAnswered = index < questionNum ? `${styles.answered}` : "";

                    return (
                        <span key={index} className={`${styles.bar} ${isCurrent} ${isAnswered}`} />
                    )
                })
                }

            </div>{
                questions.length === questionNum ?
                    <Results /> :
                    <QuestionCard
                        question={questions[questionNum]}
                        answers={answers.slice(commentsBatchNum, commentsBatchNum + 4)}
                        handleNextQuestion={handleNextQuestion}
                        multiple={true}
                        isWrittenAnswer={true}
                    />
            }
        </div>
    )
}

export default Quiz;