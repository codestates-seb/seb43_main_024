import { Outlet } from 'react-router-dom';
import { AccountWrapper, LoginWrap } from '../../default/styled';

function Account() {
  return (
    <AccountWrapper>
      <LoginWrap>
        <Outlet />
      </LoginWrap>
    </AccountWrapper>
  );
}

export default Account;
