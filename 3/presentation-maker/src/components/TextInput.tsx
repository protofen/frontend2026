import styles from './TextInput.module.css';

type TextInputProps = {
  value: string;
  placeholder?: string;
  type?: 'text' | 'color' | 'number';
  onChange?: (value: string) => void;
  className?: string;
};

function TextInput({
  value,
  placeholder,
  type = 'text',
  onChange,
  className,
}: TextInputProps) {
  return (
    <input
      className={`${styles.input} ${className ?? ''}`}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}

export { TextInput };