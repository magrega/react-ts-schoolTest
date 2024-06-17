import { ReactNode } from 'react';
import styles from './MainButton.module.css';

const MainButton = ({ children }: { children: ReactNode }) => <button tabIndex={-1} className={styles.btn}>{children}</button>;

export default MainButton;