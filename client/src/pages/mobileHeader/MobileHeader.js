import { Link } from 'react-router-dom';
import {
  HeaderWrapper,
  InnerWrapper,
  TextLogo,
  NavLogo,
} from '../../default/styled';
import { ReactComponent as Menu } from '../../default/image/menu.svg';
import { ReactComponent as Close } from '../../default/image/close.svg';
import { useState } from 'react';
import Dropdown from './Dropdown';

function MobileHeader() {
  const [dropdown, setDropdown] = useState(false);
  const OpenDropdown = () => {
    setDropdown(!dropdown);
  };

  const CloseDropdown = () => {
    setDropdown(false);
  };

  return (
    <>
      <HeaderWrapper>
        <InnerWrapper flex>
          <NavLogo>
            <Link to="/">
              <TextLogo onClick={CloseDropdown}>TilTile</TextLogo>
            </Link>
          </NavLogo>
          {dropdown ? (
            <button onClick={OpenDropdown}>
              <Close />
            </button>
          ) : (
            <button onClick={OpenDropdown}>
              <Menu />
            </button>
          )}
        </InnerWrapper>
      </HeaderWrapper>
      {dropdown ? <Dropdown closeMemu={CloseDropdown} /> : null}
    </>
  );
}

export default MobileHeader;
