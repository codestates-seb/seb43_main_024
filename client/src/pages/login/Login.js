import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useStore from '../../default/useStore';

// import { HeaderLink } from '../../default/styled';

export const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  alight-items: stretch;

  input {
    width: 100%;
    padding-top: 20px;
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 1;
  }

  .right {
    display: flex;
    flex-direction: row-reverse;
    text-align: right;
    flex-direction: column;
  }
`;

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setLoginStatus } = useStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/login',
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      window.sessionStorage.setItem('access_token', response.data.access_token); // 토큰 저장
      setLoginStatus(true);

      console.log(response.data);
      navigate(-2);
    } catch (error) {
      alert('로그인 정보가 올바르지 않습니다.');
    }
  };

  return (
    <>
      <div>
        <h2>로그인</h2>
        <p>아직회원이 아니신가요?</p>
        <Link to="/signup">회원가입</Link>
      </div>

      <InputForm>
        <form onSubmit={handleSubmit}>
          <div className="left">
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="이메일을 입력해주세요"
              required
            />
          </div>
          <div className="center">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요. (최소 8자 이상, 영문+숫자 조합)"
              required
            />
          </div>
          <div className="right">
            <p>계정을 잃어버리셨나요? 계정찾기</p>
            <button type="submit">로그인</button>
          </div>
        </form>
      </InputForm>
      <a href="http://ec2-43-202-31-64.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google">
        구글로 로그인
      </a>
      <br />
      <a href="http://ec2-43-202-31-64.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/github">
        GitHub 로그인
      </a>
    </>
  );
}

export default LoginForm;
