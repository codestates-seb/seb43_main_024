import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';
import TilBookmark from './TilBookmark';
import { UserInfo } from '../styled';
import { ReactComponent as View } from '../image/view.svg';

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

function TilCard({ data, memberId }) {
  const {
    tilId,
    tilTitle,
    tilContent,
    tilViewCount,
    createdAt,
    memberNickname,
    memberImg,
    checkBookmark,
  } = data;
  const formattedDate = format(new Date(createdAt), 'yyyy.MM.dd');

  return (
    <CardWrapper>
      <CardInfo>
        <P>{formattedDate}</P>
        <TilBookmark
          checkBookmark={checkBookmark}
          memberId={memberId}
          tilId={tilId}
        />
      </CardInfo>
      <Link to={`/til/${tilId}`}>
        <H2>{tilTitle}</H2>
        <CardContent>{tilContent}</CardContent>
        <CardInfo>
          <CardUserInfo>
            <Img src={memberImg} alt={memberNickname} />
            <p className="user-name">{memberNickname}</p>
          </CardUserInfo>
          <CardUserInfo>
            <View className="view-img" />
            <P>{tilViewCount}</P>
          </CardUserInfo>
        </CardInfo>
      </Link>
    </CardWrapper>
  );
}

export default TilCard;