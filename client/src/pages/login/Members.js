import { useState } from 'react';
import axios from 'axios';
import { InputForm } from './Login';
import { Modal } from './components/Modal';
import useStore from '../../default/useStore';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');

  const { showModal, setShowModal } = useStore();

  /**
   * 사용자 회원가입 폼 제출을 처리합니다.
   * 이메일, 비밀번호, 닉네임을 포함하는 POST 요청을 보냅니다.
   * 요청이 성공하면 응답 데이터를 콘솔에 기록합니다.
   * 에러가 발생하면 에러를 콘솔에 기록합니다.
   * @param {Event} e - 폼 제출 이벤트입니다.
   */
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/members', {
        email: email,
        password: password,
        nickName: nickName,
      });
      setShowModal(true);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <InputForm>
        <form onSubmit={handleSignUp}>
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
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
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

          <button type="submit">회원가입</button>
        </form>
      </InputForm>
      {showModal ? <Modal /> : null}
    </>
  );
}

export default SignUpForm;
