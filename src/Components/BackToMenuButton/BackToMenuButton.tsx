import { Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { resetCard } from "../../state/questionCard/questionCard";

const BackToMenuButton = () => {
    const dispatch = useDispatch<AppDispatch>();
    const clearState = () => {
        dispatch(resetCard());
        localStorage.clear();
    }
    return <Link to={`/`}><Button danger onClick={clearState}>Back to Menu</Button></Link>;
}

export default BackToMenuButton;