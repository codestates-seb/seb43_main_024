import {
  MainWrapper,
  InnerWrapper,
  FlexContainer,
  PostLink,
} from '../default/styled';
import MainImg from '../default/MainImg.png';

function Main() {
  const todayTil = `2,308`;

  return (
    <MainWrapper>
      <InnerWrapper>
        <FlexContainer>
          <div>
            <h1>
              오늘 <span>{todayTil}</span>개의
              <br />
              새로운 TIL이 있어요!
            </h1>
            <p>
              또 다른 나의 공부습관! 정리하고, 동기를 유지하고, 목표를
              달성하세요!
            </p>
            <PostLink to="/">틸 작성하러 가기</PostLink>
          </div>

          <div>
            <img src={MainImg} alt="mainimg" />
          </div>
        </FlexContainer>
      </InnerWrapper>
    </MainWrapper>
  );
}

export default Main;
