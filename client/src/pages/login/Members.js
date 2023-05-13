import { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/members', {
        email: email,
        password: password,
        nickName: nickName,
      });

      //axios.post 함수의 결과를 response 변수에 저장
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 형식이 올바르지 않습니다."
          required
        />
      </div>

      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
          title="비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
          required
        />
      </div>

      <div>
        <label htmlFor="nickName">닉네임</label>
        <input
          type="text"
          id="nickName"
          name="nickName"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          pattern="^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,10}$"
          title="닉네임은 특수문자를 제외한 2~10자리여야 합니다."
          required
        />
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
}

export default SignUpForm;
