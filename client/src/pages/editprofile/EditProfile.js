import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

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
        navigate('/profile');
      }
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const memberId = localStorage.getItem('memberId'); // memberId 가져오기
      await API.delete(`/members/${memberId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('회원 탈퇴 성공');
      localStorage.removeItem('token');
      localStorage.removeItem('memberId');
      localStorage.removeItem('username');
      navigate('/main'); // 회원 탈퇴 후 로그인 페이지로 이동
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
    }
  };

  return (
    <>
      <h1>이미지 수정</h1>
      <hr />
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
      <hr />
      <button onClick={handleDeleteAccount}>
        <h1>회원탈퇴</h1>
      </button>
    </>
  );
}
