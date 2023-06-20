import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../API'; // API.js 파일의 경로에 맞게 import
import useStore from '../../default/useStore';
import WarningIcon from '../../default/image/icoWarning.svg';
import CheckIcon from '../../default/image/icoCheck.svg';
import {
  GrayOutlineBtns,
  GrayFilledBtns,
  EditProfileBox,
  LoginWrap,
  AccountWrapper,
  InputForm,
  AuthInput,
  SendBtn,
  FilledBtns,
  GetBackBtn,
  ModalIcon,
} from '../../default/styled';

export function EditProfile() {
  const [newNickName, setNewNickName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newAboutMe, setNewAboutMe] = useState('');
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 추가

  const openModal = useStore((state) => state.openModal);
  const closeModal = useStore((state) => state.closeModal);

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
        // console.log('닉네임 업데이트 성공');
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
        // console.log('자기소개 업데이트 성공');
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
        // console.log('비밀번호 업데이트 성공');
      }
      openModal({
        icon: <ModalIcon src={CheckIcon} alt="완료 아이콘" />,
        title: '수정 완료!',
        content: '회원정보가 수정 되었습니다.',
        buttons: [
          <GrayOutlineBtns
            key="confirmButton"
            onClick={() => {
              closeModal();
              navigate('/profile/mytil');
              window.location.reload();
            }}
          >
            확인
          </GrayOutlineBtns>,
        ],
      });
    } catch (error) {
      alert('회원 수정과정에 문제가 발생하였습니다.');
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file); // 이미지 파일 상태 업데이트
  };

  const uploadProfileImage = async () => {
    try {
      const formData = new FormData();
      formData.append('imageFile', imageFile);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer {JWT}`, // JWT 값을 적절히 대체해야 합니다
        },
      };

      await API.post('/uploadProfileImage', formData, config);

      openModal({
        icon: <ModalIcon src={CheckIcon} alt="완료 아이콘" />,
        title: '수정 완료!',
        content: '회원정보가 수정 되었습니다.',
        buttons: [
          <GrayOutlineBtns
            key="confirmButton"
            onClick={() => {
              closeModal();
              navigate('/profile/mytil');
              window.location.reload();
            }}
          >
            확인
          </GrayOutlineBtns>,
        ],
      });
    } catch (error) {
      alert('회원 수정과정에 문제가 발생하였습니다.');
    }
  };

  const handleUpdateImage = () => {
    uploadProfileImage();
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
      openModal({
        icon: <ModalIcon src={CheckIcon} alt="완료 아이콘" />,
        title: '탈퇴가 완료 되었습니다.',
        content: '다음에 또 만나요!',
        buttons: [
          <GrayFilledBtns
            key="Button"
            onClick={() => {
              closeModal(); // 회원 탈퇴 후 로그인 페이지로 이동
              navigate('/');
              window.location.reload();
            }}
          >
            메인으로 돌아가기
          </GrayFilledBtns>,
        ],
      });
    } catch (error) {
      alert('회원 수정 과정에 문제가 발생하였습니다.');
    }
  };

  const handleOpenModalDeleteAccount = () => {
    openModal({
      icon: <ModalIcon src={WarningIcon} alt="경고 아이콘" />,
      title: '정말로 탈퇴 하시겠습니까?',
      content: '가입하신 계정이 삭제됩니다.',
      buttons: [
        <GrayOutlineBtns key="cancelButton" onClick={closeModal}>
          취소
        </GrayOutlineBtns>,
        <GrayFilledBtns key="Button" onClick={handleDeleteAccount}>
          확인
        </GrayFilledBtns>,
      ],
    });
  };

  return (
    <AccountWrapper bgGray edit>
      <LoginWrap mypage>
        <InputForm>
          <h1>내 정보 수정</h1>
          <EditProfileBox>
            <span>프로필 이미지 변경</span>
            <AuthInput>
              <input
                type="file"
                accept=".jpg, .png"
                onChange={handleImageChange}
              />
              <SendBtn onClick={handleUpdateImage}>이미지 업데이트</SendBtn>
            </AuthInput>

            <span>닉네임 변경</span>
            <AuthInput>
              <input
                value={newNickName}
                onChange={(event) => handleInputChange(event, setNewNickName)}
                placeholder="변경할 닉네임"
              />
            </AuthInput>

            <span>자기소개 변경</span>
            <AuthInput>
              <textarea
                value={newAboutMe}
                onChange={(event) => handleInputChange(event, setNewAboutMe)}
                placeholder="변경할 자기소개"
              />
            </AuthInput>

            <span>비밀번호 변경</span>
            <AuthInput>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => handleInputChange(event, setNewPassword)}
                placeholder="변경할 비밀번호"
              />
            </AuthInput>
            <div className="right">
              <GetBackBtn to="/profile/mytil">취소하기</GetBackBtn>
              <FilledBtns onClick={handleUpdate}>업데이트</FilledBtns>
            </div>
            <button className="grayTxt" onClick={handleOpenModalDeleteAccount}>
              회원탈퇴
            </button>
          </EditProfileBox>
        </InputForm>
      </LoginWrap>
    </AccountWrapper>
  );
}
