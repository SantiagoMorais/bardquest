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
    size?: "sm" | "md" | "lg";
  };

export const Button = ({
  children,
  buttonStyle,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className,
  isLoading,
  disabled,
  size = "md",
  ...props
}: IButtonProps) => {
  const sizeClass = (styles as Record<string, string>)[size];

  return (
    <button
      className={cn(
        styles.buttonBase,
        buttonStyle ? styles[buttonStyle] : styles.primary,
        sizeClass,
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
