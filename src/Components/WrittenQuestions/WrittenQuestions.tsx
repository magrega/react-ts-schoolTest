import styles from './QuestionCard.module.css';

const WrittenQuestions = ({ isLong }: { isLong: boolean }) => {
    return (
        <div className={styles["card-text-input-container"]}>
            {isLong ?
                <textarea rows={10} cols={45} name="text"></textarea> :
                <input type='text' />
            }
        </div>
    )
}

export default WrittenQuestions;