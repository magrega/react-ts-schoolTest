import { Button, Card, Checkbox, Divider, Form, Input, Radio, Steps, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData, setAllUserAnswers, setIsTimeout, setNextQuestion, setUserAnswer } from '../../state/questionCard/questionCard';
import { AppDispatch, RootState } from '../../state/store';
import BackToMenuButton from '../BackToMenuButton/BackToMenuButton';
import Loader from '../Loader/Loader';
import MainMenu from '../MainMenu/MainMenu';
import Timer from '../Timer/Timer';
import styles from './QuestionCard.module.css';
import ErrorPage from '../ErrorPage/ErrorPage';

const QuestionCard = ({ type }: { type: string }) => {
    console.log('render');
    

    const { isLoading, isTimeOut, questions, answers, questionNum, answersBatchNum, userAnswer, allUserAnswers, isError } = useSelector((state: RootState) => state.questionCard);
    const dispatch = useDispatch<AppDispatch>();

    const currentAnswers = answers.slice(answersBatchNum, answersBatchNum + 4);

    const navigate = useNavigate();

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

    const handleNextQuestion = () => {
        dispatch(setAllUserAnswers(userAnswer));
        dispatch(setNextQuestion());
    }

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
                <Timer setIsTimeOut={setIsTimeout} />
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