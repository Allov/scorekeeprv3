import * as React from 'react';
import styled from 'styled-components'; 

interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
  theme: any;
}

const Layout = (props: ILayoutProps) => (
  <div className={props.className}>
    {props.children}
  </div>
);

const StyledLayout = styled(Layout)`
  --text-primary: ${(props: ILayoutProps) => props.theme.pText};
  --background-primary: ${(props: ILayoutProps) => props.theme.pBackground};
`;

export default StyledLayout;
