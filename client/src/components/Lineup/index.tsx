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
  ul {
    display: inline-grid;
    grid-template-rows: 100%;
    grid-template-columns: 100%;
    grid-gap: 3px;
  }

  li {
    background: var(--background-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid var(--text-primary);
    font-size: 3em;
  }
`;

export default Lineup;
