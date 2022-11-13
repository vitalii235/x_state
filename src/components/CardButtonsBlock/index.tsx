import React, { FC } from "react";
import If from "../If";
import Button from "../Button";
import {
  ProgressType,
  Statuses,
} from "store/uploadMachine/uploadMachine.types";

type Props = {
  progress?: ProgressType;
  status: Statuses;
  onCancel: () => void;
  onRetry: () => void;
};

const CardButtonsBlock: FC<Props> = ({
  progress,
  status,
  onCancel,
  onRetry,
}) => {
  const isCancelShown =
    typeof progress === "number" && progress > 0 && progress < 100;
  const isRetryShown = progress === "error" || progress === "cancel";
  return (
    <div>
      <If condition={isCancelShown && !isRetryShown}>
        <Button title={"Cancel"} styleType={"cancel"} onClick={onCancel} />
      </If>
      <If condition={isRetryShown}>
        <Button
          disabled={status !== Statuses.READY}
          title={"Retry"}
          styleType={"error"}
          onClick={onRetry}
        />
      </If>
    </div>
  );
};

export default CardButtonsBlock;
