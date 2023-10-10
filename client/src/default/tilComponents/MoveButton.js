import styled from 'styled-components';
import UpArrowButton from '../image/upArrow.svg';
import UpArrowHoverButton from '../image/upArrowHover.svg';

const MoveWrapper = styled.div`
  margin: 25px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 5;
  @media (max-width: 1200px) {
    margin: 10px;
    right: 10px;
    bottom: 20px;
  }
  @media (max-width: 900px) {
    margin: 5px;
    right: 5px;
  }
`;

const MoveTopButton = styled.button`
  background: transparent;
  border: none;
  width: 35px;
  height: 35px;
  background-image: url(${UpArrowButton});
  background-repeat: no-repeat;
  background-size: contain;
  transition: background-image 0.3s ease-in-out;
  &:hover {
    background-image: url(${UpArrowHoverButton});
  }
  @media (max-width: 500px) {
    width: 30px;
    height: 30px;
  }
`;

function MoveButton() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <MoveWrapper>
      <MoveTopButton onClick={scrollTop}></MoveTopButton>
    </MoveWrapper>
  );
}

export default MoveButton;
