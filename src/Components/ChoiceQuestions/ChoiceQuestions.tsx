import styles from './ChoiceQuestions.module.css';

interface ChoiceQuestionsProps {
    answers: string[];
    multiple?: boolean;
}

const ChoiceQuestions = ({ multiple = false, answers }: ChoiceQuestionsProps) => {
    return (
        <>
            {answers.map((answer, index) => {
                const slicedAnswer = answer.slice(0, 15);
                return (
                    <div key={index + answer.slice(0, 3)} className={styles["card-radio"]}>
                        <input type={multiple ? "checkbox" : "radio"} className={multiple ? "multiple" : "single"} id={`answerChoice${index}`} name="answers" value={slicedAnswer} required />
                        <label className={styles["radio-label"]} htmlFor={`answerChoice${index}`}>{slicedAnswer}</label>
                    </div>
                )
            })}
        </>
    )
}

export default ChoiceQuestions;