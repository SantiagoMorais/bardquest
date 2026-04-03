import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./index.module.scss";
import cn from "classnames";
import { IconBase, IconBaseProps, IconContext, IconType } from "react-icons";

type IButtonProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    buttonStyle?: "primary" | "secondary" | "tertiary" | "outline" | "link";
    iconLeft?: IconType;
    iconRight?: IconType;
    className?: string;
  };

export const Button = ({
  children,
  buttonStyle,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cn(
        styles.buttonBase,
        buttonStyle ? styles[buttonStyle] : styles.primary,
        className
      )}
      {...props}
    >
      {IconLeft && <IconLeft className={styles.iconLeft} />}
      {children}
      {IconRight && <IconRight className={styles.iconRight} />}
    </button>
  );
};
