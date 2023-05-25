import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../../API';

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
    <>
      <form onSubmit={handleSubmit} method="post">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요. (최소 8자 이상, 영문+숫자 조합)"
            required
          />
        </div>
        <button type="submit">제출하기</button>
      </form>
    </>
  );
}
