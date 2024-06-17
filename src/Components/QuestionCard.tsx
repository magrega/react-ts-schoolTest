import { useEffect, useState } from 'react';
import ChoiceQuestions from './ChoiceQuestions/ChoiceQuestions';
import MainButton from './MainButton/MainButton';
import styles from './QuestionCard.module.css';
import WrittenQuestions from './WrittenQuestions/WrittenQuestions';


const QuestionCard = ({ multiple }: { multiple?: boolean }) => {
    const [questions, setQuestions] = useState<string[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [questionNum, setQuestionNum] = useState(0);
    const [commentsBatchNum, setCommentsBatchNum] = useState(0);

    const handleNextQuestion = () => {
        setQuestionNum(prev => prev + 1);
        setCommentsBatchNum(prev => prev + 4);
    }

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
        <div className={styles.card}>
            <p className="card-question">
                <strong>{`${questions}?`}</strong>
            </p>
            <ChoiceQuestions answers={answers} multiple/>
            <MainButton handleClick={handleNextQuestion}>Ответить</MainButton>
        </div>
    )
}

export default QuestionCard;