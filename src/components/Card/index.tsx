import React, { FC } from "react";
import styles from "./card.module.css";
import ProgressBar from "../ProgressBar";
import {
  ProgressType,
  Statuses,
} from "store/uploadMachine/uploadMachine.types";
import If from "../If";
import Button from "../Button";

type Props = {
  name: string;
  progress?: ProgressType;
  handleRetry: (uuid: string) => void;
  handleCancel: (uuid: string) => void;
  uuid: string;
  status: Statuses;
};

const Card: FC<Props> = ({
  name,
  progress,
  handleRetry,
  handleCancel,
  uuid,
  status,
}) => {
  const isCancelShown =
    typeof progress === "number" && progress > 0 && progress < 100;
  const isRetryShown = progress === "error";
  const onCancel = () => {
    handleCancel(uuid);
  };
  const onRetry = () => {
    handleRetry(uuid);
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <span title={name}>{name}</span>
      </div>
      <div>
        <If condition={!!progress}>
          <ProgressBar progress={progress || 0} />
        </If>
        <If condition={isCancelShown}>
          <Button title={"Cancel"} styleType={"cancel"} onClick={onCancel} />
        </If>
        <If condition={isRetryShown}>
          <Button
            title={"Retry"}
            styleType={"error"}
            onClick={onRetry}
            disabled={status !== Statuses.READY}
          />
        </If>
      </div>
    </div>
  );
};

export default Card;
