import styles from './QuestionCard.module.css';

interface ChoiceQuestionsProps {
    answers: string[];
    multiple?: boolean;
}

const ChoiceQuestions = ({ multiple = false, answers }: ChoiceQuestionsProps) => {
    return (
        <div className={styles["card-radio-container"]}>
            {answers.map((answer, index) => {
                return (
                    <div key={index} className="card-radio">
                        <input type={multiple ? "checkbox" : "radio"} id="contactChoice1" name="contact" value="answer" />
                        <label className={styles['radio-label']} htmlFor="contactChoice1">{answer.slice(0, 15)}</label>
                    </div>)
            })}
        </div>
    )
}

export default ChoiceQuestions;