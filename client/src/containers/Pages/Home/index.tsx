import * as React from 'react';
import FrontCard from '../../../components/FrontCard';
import Lineup from '../../../components/Lineup';
import { ILineup } from '../../../types';

interface IHomeProps {
  lineup?: ILineup;
}

const Home = (props: IHomeProps) => (
  <Lineup>
    <FrontCard
      title="Dutch"
      link="/create/dutch"
      summary="The game of Dutch!"
      playerCount="2-10+"
      time="20m"
      />
  </Lineup>
);

export default Home;
