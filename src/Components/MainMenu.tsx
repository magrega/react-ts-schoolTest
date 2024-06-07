import MainButton from "./MainButton/MainButton";
import styles from './MainMenu.module.css';

const MainMenu = () => {

    return (
        <>
            <h1>Main Menu</h1>
            <div className={styles["mainmenu-btn-container"]}>
                {/* <MainButton>Singe answer</MainButton>
                <MainButton>Multiple answers</MainButton>
                <MainButton>Short answer</MainButton>
                <MainButton>Long answer</MainButton>
                <MainButton>Shuffle</MainButton> */}
            </div>
        </>
    )
}

export default MainMenu;