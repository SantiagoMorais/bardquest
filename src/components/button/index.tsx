import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./index.module.scss";
import cn from "classnames";
import { IconType } from "react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type IButtonProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    buttonStyle?: "primary" | "secondary" | "tertiary" | "outline" | "link";
    iconLeft?: IconType;
    iconRight?: IconType;
    className?: string;
    isLoading?: boolean;
  };

export const Button = ({
  children,
  buttonStyle,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className,
  isLoading,
  disabled,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cn(
        styles.buttonBase,
        buttonStyle ? styles[buttonStyle] : styles.primary,
        isLoading && styles.loading,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters className={styles.spinner} />
      ) : (
        <>
          {IconLeft && <IconLeft className={styles.iconLeft} />}
          {children}
          {!isLoading && IconRight && <IconRight className={styles.iconRight} />}
        </>
      )}
    </button>
  );
};
