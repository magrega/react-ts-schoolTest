import { Card, Button, Checkbox, Divider, Form, Input, Radio, Steps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTestData } from '../../services/fakeapi';
import BackToMenuButton from '../BackToMenuButton/BackToMenuButton';
import Loader from '../Loader/Loader';
import MainMenu from '../MainMenu/MainMenu';
import Timer from '../Timer/Timer';
import styles from './QuestionCard.module.css';

const QuestionCard = ({ type }: { type: string }) => {
    const lSquestionNum = JSON.parse(localStorage.getItem('questionNum')!);
    const lSanswersBatchNum = JSON.parse(localStorage.getItem('answersBatchNum')!);
    const lSallUserAnswers = JSON.parse(localStorage.getItem('allUserAnswers')!);

    const [isLoading, setIsLoading] = useState(true);
    const [isTimeOut, setIsTimeOut] = useState(false);

    const [questions, setQuestions] = useState<string[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);

    const [questionNum, setQuestionNum] = useState<number>(lSquestionNum || 0);
    const [answersBatchNum, setAnswersBatchNum] = useState<number>(lSanswersBatchNum || 0);

    const [userAnswer, setUserAnswer] = useState({});
    const [allUserAnswers, setAllUserAnswers] = useState<{}>(lSallUserAnswers || {});

    const currentAnswers = answers.slice(answersBatchNum, answersBatchNum + 4);

    const navigate = useNavigate();

    const renderQuestionType = (type: string) => { // why type string again?
        switch (type) {
            case 'single-choice':
                return <Radio.Group className={styles.group} options={currentAnswers} />;
            case 'multiple-choice':
                return <Checkbox.Group className={styles.group} options={currentAnswers} />
            case 'short-written':
                return <Input autoFocus />;
            case 'long-written':
                return <TextArea autoFocus />;
            default:
                return <MainMenu />;
        }
    }

    const handleFormChange = (answer: {}) => setUserAnswer(answer);

    const handleNextQuestion = () => {
        setAllUserAnswers(prev => ({ ...prev, ...userAnswer }));
        setQuestionNum(prev => prev + 1);
        setAnswersBatchNum(prev => prev + 4);
    }

    // fetch data
    useEffect(() => {
        getTestData().then(([questions, answers]) => {
            setQuestions(questions);
            setAnswers(answers);
            setIsLoading(false);
        }).catch(e => alert(`Error occured, try later. ${e}`));
    }, [])

    // check if the test ended
    useEffect(() => {
        if ((questions.length && questionNum === questions.length) || isTimeOut) navigate('/results', { state: allUserAnswers });
    }, [allUserAnswers, questionNum, questions.length, navigate, isTimeOut])

    // save data in localStorage
    useEffect(() => {
        localStorage.setItem('questionNum', JSON.stringify(questionNum));
        localStorage.setItem('answersBatchNum', JSON.stringify(answersBatchNum));
        localStorage.setItem('allUserAnswers', JSON.stringify(allUserAnswers));
    }, [questionNum, answersBatchNum, allUserAnswers]);

    if (isLoading) return <Loader />

    return (
        <div className={styles['quiz-container']}>
            <Title className={styles['quiz-title']}>Test in progress</Title>
            <div className={styles["quiz-indicators"]}>
                <p style={{ marginRight: '5px' }}>Question</p>
                <Steps className={styles.steps}
                    percent={(100 / questions.length * (questionNum + 1)) - 1}
                    size="default"
                    responsive={false}
                    initial={questionNum}
                    items={[{ status: 'process' }]}
                />
                <Timer setIsTimeOut={setIsTimeOut} />
            </div>
            <Card className={styles.card}>
                <Paragraph className={styles['card-question']}>{questions[questionNum]}</Paragraph>
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