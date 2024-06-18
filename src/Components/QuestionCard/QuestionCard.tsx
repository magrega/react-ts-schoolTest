import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackToMenuButton from '../BackToMenuButton/BackToMenuButton';
import ChoiceQuestions from '../ChoiceQuestions/ChoiceQuestions';
import Loader from '../Loader/Loader';
import MainMenu from '../MainMenu/MainMenu';
import Timer from '../Timer/Timer';
import WrittenQuestions from '../WrittenQuestions/WrittenQuestions';
import styles from './QuestionCard.module.css';
import { getTestData } from '../../services/fakeapi';

const QuestionCard = ({ type }: { type: string }) => {
    const lSquestionNum = JSON.parse(localStorage.getItem('questionNum')!);
    const lSanswersBatchNum = JSON.parse(localStorage.getItem('answersBatchNum')!);
    const lSallUserAnswers = JSON.parse(localStorage.getItem('allUserAnswers')!);

    const [isLoading, setIsLoading] = useState(true);
    const [isTimeOut, setIsTimeOut] = useState(false);

    const [questions, setQuestions] = useState<string[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);

    const [questionNum, setQuestionNum] = useState<number>(lSquestionNum || 0);
    const [answersBatchNum, setAnswersBatchNum] = useState<number>(lSanswersBatchNum || 0);

    const [userAnswer, setUserAnswer] = useState<string[]>([]);
    const [allUserAnswers, setAllUserAnswers] = useState<{}>(lSallUserAnswers || {});

    const [writtenAnswer, setWrittenAnswer] = useState('');

    const currentAnswers = answers.slice(answersBatchNum, answersBatchNum + 4);

    const navigate = useNavigate();

    const renderQuestionType = (type: string) => { // why type string again?
        switch (type) {
            case 'single-choice':
                return <ChoiceQuestions answers={currentAnswers} />;
            case 'multiple-choice':
                return <ChoiceQuestions answers={currentAnswers} multiple />;
            case 'short-written':
                return <WrittenQuestions text={writtenAnswer} setText={setWrittenAnswer} />;
            case 'long-written':
                return <WrittenQuestions text={writtenAnswer} setText={setWrittenAnswer} isLong />;
            default:
                return <MainMenu />;
        }
    }

    const handleFormChange = (e: ChangeEvent<HTMLFormElement>) => {
        const target = e.target;
        const answerValue = target.value;
        const inputType = target.form.querySelector('input')?.type;

        if (inputType === 'checkbox') {
            const checkboxes = [...e.target.form.querySelectorAll('.multiple')];

            const isSomeChecked = checkboxes.some(input => input.checked === true);
            checkboxes.forEach(input => isSomeChecked ? input.required = false : input.required = true);

            if (userAnswer.includes(answerValue)) {
                setUserAnswer(prev => prev.filter(answer => answer !== answerValue));
            } else { setUserAnswer(prev => [...prev, answerValue]); }

        } else setUserAnswer([answerValue]);
    }

    const handleNextQuestion = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAllUserAnswers(prev => ({ ...prev, [questionNum]: userAnswer }));
        setQuestionNum(prev => prev + 1);
        setAnswersBatchNum(prev => prev + 4);
        setUserAnswer([]);
        setWrittenAnswer("");
    }

    // fetch data
    useEffect(() => {
        getTestData().then(([questions, answers]) => {
            setQuestions(questions);
            setAnswers(answers);
            setIsLoading(false);
        }).catch(e => alert(`Error occured, try later. ${e}`));
    }, [])

    // check if the test ended
    useEffect(() => {
        if ((questions.length && questionNum === questions.length) || isTimeOut) navigate('/results', { state: allUserAnswers });
    }, [allUserAnswers, questionNum, questions.length, navigate, isTimeOut])

    // save data in localStorage
    useEffect(() => {
        localStorage.setItem('questionNum', JSON.stringify(questionNum));
        localStorage.setItem('answersBatchNum', JSON.stringify(answersBatchNum));
        localStorage.setItem('allUserAnswers', JSON.stringify(allUserAnswers));
    }, [questionNum, answersBatchNum, allUserAnswers]);

    if (isLoading) return <Loader />

    return (
        <div className={styles['quiz-container']}>
            <div className={styles["quiz-heading-container"]}>
                <h1 className={styles['quiz-title']}>Test in progress</h1>
                <Timer setIsTimeOut={setIsTimeOut} />
            </div>
            <div className={styles['quiz-progress-bar']}>
                {questions.map((_, index) => {
                    const isCurrent = index === questionNum ? `${styles['current-question']}` : "";
                    const isAnswered = index < questionNum ? `${styles.answered}` : "";
                    return <span key={index} className={`${styles.bar} ${isCurrent} ${isAnswered}`} />
                })
                }
            </div>
            <div className={styles.card}>
                <p className={styles['card-question']}>{`${questions[questionNum]}?`}</p>
                <form onChange={handleFormChange} onSubmit={handleNextQuestion} id='quiz' className={styles["card-radio-container"]}>
                    {renderQuestionType(type)}
                    <button className={styles['quiz-submit-btn']} type='submit'>{questionNum + 1 === questions.length ? "Результаты" : "Ответить"}</button>
                </form>
            </div>
            <BackToMenuButton />
        </div>
    )
}

export default QuestionCard;