import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useTilStore } from '../../default/tilComponents/useTilStore';
import useStore from '../../default/useStore';
import styled from 'styled-components';
import {
  TilWrapper,
  GrayOutlineBtns,
  GrayFilledBtns,
  ModalIcon,
} from '../../default/styled';
import PostContent from './components/PostContent';
import WarningIcon from '../../default/image/icoWarning.svg';
import HotTilTop from '../tillist/component/HotTilTop';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 70px 0px 30px 0px;
  @media (max-width: 900px) {
    margin: 70px 0px 20px 0px;
  }
`;

const Button = styled.button`
  margin-left: 15px;
  font-size: 15px;
  color: var(--brand-color);
  font-weight: bold;
  &:hover {
    color: var(--color-darkgreen);
  }
  @media (max-width: 900px) {
    margin-left: 13px;
    font-size: 13px;
  }
`;

const H1 = styled.h1`
  @media (max-width: 900px) {
    font-size: 21px;
  }
`;

const UnderPost = styled.div`
  margin-bottom: 80px;
`;

function TilPost() {
  const { tilId } = useParams();
  const navigate = useNavigate();
  const { data, getData, deleteData } = useTilStore();
  const openModal = useStore((state) => state.openModal);
  const closeModal = useStore((state) => state.closeModal);
  const memberId = Number(localStorage.getItem('memberId'));
  const tilData = useTilStore((state) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      await getData(tilId);
    };
    fetchData().then(() => {
      console.log(data);
      console.log('tilData :', tilData.memberId);
      console.log('memberId :', memberId);
    });
  }, [tilId, getData, memberId]);

  const handleDelete = () => {
    deleteData(tilId);
    navigate('/til/list');
    closeModal();
  };

  const handleOpenModal = () => {
    openModal({
      icon: <ModalIcon src={WarningIcon} alt="경고 아이콘" />,
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

  if (!tilData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TilWrapper>
        <div>
          {tilData && tilData.memberId && tilData.memberId === memberId && (
            <ButtonWrapper>
              <Link to={`/edit/${tilId}`}>
                <Button type="button">수정</Button>
              </Link>
              <Button type="button" onClick={handleOpenModal}>
                삭제
              </Button>
            </ButtonWrapper>
          )}
          {tilData && <PostContent data={tilData} />}
        </div>
        <H1>요즘 핫한 틸</H1>
      </TilWrapper>
      <UnderPost>
        <HotTilTop />
      </UnderPost>
    </div>
  );
}

export default TilPost;
