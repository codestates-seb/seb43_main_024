import { useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/named
import { Modal } from './components/SignUpModal';
import useStore from '../../default/useStore';
import { Link } from 'react-router-dom';
import {
  InputForm,
  JoinBox,
  FilledBtns,
  SendBtn,
  AuthInput,
} from '../../default/styled';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState(''); // 비밀번호 재입력
  //   const [signUpNumber, setSignUpNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signUpNumber, setSignUpNumber] = useState(''); // 인증번호 입력
  const [authcode, setAuthCode] = useState(''); // 인증번호 저장
  const [isCodeValid, setIsCodeValid] = useState(false); // 인증번호 검사
  const { showModal, setShowModal } = useStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isCodeValid) {
      setErrorMessage('유효한 가입코드를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/members`,
        {
          email: email,
          password: password,
          nickName: nickName,
        }
      );
      setShowModal(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCodeSend = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login/mailConfirm`,
        {
          email: email,
        }
      );
      setAuthCode(response.data);
      // res 한 authcode를 client에 저장합니다.
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignUpNumberChange = (e) => {
    setSignUpNumber(e.target.value);
  };

  const handleVerification = () => {
    if (authcode === signUpNumber) {
      // 저장된 authcode와 입력한 signupnumber가 일치한지, 아닌지 검사.
      setIsCodeValid(true);
    } else {
      setIsCodeValid(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <JoinBox>
      <div>
        <h1>회원가입</h1>
        <p>계정이 이미 있으신가요?</p>
        <Link to="/account/login">로그인</Link>
      </div>
      <InputForm>
        <form onSubmit={handleSignUp} method="post">
          <AuthInput>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
              onKeyDown={handleKeyDown}
            />
            <SendBtn onClick={handleCodeSend} method="post">
              코드보내기
            </SendBtn>
          </AuthInput>

          <AuthInput>
            <input
              type="text"
              id="signupnumber"
              name="signupnumber"
              value={signUpNumber}
              onChange={handleSignUpNumberChange}
              placeholder="가입코드를 입력해주세요"
              required
              onKeyDown={handleKeyDown}
            />
            <SendBtn onClick={handleVerification}>인증하기</SendBtn>
            {isCodeValid ? (
              <p className="ok">유효한 가입코드입니다.</p>
            ) : (
              <p className="no">유효하지 않은 가입코드입니다.</p>
            )}
          </AuthInput>

          <div>
            <input
              type="text"
              id="nickName"
              name="nickName"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              pattern="^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,10}$"
              title="닉네임은 특수문자를 제외한 2~10자리여야 합니다."
              placeholder="닉네임을 입력하세요."
              required
            />
          </div>

          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
              title="비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
              placeholder="희망하는 비밀번호를 입력해주세요."
              required
            />
          </div>

          <div>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호 확인"
              required
            />
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="right">
            <FilledBtns type="submit" method="post">
              회원가입
            </FilledBtns>
          </div>
        </form>
      </InputForm>
      {showModal ? <Modal /> : null}
    </JoinBox>
  );
}

export default SignUpForm;
