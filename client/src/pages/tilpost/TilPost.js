import styled from 'styled-components';
import '../../default/style.css';
import { TilWrapper, PreNextButton } from '../../default/styled';
import PostContent from './components/PostContent';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 70px 0px 30px 0px;
  > button {
    margin-left: 15px;
    font-size: 15px;
    color: var(--brand-color);
    font-weight: bold;
    &:hover {
      color: var(--color-darkgreen);
    }
  }
`;

const PreNextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
`;

const PostButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PreContainer = styled(PostButtonWrapper)`
  flex-direction: column;
  margin-left: 13px;
`;

const NextContainer = styled(PreContainer)`
  margin: 0px 13px 0px 0px;
`;

const P = styled.p`
  margin-top: 7px;
  font-size: 15px;
  color: var(--color-black);
`;

function TilPost() {
  return (
    <TilWrapper>
      <div>
        <ButtonWrapper>
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </ButtonWrapper>
        <PostContent />
        <PreNextWrapper>
          <PostButtonWrapper>
            <PreNextButton pre type="button"></PreNextButton>
            <PreContainer>
              <p>이전 포스트</p>
              <P>타이틀입니다.</P>
            </PreContainer>
          </PostButtonWrapper>
          <PostButtonWrapper>
            <NextContainer>
              <p>다음 포스트</p>
              <P>타이틀입니다.</P>
            </NextContainer>
            <PreNextButton next type="button"></PreNextButton>
          </PostButtonWrapper>
        </PreNextWrapper>
      </div>
    </TilWrapper>
  );
}

export default TilPost;
