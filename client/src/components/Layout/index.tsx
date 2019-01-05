import * as React from 'react';
import styled from 'styled-components';

interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = (props: ILayoutProps) => (
  <div className={props.className}>
    {props.children}
  </div>
);

const StyledLayout = styled(Layout)`
`;

export default StyledLayout;
