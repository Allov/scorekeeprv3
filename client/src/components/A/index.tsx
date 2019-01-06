import { Link } from 'react-router-dom';
import styled from 'styled-components';

const A = styled(Link)`
  color: var(--text-primary);

  &:hover {
    color: var(--text-primary);
  }
`;

export default A;
