import { useAppSelector } from "../../hooks/store";
import styles from './error-message.module.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state.loadError.error)
  return (error)
    ? <div className={styles['error-message']}>{error}</div>
    : null;
}

export { ErrorMessage };
