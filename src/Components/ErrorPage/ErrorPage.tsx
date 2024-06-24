import { Typography } from "antd"
import BackToMenuButton from "../BackToMenuButton/BackToMenuButton"
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
    return (
        <div className={styles['error-page-container']}>
            <Typography.Title>There was an error</Typography.Title>
            <Typography.Paragraph>Please return to main menu and try again</Typography.Paragraph>
            <BackToMenuButton />
        </div>
    )
}

export default ErrorPage;