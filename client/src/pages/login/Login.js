import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { JoinBox, FilledBtns, InputForm, OauthBox } from '../../default/styled';
import useStore from '../../default/useStore';
import API from '../../API';
import GoogleButton from './components/GoogleButton';

// import { HeaderLink } from '../../default/styled';
axios.defaults.withCredentials = true;

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setLoginStatus } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setLoginStatus(isLoggedIn);

    // 이메일 정보가 로컬 스토리지에 저장되어 있는 경우, 자동으로 입력
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          username: username,
          password: password,
        }
      );
      // 로컬스토리지에 저장하는 3개의 토큰

      // 서버에서 전달한 헤더의 Authorization에서 토큰 추출
      const token = response.headers.authorization;
      // 헤더에 토큰이 있는 경우 로컬 스토리지에 저장
      if (token) {
        localStorage.setItem('token', token);
      }

      localStorage.setItem('username', username);
      localStorage.setItem('isLoggedIn', 'true');

      setLoginStatus(true);
      navigate('/profile/mytil');
      window.location.reload();
    } catch (error) {
      alert('로그인 정보가 올바르지 않습니다.');
    }
  };

  return (
    <JoinBox>
      <div>
        <h1>로그인</h1>
        <p>아직 회원이 아니신가요?</p>
        <Link to="/signup">회원가입</Link>
      </div>

      <InputForm>
        <form onSubmit={handleSubmit} method="post">
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
            <FilledBtns type="submit">로그인</FilledBtns>
            {/* <p>계정을 잃어버리셨나요? 계정찾기</p> */}
          </div>
        </form>
      </InputForm>

      <span>간편하게 SNS 로그인</span>
      <OauthBox>
        <GoogleButton />
      </OauthBox>
    </JoinBox>
  );
}

export default LoginForm;
