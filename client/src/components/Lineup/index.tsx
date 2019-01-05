import { ReactNode } from 'react';
import * as React from 'react';
import styled from 'styled-components';

interface IContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = (props: IContainerProps) => (
  <div className={props.className}>
    <ul>
      {props.children}
    </ul>
  </div>
);

const Lineup = styled(Container)`
  width: 320px;
  height: 768px;

  ul {
    display: inline-grid;
    grid-template-rows: 100%;
    grid-template-columns: 100%;
    grid-gap: 3px;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    font-size: 3em;
  }
`;

export default Lineup;
