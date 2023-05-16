import styled from 'styled-components';
import { HeaderLink } from '../../../default/styled';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
`;
const ModalView = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: white;
  width: 420px;
  height: 357px;
  background: #ffffff;

  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  box-sizing: border-box;
  padding: 40px;
`;

export function Modal() {
  const [setShowModal] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setShowModal(false);
    navigate('/main');
  };
  return (
    <ModalBackdrop>
      <ModalView
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <h1>
          환영합니다!
          <br /> 바람쐬고오겠습니다 45분까지 복귀하도록 하겠습니다 !
        </h1>
        <HeaderLink onClick={closeModal}>로그인 하러가기</HeaderLink>
      </ModalView>
    </ModalBackdrop>
  );
}
