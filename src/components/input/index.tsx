import { JSX, useId } from "react";
import styles from "./index.module.scss";

type IInputProps = JSX.IntrinsicElements["input"] & {
  label: string;
};

export const Input = ({ label, ...props }: IInputProps) => {
  const id = useId();

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input id={id} {...props} />
    </div>
  );
};
