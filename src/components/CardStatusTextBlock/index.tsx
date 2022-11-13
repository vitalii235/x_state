import React, { FC } from "react";
import If from "../If";
import { ProgressType } from "store/uploadMachine/uploadMachine.types";

type Props = {
  progress?: ProgressType;
};

const CardStatusTextBlock: FC<Props> = ({ progress }) => {
  return (
    <>
      <If condition={progress === "cancel"}>
        Please wait till the end and retry!
      </If>
      <If condition={progress === "error"}>Error!</If>
      <If condition={typeof progress === "number" && progress >= 100}>
        Success
      </If>
    </>
  );
};

export default CardStatusTextBlock;
