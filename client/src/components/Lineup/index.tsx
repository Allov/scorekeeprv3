import { ReactNode } from 'react';
import * as React from 'react';

interface IContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = (props: IContainerProps) => (
  <div className={props.className}>
    {props.children}
  </div>
);

export default Container;
