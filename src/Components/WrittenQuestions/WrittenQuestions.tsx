const WrittenQuestions = ({ isLong = false, text, setText }: { isLong?: boolean, text: string, setText: (text: string) => void }) => {
    const handleChange = (e: any) => setText(e.target.value);

    return isLong ?
        <textarea rows={10} cols={45} name="text" required value={text} onChange={handleChange} />
        :
        <input type="text" required value={text} onChange={handleChange} />
}

export default WrittenQuestions;