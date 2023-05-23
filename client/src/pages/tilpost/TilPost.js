import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTilStore } from '../../default/tilComponents/useTilStore';
import useStore from '../../default/useStore';
import styled from 'styled-components';
import {
  TilWrapper,
  PreNextButton,
  GrayOutlineBtns,
  GrayFilledBtns,
} from '../../default/styled';
import PostContent from './components/PostContent';
import WarningIcon from '../../default/image/icoWarning.svg';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 70px 0px 30px 0px;
`;

const Button = styled.button`
  margin-left: 15px;
  font-size: 15px;
  color: var(--brand-color);
  font-weight: bold;
  &:hover {
    color: var(--color-darkgreen);
  }
`;

const PreNextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 0px 100px;
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
  const { tilId } = useParams();
  const navigate = useNavigate();
  const { data, getData, deleteData } = useTilStore();
  const openModal = useStore((state) => state.openModal);
  const closeModal = useStore((state) => state.closeModal);

  useEffect(() => {
    getData(tilId);
  }, [tilId, getData]);

  console.log(tilId);
  console.log(data);

  const handleDelete = () => {
    deleteData(tilId);
    navigate('/til/list');
    closeModal();
  };

  const handleOpenModal = () => {
    openModal({
      icon: <img src={WarningIcon} alt="경고 아이콘" />,
      title: '정말로 삭제 하시겠습니까?',
      content: '작성한 게시물이 영구적으로 삭제됩니다.',
      buttons: [
        <GrayOutlineBtns key="cancelButton" onClick={closeModal}>
          취소
        </GrayOutlineBtns>,
        <GrayFilledBtns key="confirmButton" onClick={handleDelete}>
          확인
        </GrayFilledBtns>,
      ],
    });
  };

  return (
    <TilWrapper>
      <div>
        <ButtonWrapper>
          <Link to={`/edit/${tilId}`}>
            <Button type="button">수정</Button>
          </Link>
          <Button type="button" onClick={handleOpenModal}>
            삭제
          </Button>
        </ButtonWrapper>
        {data && <PostContent data={data} />}
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
