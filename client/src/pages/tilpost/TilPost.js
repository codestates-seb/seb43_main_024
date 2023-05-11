import styled from 'styled-components';
import '../../default/style.css';
import { TilWrapper, PostComponent, UserInfo } from '../../default/styled';
//import { ReactComponent as Bookmark } from '../../default/image/bookmark.svg';
import { ReactComponent as CheckBookmark } from '../../default/image/checkBookmark.svg';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
  > button {
    margin-left: 10px;
    font-size: 15px;
    color: var(--brand-color);
    font-weight: bold;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  > .bookmark {
    width: 17px;
    height: 21px;
  }
`;

const UserContainer = styled(TitleWrapper)`
  margin: 25px 0px;
  color: var(--color-gray5);
  font-weight: bold;
`;

const BodyWrapper = styled.div`
  padding: 40px 0px;
  border-top: 1px solid var(--color-title-linegray);
  line-height: 21px;
`;

function TilPost() {
  return (
    <TilWrapper>
      <div>
        <ButtonWrapper>
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </ButtonWrapper>
        <PostComponent>
          <div>
            <TitleWrapper>
              <h1>
                개발자가 ChatGPT 사용하는 법 (ChatGPT와 함께 프론트앤드 TDD 학습
                로드맵 만들어보기)
              </h1>
              <CheckBookmark className="bookmark" />
            </TitleWrapper>
            <UserContainer>
              <UserInfo>
                <p className="user-name">userName</p>
                <p>(12Til 🐥)</p>
              </UserInfo>
              <p>2023년 5월 4일</p>
            </UserContainer>
          </div>
          <BodyWrapper>
            안녕하세요. 저는 개발자로 일한 지 1년이 조금 넘은 풀스택
            개발자입니다. 저희 회사에서는 주제 중심 스터디라는 스터디 방식을
            운영하고 있는데요. 한 사람이 약 4~6주 정도 진행할 스터디 주제를
            가져오고, 스터디를 같이 진행할 사람들을 모아 학습을 진행하는
            방식입니다. <br />
            어느 날 저는 팀원들과 함께 프론트엔드 TDD를 공부해보면 좋겠다는
            생각이 들었고, 구글에 TDD를 검색을 해보았습니다. 그러나 TDD를 왜
            해야 하는지나 간단한 예시만을 다룬 글 혹은 유료 강의들이
            대부분이었습니다. 그래서 프론트엔드 TDD 학습을 어떻게 진행해야 할지
            막막했습니다. <br />
            물론 강의를 듣고 학습 커리큘럼을 작성하여 팀원들과 함께 진행할 수도
            있었겠지만, 저는 제 생각을 글로 표현하는 것을 잘 못 하기에 좋은
            강의를 들어도 좋은 스터디를 준비하기 어렵다는 것을 인지하고
            있었습니다. 그런 고민을 하던 와중에 갑자기 ChatGPT와 함께 프론트엔드
            TDD에 대한 학습 커리큘럼을 만들어보면 어떨까 하는 아이디어가
            떠올랐습니다.
          </BodyWrapper>
        </PostComponent>
      </div>
    </TilWrapper>
  );
}

export default TilPost;
