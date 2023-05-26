import { format } from 'date-fns';
import { useEffect } from 'react';
import styled from 'styled-components';
import { PostComponent, UserInfo } from '../../../default/styled';
import { useBookmarkStore } from '../../../default/tilComponents/useTilStore';
import MDEditor from '@uiw/react-md-editor';

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
  const { getCheckBookmarkData } = useBookmarkStore();
  const memberId = localStorage.getItem('memberId');
  const { tilTitle, tilContent, createdAt, memberNickname } = data;
  const formattedDate = createdAt
    ? format(new Date(createdAt), 'yyyy.MM.dd')
    : '';

  useEffect(() => {
    getCheckBookmarkData(memberId, tilId);
  }, [memberId]);

  return (
    <PostComponent>
      <div>
        <TitleWrapper>
          <h1>{tilTitle}</h1>
        </TitleWrapper>
        <UserContainer>
          <UserInfo>
            <UserName>{memberNickname}</UserName>
          </UserInfo>
          <p>{formattedDate}</p>
        </UserContainer>
      </div>
      <BodyWrapper>
        <MDEditor.Markdown source={tilContent} />
      </BodyWrapper>
    </PostComponent>
  );
}

export default PostContent;
