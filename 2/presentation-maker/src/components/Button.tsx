import styles from './Button.module.css';

type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
};

function Button({ text, onClick, className }: ButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${className ?? ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export { Button };