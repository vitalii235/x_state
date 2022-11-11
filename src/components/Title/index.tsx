import React, { FC } from "react";

type Props = {
  title: string;
};
const Title: FC<Props> = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};

export default Title;
