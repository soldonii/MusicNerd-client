import styled from 'styled-components';
import * as colors from '../../lib/colors';

const Button = styled.button`
  background-color: ${colors.WHITE};
  font-size: 1.2rem;
  padding: 0.5rem 1.3rem;
  border: 0;
  border-radius: 2rem;
  cursor: pointer;

  &:hover {
    color: ${colors.WHITE};
    background-color: ${colors.HIGHLIGHT};
  }
`;

export default Button;
