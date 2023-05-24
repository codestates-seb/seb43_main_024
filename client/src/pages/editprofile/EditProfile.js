import { useState } from 'react';

import styled from 'styled-components';

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function EditProfile() {
  const [newNickName, setNewNickName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newAboutMe, setNewAboutMe] = useState('');

  // 값 변경 모음

  const handleNickNameChange = (event) => {
    setNewNickName(event.target.value);
  };

  const handleAboutMeChange = (event) => {
    setNewAboutMe(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  // api요청 모음

  const handleUpdateNickName = () => {
    const url = '/mypage/nickname';
    const token = localStorage.getItem('token');

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newNickName }),
    })
      .then((response) => response.json())
      .then((data) => {
        // 처리할 로직 작성
        console.log('닉네임 업데이트 성공:', data);
      })
      .catch((error) => {
        // 에러 처리 로직 작성
        console.error('닉네임 업데이트 실패:', error);
      });
  };

  const handleUpdateAboutMe = () => {
    const url = '/mypage/about-me';
    const token = localStorage.getItem('token');

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newAboutMe }),
    })
      .then((response) => response.json())
      .then((data) => {
        // 처리할 로직 작성
        console.log('자기소개 업데이트 성공:', data);
      })
      .catch((error) => {
        // 에러 처리 로직 작성
        console.error('자기소개 업데이트 실패:', error);
      });
  };

  const handleUpdatePassword = () => {
    const url = '/mypage/password';
    const token = localStorage.getItem('token');

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        // 처리할 로직 작성
        console.log('비밀번호 업데이트 성공:', data);
      })
      .catch((error) => {
        // 에러 처리 로직 작성
        console.error('비밀번호 업데이트 실패:', error);
      });
  };

  return (
    <EditWrapper>
      <div>
        <h1>닉네임 변경</h1>
        <textarea
          value={newNickName}
          onChange={handleNickNameChange}
          placeholder="변경할 닉네임"
        />
        <button onClick={handleUpdateNickName}>업데이트</button>
      </div>

      <div>
        <h1>자기소개 변경</h1>
        <textarea
          value={newAboutMe}
          onChange={handleAboutMeChange}
          placeholder="변경할 자기소개"
        />
        <button onClick={handleUpdateAboutMe}>업데이트</button>
      </div>

      <div>
        <h1>비밀번호 변경</h1>
        <input
          type="password"
          value={newPassword}
          onChange={handlePasswordChange}
          placeholder="변경할 비밀번호"
        />
        <button onClick={handleUpdatePassword}>업데이트</button>
      </div>
    </EditWrapper>
  );
}
