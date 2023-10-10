import styled from 'styled-components';
import { TilFlexContainer } from './styled';
import loading from './image/loading.gif';

const LoadingImg = styled.div`
  width: 100px;
  height: 100px;
  margin-top: 100px;
  background-image: url(${loading});
  @media (max-width: 500px) {
    width: 30px;
    height: 30x;
  }
`;

function LoadingImage() {
  return (
    <TilFlexContainer>
      <LoadingImg />
    </TilFlexContainer>
  );
}

export default LoadingImage;
