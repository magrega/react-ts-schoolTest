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

    return [fetchTestData(questionsUrl), fetchTestData(answersUrl)];
}