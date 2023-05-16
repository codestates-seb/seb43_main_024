import styled from 'styled-components';
import '../default/style.css';
import { UserInfo } from '../default/styled';
//import { ReactComponent as Bookmark } from '../default/image/bookmark.svg';
import { ReactComponent as CheckBookmark } from '../default/image/checkBookmark.svg';
import { ReactComponent as View } from '../default/image/view.svg';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  box-sizing: border-box;
  width: 294px;
  height: 229px;
  padding: 30px;
  margin: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  &:hover {
    scale: 101%;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardContent = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  height: 65px;
  margin-bottom: 19px;
  overflow: hidden;
  font-size: 10px;
  color: var(--color-gray6);
  line-height: 16px;
`;

const CardUserInfo = styled(UserInfo)`
  font-size: 10px;
  > .user-name {
    font-weight: bold;
    margin-right: 2px;
  }
  > .view-img {
    margin-right: 4px;
  }
`;

const H2 = styled.h2`
  padding: 14px 0px;
  border-bottom: 1px solid var(--color-title-linegray);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
`;

const Img = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 4px;
`;

const P = styled.p`
  font-size: 10px;
  color: var(--color-gray8);
  font-weight: bold;
`;

function TilCard() {
  return (
    <li>
      <CardWrapper>
        <CardInfo>
          <P>2023.05.03</P>
          {/*<Bookmark />*/}
          <CheckBookmark />
        </CardInfo>
        <H2>
          개발자가 ChatGPT 사용하는 법 (ChatGPT와 함께 프론트앤드 TDD 학습
          로드맵 만들어보기)
        </H2>
        <CardContent>
          이번 미션에서 리액트와의 첫 만남을 가졌다. 첫 만남인 만큼 어색했고
          어려웠으나 리액트의 편리함 또한 느낄 수 있었던 미션이었다. 이제
          컴포넌트를 만들 수는 있다. 하지만 ‘컴포넌트를 잘! 만드는 것’을
          고민해야할 때라고 느꼈다. 잘 만들어진 컴포넌트의 특징은 역시 높은
          ‘재사용성’과 ‘예측 가능성’이라고 생각한다. 다른 개발자가 봐도 사용하기
          쉽도록 말이다.
        </CardContent>
        <CardInfo>
          <CardUserInfo>
            <Img
              src="https://lh3.googleusercontent.com/a/AGNmyxbDWZTRA18Nxi2ZXXDMgNucovxTvk_tZZxjLv5j=k-s256"
              alt="user-img"
            />
            <p className="user-name">userName</p>
            <p>(12Til 🐥)</p>
          </CardUserInfo>
          <CardUserInfo>
            <View className="view-img" />
            <P>263</P>
          </CardUserInfo>
        </CardInfo>
      </CardWrapper>
    </li>
  );
}

export default TilCard;
