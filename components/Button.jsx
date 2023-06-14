import styles from "../src/styles/Button.module.scss";
const Button = ({ text }) => {
  return <button className={styles["btn"]}>{text}</button>;
};

export default Button;
