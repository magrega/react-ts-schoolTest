import { List, Typography } from "antd";
import { Navigate, useLocation } from "react-router-dom";
import BackToMenuButton from "../BackToMenuButton/BackToMenuButton";
import styles from './Result.module.css';

const Results = () => {
    let { state } = useLocation();
    if (!state) return <Navigate to={'/'} />;

    const stateKeys: string[][] = Object.values(state);

    return (
        <div className={styles["result-container"]}>
            <List
                header={<Typography.Title>Your answers:</Typography.Title>}
                footer={<BackToMenuButton />}
                bordered
                locale={{ emptyText: "No answers been given" }}
                dataSource={stateKeys}
                renderItem={(item, index) => (
                    <List.Item>
                        <Typography.Paragraph><strong>{`Question ${index + 1}: `}</strong>{`${Array.isArray(item) ? item.join(', ') : item}`}</Typography.Paragraph>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Results;