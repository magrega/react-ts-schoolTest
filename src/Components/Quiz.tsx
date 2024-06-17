import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import Results from "./Result";
import styles from './Quiz.module.css';

const Quiz = () => {
    const [timer, setTimer] = useState(900);
    const [questionsTotal, setQuestionsTotal] = useState(10);

    useEffect(() => {
        const timerCountdown = setTimeout(() => {
            if (timer === 0) {
                clearTimeout(timerCountdown);
                return;
            };
            setTimer(prev => prev - 1);
        }, 1000);
    }, [timer]);

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
                    // const isCurrent = index === questionNum ? `${styles['current-question']}` : "";
                    // const isAnswered = index < questionNum ? `${styles.answered}` : "";

                    return (
                        // <span key={index} className={`${styles.bar} ${isCurrent} ${isAnswered}`} />
                        <span key={index} className={`${styles.bar}`} />
                    )
                })
                }

            </div>
            <QuestionCard />
        </div>
    )
}

export default Quiz;