import BackToMenuButton from '../BackToMenuButton/BackToMenuButton';
import styles from './Loader.module.css';


const Loader = () => {

    return (
        <div className={styles['loader-container']}>
            <h1>Loading questions...</h1>
            <span className={styles.loader}></span>
            <BackToMenuButton />
        </div>
    )
}
export default Loader;