import { Button } from "antd";
import { Link } from "react-router-dom";

const BackToMenuButton = () => {
    const clearLocalStorage = () => localStorage.clear();

    return <Link to={`/`}><Button danger onClick={clearLocalStorage}>Back to Menu</Button></Link>;

}

export default BackToMenuButton;