import styled from 'styled-components';
import { TapMenu } from '../../../default/styled';

const NavWrapper = styled.div`
  margin: 45px 7px -10px 7px;
  border-bottom: 1px solid var(--color-lightgray);
`;

const TilTapMenu = styled(TapMenu)`
  font-size: 15px;
  padding: 10px 3px;
  margin-right: 15px;
`;

function HotTilNav() {
  return (
    <NavWrapper>
      <TilTapMenu>오늘의 틸</TilTapMenu>
      <TilTapMenu>지난 1주</TilTapMenu>
      <TilTapMenu>지난 1개월</TilTapMenu>
    </NavWrapper>
  );
}

export default HotTilNav;
