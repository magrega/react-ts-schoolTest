import { Link } from "react-router-dom";
import MainButton from "../MainButton/MainButton";
import styles from './MainMenu.module.css';

const MainMenu = () => {
    return (
        <div className={styles['mainmenu-container']}>
            <h1>Main Menu</h1>
            <Link tabIndex={0} to={`single-choice`}>
                <MainButton>Single choice</MainButton>
            </Link>
            <Link tabIndex={0} to={`multiple-choice`}>
                <MainButton>Multiple choices</MainButton>
            </Link>
            <Link tabIndex={0} to={`short-written`}>
                <MainButton>Short answer</MainButton>
            </Link>
            <Link tabIndex={0} to={`long-written`}>
                <MainButton>Long answer</MainButton>
            </Link>
        </div>
    )
}

export default MainMenu;