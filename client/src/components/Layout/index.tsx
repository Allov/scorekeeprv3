import * as React from 'react';
import styled from 'styled-components'; 
import { IAppTheme } from '../../lib/styled/interface';

interface ILayoutProps {
  children: React.ReactNode;
  className?: string;
  theme: IAppTheme;
}

const Layout = (props: ILayoutProps) => (
  <div className={props.className}>
    {props.children}
    <div className="game">
      Bottom score: 90, top score: 100
      <div className="player" style={{ '--player-score': 90 }}>
        <p className="score">90</p>
        <p className="player-name">Max</p>
      </div>
      <div className="player" style={{ '--player-score': 93 }}>
        <p className="score">93</p>
        <p className="player-name">Paolo</p>
      </div>
      <div className="player" style={{ '--player-score': 98 }}>
        <p className="score">98</p>
        <p className="player-name">Fred</p>
      </div>
      <div className="player" style={{ '--player-score': 100 }}>
        <p className="score">100</p>
        <p className="player-name">Francis</p>
      </div>
      <div className="player" style={{ '--player-score': 91 }}>
        <p className="score">91</p>
        <p className="player-name">Remzy</p>
      </div>
    </div>
  </div>
);

const gameStats = `
  --top-score: 100;
  --bottom-score: 90;
  --player-score: 0;
  --rank-scope: 120;
`;

const calculated = `
  --player-rank: calc(var(--rank-hue) + var(--calculated-player-range));
  --calculated-player-range: calc(((var(--player-score) - var(--bottom-score)) / (var(--top-score) - var(--bottom-score))) * (var(--rank-scope)));
`;

const StyledLayout = styled(Layout)`
  --text-primary: ${(props: ILayoutProps) => props.theme.pText};
  --background-primary: ${(props: ILayoutProps) => props.theme.pBackground};
  --font-family: ${(props: ILayoutProps) => props.theme.font};
  --font-sm: ${(props: ILayoutProps) => props.theme.fontSm};
  --font-md: ${(props: ILayoutProps) => props.theme.fontMd};
  --font-lg: ${(props: ILayoutProps) => props.theme.fontLg};
  
  font-family: var(--font-family);

  height: 100vh;
  width: 100vw;

  h1 { font-size: var(--font-lg) }
  h2, h3, h4, h5 { font-size: var(--font-md) }
  p { font-size: var(--font-smd); color: black; }
  a { text-decoration: none }

  background: var(--background-primary);

  .game {
    .player {
      ${gameStats}
      ${calculated}
      background-image: linear-gradient(to left, hsla(var(--player-rank), 100%, 50%, 1), var(--background-primary));
      color: black;
      margin: 5px auto;
      padding: 10px;
      border-bottom: 2px solid hsla(var(--player-rank), 80%, 50%, 1);
      position: relative;
      transition: background .2s;

      .score {
        background: var(--background-primary);
        color: hsla(var(--player-rank), 100%, 50%, 1);
        display: inline-block;
        padding: 0 15px;
        font-size: var(--font-lg);
        font-weight: 800;
        margin: 0;
        text-shadow: 1px 1px var(--text-primary);
      }

      .player-name {
        color: var(--text-primary);
        font-weight: 500;
        margin: 10px 0 0;
      }
    }
  }
`;

export default StyledLayout;
