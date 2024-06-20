import { List } from "antd";
import Title from "antd/es/typography/Title";
import { Navigate, useLocation } from "react-router-dom";
import BackToMenuButton from "../BackToMenuButton/BackToMenuButton";
import styles from './Result.module.css';
import Paragraph from "antd/es/typography/Paragraph";

const Results = () => {
    let { state } = useLocation();
    if (!state) return <Navigate to={'/'} />;

    const stateKeys: string[][] = Object.values(state);

    return (
        <div className={styles["result-container"]}>
            <List
                header={<Title>Your answers:</Title>}
                footer={<BackToMenuButton />}
                bordered
                locale={{ emptyText: "No answers been given" }}
                dataSource={stateKeys}
                renderItem={(item, index) => (
                    <List.Item>
                        <Paragraph><strong>{`Question ${index + 1}: `}</strong>{`${Array.isArray(item) ? item.join(', ') : item}`}</Paragraph>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Results;