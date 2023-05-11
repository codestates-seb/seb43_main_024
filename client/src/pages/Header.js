import { Link } from 'react-router-dom';

import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  background: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;
function Header() {
  return (
    <HeaderWrapper>
      <h1>tiltil</h1>
      <h2>
        <Link to="/">Main</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
      </h2>
    </HeaderWrapper>
  );
}

export default Header;
