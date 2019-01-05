import * as React from 'react';
import styled from 'styled-components';
import A from '../A';
import H1 from '../H1';

interface ICardProps {
  title: string,
  link: string,
  className?: string,
}

export const Card = (props: ICardProps) => (
  <li className={props.className}>
    <A to={props.link}>
      <H1>{props.title}</H1>
    </A>
  </li>
);

const StyledCard = styled(Card)`
  border: 2px solid red;
`;

export default StyledCard;
