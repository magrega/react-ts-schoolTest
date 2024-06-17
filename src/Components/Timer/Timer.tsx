import { useEffect, useState } from 'react';
import styles from './Timer.module.css';

const Timer = ({ setIsTimeOut }: { setIsTimeOut: (bool: boolean) => void }) => {

    const lSTimer = JSON.parse(localStorage.getItem('timer')!);

    const [timer, setTimer] = useState<number>(lSTimer || 15 * 60);

    useEffect(() => {
        const timerCountdown = setTimeout(() => {
            if (timer === 0) {
                clearTimeout(timerCountdown);
                setIsTimeOut(true);
            };
            localStorage.setItem('timer', JSON.stringify(timer - 1));
            setTimer(prev => prev - 1);
        }, 1000);

        return (() => {
            clearTimeout(timerCountdown);
        })
    }, [timer, setIsTimeOut]);

    return (
        <span className={timer < 60 ? `${styles.timer} ${styles['almost-out-of-time']}` : styles.timer}>
            {`${Math.floor(timer / 60)}`.padStart(2, '0')} : {`${timer % 60}`.padStart(2, '0')}
        </span>
    )

}

export default Timer;