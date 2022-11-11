import React, { FC, ReactNode } from "react";

type Props = {
  condition: boolean;
  children: ReactNode;
};
const If: FC<Props> = ({ condition, children }) => {
  if (condition) return <>{children}</>;
  return null;
};

export default If;
