import { format } from 'date-fns';
import { useEffect } from 'react';
import styled from 'styled-components';
import { PostComponent, UserInfo, MemberImg } from '../../../default/styled';
import { useBookmarkStore } from '../../../default/tilComponents/useTilStore';
import MDEditor from '@uiw/react-md-editor';
import TilTierText from '../../../default/tilComponents/TilTierText';

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 900px) {
    > h1 {
      font-size: 21px;
      margin-bottom: 10px;
    }
  }
`;

const UserContainer = styled(TitleWrapper)`
  margin: 23px 0px;
  color: var(--color-gray5);
  font-weight: bold;
  @media (max-width: 900px) {
    margin: 17px 0px;
    > p {
      font-size: 12px;
      @media (max-width: 500px) {
        font-size: 11px;
      }
    }
  }
`;

const BodyWrapper = styled.div`
  padding: 40px 0px;
  border-top: 1px solid var(--color-title-linegray);
  line-height: 21px;
  @media (max-width: 900px) {
    padding: 30px 0px;
  }
`;

const UserName = styled.p`
  font-weight: bold;
  margin-right: 4px;
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

function PostContent({ data, tilId }) {
  const { getCheckBookmarkData } = useBookmarkStore();
  const memberId = localStorage.getItem('memberId');
  const {
    tilTitle,
    tilContent,
    createdAt,
    tilTier,
    memberNickname,
    memberProfileImage,
  } = data;
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
            <MemberImg
              post
              src={
                memberProfileImage ? memberProfileImage : '/defaultprofile.png'
              }
              alt={memberNickname}
            />
            <UserName>{memberNickname}</UserName>
            <TilTierText tilTier={tilTier} textTil="til" size="15px" />
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
