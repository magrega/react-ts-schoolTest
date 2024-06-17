import { useLocation } from "react-router-dom";
import BackToMenuButton from "../BackToMenuButton/BackToMenuButton";
import styles from './Result.module.css';

const Results = () => {
    let { state } = useLocation();
    const stateKeys = Object.keys(state);
    
    return (
        <div className={styles["result-container"]}>
            <h1>Your answers:</h1>
            <div className={styles['result-answers']}>
                {stateKeys.length ?
                    stateKeys.map((answer, index) => <p key={index}><strong>{`Question ${index + 1}: `}</strong>{`${state[answer].join(", ")}`}</p>)
                    :
                    <p>No answers have been given</p>}
                <BackToMenuButton />
            </div>
        </div>
    )
}

export default Results;