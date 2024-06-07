import { ReactNode, SyntheticEvent } from 'react';
import styles from './MainButton.module.css';

const MainButton = ({ children, handleClick: clickFunction }: { children: ReactNode, handleClick: () => void }) => {

    const handleClick = (e: SyntheticEvent) => {
        e.preventDefault();
        clickFunction();
    }

    return (
        <button onClick={handleClick} className={styles.btn}>
            {children}
        </button>
    )
}

export default MainButton;