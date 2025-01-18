import { Button, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import styles from "./MainMenu.module.css";

const MainMenu = () => {
  return (
    <div className={styles["mainmenu-container"]}>
      <Typography.Title>Main Menu</Typography.Title>
      <Card className={styles["mainmenu-container"]}>
        <Link tabIndex={-1} to={`single-choice`}>
          <Button tabIndex={1} className={styles.btn} type="primary">
            Single choice
          </Button>
        </Link>
        <Link tabIndex={-1} to={`multiple-choice`}>
          <Button tabIndex={2} className={styles.btn} type="primary">
            Multiple choices
          </Button>
        </Link>
        <Link tabIndex={-1} to={`short-written`}>
          <Button tabIndex={3} className={styles.btn} type="primary">
            Short answer
          </Button>
        </Link>
        <Link tabIndex={-1} to={`long-written`}>
          <Button tabIndex={4} className={styles.btn} type="primary">
            Long answer
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default MainMenu;
