import Title from 'antd/es/typography/Title';
import BackToMenuButton from '../BackToMenuButton/BackToMenuButton';
import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className={styles['loader-container']}>
            <Title>Loading questions...</Title>
            <span className={styles.loader}></span>
            <BackToMenuButton />
        </div>
    )
}
export default Loader;