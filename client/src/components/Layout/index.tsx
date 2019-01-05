import * as React from 'react';
import styled from 'styled-components'; 

interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
  myTheme: any;
}

const Layout = (props: ILayoutProps) => (
  <div className={props.className}>
    {props.children}
  </div>
);

const StyledLayout = styled(Layout)`
  --text-primary: ${(props: ILayoutProps) => props.myTheme.pText};
  --background-primary: ${(props: ILayoutProps) => props.myTheme.pBackground};
`;

export default StyledLayout;
