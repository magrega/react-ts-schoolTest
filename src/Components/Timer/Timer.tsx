import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../state/store';
import styles from './Timer.module.css';
import { countdown } from '../../state/questionCard/questionCard';

const Timer = ({ setIsTimeOut }: { setIsTimeOut: (bool: boolean) => void }) => {

    const countdownValue = useSelector((state: RootState) => state.questionCard.timer);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const timerCountdown = setTimeout(() => {
            if (countdownValue === 0) {
                clearTimeout(timerCountdown);
                setIsTimeOut(true);
            };
            dispatch(countdown());
        }, 1000);

        return (() => clearTimeout(timerCountdown))
    }, [dispatch, countdownValue, setIsTimeOut]);

    return (
        <span className={countdownValue < 60 ? `${styles.timer} ${styles['almost-out-of-time']}` : styles.timer}>
            {`${Math.floor(countdownValue / 60)}`.padStart(2, '0')} : {`${countdownValue % 60}`.padStart(2, '0')}
        </span>
    )
}

export default Timer;