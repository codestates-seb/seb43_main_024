import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 64px);
  box-sizing: border-box;
  background: #edf8f1;
  border: 3px solid red;
`;

const LoginWrap = styled.div`
  background: white;
  width: 420px;
  height: 357px;
  border: 3px solid red;
  background: #ffffff;

  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  box-sizing: border-box;
  padding: 40px;
`;

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
