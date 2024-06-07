import MainButton from './MainButton/MainButton';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
    question: string;
    answers: string[];
    multiple: boolean;
    isWrittenAnswer: boolean;
    handleNextQuestion: () => void;
}

const QuestionCard = ({ question, answers, handleNextQuestion, multiple, isWrittenAnswer }: QuestionCardProps) => {
    return (
        <div className={styles.card}>
            <p className="card-question">
                <strong>{`${question}?`}</strong>
            </p>
            {isWrittenAnswer ?
                <h1>Written test</h1>
                :
                <form>
                <div className={styles["card-radio-container"]}>
                    {answers.map((answer, index) => {
                        return (
                            <div key={index} className="card-radio">
                                <input type={multiple ? "checkbox" : "radio"} id="contactChoice1" name="contact" value="answer" />
                                <label className={styles['radio-label']} htmlFor="contactChoice1">{answer.slice(0, 15)}</label>
                            </div>)
                    })}
                </div>
                <MainButton handleClick={handleNextQuestion}>Ответить</MainButton>
            </form>}
        </div>
    )
}

export default QuestionCard;