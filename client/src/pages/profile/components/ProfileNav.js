import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { TapMenu } from '../../../default/styled';

const Navbar = styled.nav`
  position: fixed;
  left: 355px;
  top: 60px;
  padding-left: 65px;
  padding-top: 100px;
  width: 100%;
  height: 90px;
  z-index: 1;
  box-sizing: border-box;

  div {
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

export function ProfileNav() {
  return (
    <Navbar>
      <div>
        <NavLink to="/profile/mytil">
          <TapMenu>TIL</TapMenu>
        </NavLink>
        <NavLink to="/profile/bookmark">
          <TapMenu>북마크</TapMenu>
        </NavLink>
      </div>
    </Navbar>
  );
}
