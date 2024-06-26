import { Button, Card, Checkbox, Divider, Form, Input, Radio, Steps, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData, setNextQuestion, setUserAnswer } from '../../state/questionCard/questionCard';
import { AppDispatch, RootState } from '../../state/store';
import ErrorPage from '../ErrorPage/ErrorPage';
import MainMenu from '../MainMenu/MainMenu';
import Timer from '../Timer/Timer';
import BackToMenuButton from '../UI/BackToMenuButton/BackToMenuButton';
import Loader from '../UI/Loader/Loader';
import styles from './QuestionCard.module.css';

const QuestionCard = ({ type }: { type: string }) => {
    const navigate = useNavigate();
    const isError = useSelector((state: RootState) => state.questionCard.isError);
    const isLoading = useSelector((state: RootState) => state.questionCard.isLoading);
    const isTimeOut = useSelector((state: RootState) => state.questionCard.isTimeOut);
    const questions = useSelector((state: RootState) => state.questionCard.questions);
    const questionNum = useSelector((state: RootState) => state.questionCard.questionNum);
    const currentAnswers = useSelector((state: RootState) => state.questionCard.currentAnswers);
    const allUserAnswers = useSelector((state: RootState) => state.questionCard.allUserAnswers);

    const dispatch = useDispatch<AppDispatch>();

    const renderQuestionType = (type: string) => {
        switch (type) {
            case 'single-choice':
                return <Radio.Group className={styles.group} options={currentAnswers} />;
            case 'multiple-choice':
                return <Checkbox.Group className={styles.group} options={currentAnswers} />
            case 'short-written':
                return <Input autoFocus />;
            case 'long-written':
                return <Input.TextArea autoFocus />;
            default:
                return <MainMenu />;
        }
    }

    const handleFormChange = (answer: {}) => dispatch(setUserAnswer(answer));
    const handleNextQuestion = () => dispatch(setNextQuestion());

    // fetch data
    useEffect(() => { dispatch(fetchData()); }, [dispatch]);

    // check if the test ended
    useEffect(() => {
        if ((questions.length && questionNum === questions.length) || isTimeOut) navigate('/results', { state: allUserAnswers });
    }, [allUserAnswers, questionNum, questions.length, navigate, isTimeOut])

    if (isError) return <ErrorPage />
    if (isLoading) return <Loader />

    return (
        <div className={styles['quiz-container']}>
            <Typography.Title className={styles['quiz-title']}>Test in progress</Typography.Title>
            <div className={styles["quiz-indicators"]}>
                <p style={{ marginRight: '5px' }}>Question</p>
                <Steps className={styles.steps}
                    percent={(100 / questions.length * (questionNum + 1)) - 1}
                    size="default"
                    responsive={false}
                    initial={questionNum}
                    items={[{ status: 'process' }]}
                />
                <Timer />
            </div>
            <Card className={styles.card}>
                <Typography.Paragraph className={styles['card-question']}>{questions[questionNum]}</Typography.Paragraph>
                <Divider />
                <Form
                    name={`question${questionNum}`}
                    onFinish={handleNextQuestion}
                    onValuesChange={handleFormChange}
                    autoComplete="off"
                >
                    <Form.Item
                        name={`answers${questionNum}`}
                        rules={[{ required: true, message: 'Enter your answer!' }]}
                    >
                        {renderQuestionType(type)}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {questionNum + 1 === questions.length ? "Результаты" : "Ответить"}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <BackToMenuButton />
        </div>
    )
}
export default QuestionCard;