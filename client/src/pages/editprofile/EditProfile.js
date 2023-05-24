import { useState } from 'react';
import API from '../../API'; // API.js 파일의 경로에 맞게 import

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

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      if (newNickName) {
        await API.patch(
          '/mypage/nickname',
          { newNickName },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('닉네임 업데이트 성공');
      }

      if (newAboutMe) {
        await API.patch(
          '/mypage/about-me',
          { newAboutMe },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('자기소개 업데이트 성공');
      }

      if (newPassword) {
        await API.patch(
          '/mypage/password',
          { newPassword },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('비밀번호 업데이트 성공');
      }
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  return (
    <EditWrapper>
      <div>
        <h1>닉네임 변경</h1>
        <textarea
          value={newNickName}
          onChange={(event) => handleInputChange(event, setNewNickName)}
          placeholder="변경할 닉네임"
        />
      </div>

      <div>
        <h1>자기소개 변경</h1>
        <textarea
          value={newAboutMe}
          onChange={(event) => handleInputChange(event, setNewAboutMe)}
          placeholder="변경할 자기소개"
        />
      </div>

      <div>
        <h1>비밀번호 변경</h1>
        <input
          type="password"
          value={newPassword}
          onChange={(event) => handleInputChange(event, setNewPassword)}
          placeholder="변경할 비밀번호"
        />
      </div>

      <button onClick={handleUpdate}>업데이트</button>
    </EditWrapper>
  );
}
