import { Button } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetCard } from "../../../state/questionCard/questionCard";
import { AppDispatch } from "../../../state/store";

const BackToMenuButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const clearState = () => {
    dispatch(resetCard());
    localStorage.clear();
  };
  return (
    <Link tabIndex={-1} to={`/`}>
      <Button danger onClick={clearState}>
        Back to Menu
      </Button>
    </Link>
  );
};

export default BackToMenuButton;
