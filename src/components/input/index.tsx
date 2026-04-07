import { JSX, useId, Ref, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { LuEye, LuEyeOff } from "react-icons/lu";

type IInputProps = JSX.IntrinsicElements["input"] & {
  label: string;
  error?: {
    message?: string;
    isError: boolean;
  };
  ref?: Ref<HTMLInputElement>;
};

export const Input = ({ label, error, ref, ...props }: IInputProps) => {
  const isPasswordField = props.type === "password";
  const [hidePassword, setHidePassword] = useState(isPasswordField);
  const id = useId();

  const resolvedType = isPasswordField
    ? hidePassword
      ? "password"
      : "text"
    : props.type;

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input id={id} ref={ref} {...props} type={resolvedType} />
        {isPasswordField && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setHidePassword((prev) => !prev)}
          >
            {hidePassword ? <LuEye size={20} /> : <LuEyeOff size={20} />}
          </button>
        )}
      </div>
      <span className={classNames(styles.errorMessage, error?.isError && styles.visible)}>
        {error?.message}
      </span>
    </div>
  );
};
