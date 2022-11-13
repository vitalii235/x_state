import React, { FC } from "react";
import styles from "./card.module.css";
import ProgressBar from "../ProgressBar";
import {
  ProgressType,
  Statuses,
} from "store/uploadMachine/uploadMachine.types";
import If from "../If";
import CardStatusTextBlock from "../CardStatusTextBlock";
import CardButtonsBlock from "../CardButtonsBlock";

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
  const isProgressShown = typeof progress === "number" && progress < 100;
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
        <CardStatusTextBlock progress={progress} />
        <If condition={isProgressShown}>
          <ProgressBar progress={progress || 0} />
        </If>
        <CardButtonsBlock
          progress={progress}
          status={status}
          onCancel={onCancel}
          onRetry={onRetry}
        />
      </div>
    </div>
  );
};

export default Card;
