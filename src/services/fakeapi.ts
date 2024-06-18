const api = `https://jsonplaceholder.typicode.com/`
const questionsUrl = `posts`;
const answersUrl = `comments`;

export const getTestData = () => {
    const fetchTestData = async (url: string): Promise<any> => {
        try {
            const data = await fetch(`${api}${url}`);

            if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);

            return data.json();
        } catch (e) {
            throw new Error(`${(e as Error).message}`);
        }
    };

    return Promise.all([fetchTestData(questionsUrl), fetchTestData(answersUrl)])
        .then(responseArray => {
            const questions = responseArray[0].slice(0, 10).map((question: { body: string }) => question.body);
            const answers = responseArray[1].slice(0, 40).map((answers: { body: string }) => answers.body);
            return [questions, answers]
        });
}