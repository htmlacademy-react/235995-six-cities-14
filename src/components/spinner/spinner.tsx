import styles from './spinner.module.css';

const Spinner = () => (
  <div className={styles['spinner']} >
    <div className={styles['spinner__content']}></div>
  </div>
);

export { Spinner };
