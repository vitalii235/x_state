import React, { ButtonHTMLAttributes, FC } from "react";
import styles from "./button.module.css";

type Props = {
  title: string;
  styleType: "cancel" | "error";
};
const Button: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  title,
  styleType,
  ...rest
}) => {
  const buttonType = styleType === "cancel" ? styles.cancel : styles.error;
  return (
    <button {...rest} className={buttonType}>
      {title}
    </button>
  );
};

export default Button;
