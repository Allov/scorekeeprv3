import * as React from 'react';
import Card from '../../components/Card';
import Lineup from '../../components/Lineup';
import { ILineup } from '../../types';

interface IHomeProps {
  lineup?: ILineup;
}

const Home = (props: IHomeProps) => (
  <Lineup>
    <Card title="Create" link="/create/test" />
  </Lineup>
);

export default Home;
