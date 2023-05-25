import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../../API';
import {
  AccountWrapper,
  LoginWrap,
  InputForm,
  FilledBtns,
  JoinBox,
} from '../../default/styled';

export function EditPass() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 이메일 정보를 가져와 설정
    const email = localStorage.getItem('username');
    setUsername(email);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(`${process.env.REACT_APP_API_URL}/login`, {
        username: username,
        password: password,
      });

      navigate('/editprofile');
    } catch (error) {
      alert('입력 정보가 올바르지 않습니다.');
    }
  };

  return (
    <AccountWrapper bgGray>
      <LoginWrap autoHeight>
        <JoinBox>
          <div>
            <h1>인증 센터</h1>
            <p>현재 사용중인 비밀번호를 먼저 입력해 주세요.</p>
          </div>
        </JoinBox>
        <InputForm>
          <form onSubmit={handleSubmit} method="post">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="현재 비밀번호를 입력하세요."
                required
              />
            </div>
            <div className="right">
              <FilledBtns type="submit">확인</FilledBtns>
            </div>
          </form>
        </InputForm>
      </LoginWrap>
    </AccountWrapper>
  );
}
