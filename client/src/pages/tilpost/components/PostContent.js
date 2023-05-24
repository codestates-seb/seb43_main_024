//import useStore from '../../../default/useStore';
import { format } from 'date-fns';
import styled from 'styled-components';
import { PostComponent, UserInfo } from '../../../default/styled';
import TilBookmark from '../../../default/tilComponents/TilBookmark';

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const UserContainer = styled(TitleWrapper)`
  margin: 23px 0px;
  color: var(--color-gray5);
  font-weight: bold;
`;

const BodyWrapper = styled.div`
  padding: 40px 0px;
  border-top: 1px solid var(--color-title-linegray);
  line-height: 21px;
`;

const UserName = styled.p`
  font-weight: bold;
  margin-right: 4px;
`;

function PostContent({ data, tilId }) {
  //const isLogin = useStore((state) => state.isLogin);
  const memberId = null;
  const { tilTitle, tilContent, createdAt, checkBookmark, memberNickname } =
    data;
  const formattedDate = createdAt
    ? format(new Date(createdAt), 'yyyy.MM.dd')
    : '';
  return (
    <PostComponent>
      <div>
        <TitleWrapper>
          <h1>{tilTitle}</h1>
          <TilBookmark
            width="17px"
            height="21px"
            checkBookmark={checkBookmark}
            memberId={memberId}
            tilId={tilId}
          />
        </TitleWrapper>
        <UserContainer>
          <UserInfo>
            <UserName>{memberNickname}</UserName>
            <p>(12Til 🐥)</p>
          </UserInfo>
          <p>{formattedDate}</p>
        </UserContainer>
      </div>
      <BodyWrapper>{tilContent}</BodyWrapper>
    </PostComponent>
  );
}

export default PostContent;
