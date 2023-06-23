import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useMyTilStore } from '../../../default/tilComponents/useTilStore';
import LoadingImage from '../../../default/LoadingImage';
import TilCard from '../../../default/tilComponents/TilCard';
import TilList from '../../../default/tilComponents/TilList';
import useStore from '../../../default/useStore';
import Blogging from '../../../default/image/Blogging-cuate.svg';
import {
  NoPosts,
  LinkFilledBtns,
  TilCardWrapper,
} from '../../../default/styled';

export function MyTIL() {
  const isLogin = useStore((state) => state.isLogin);
  const memberId = localStorage.getItem('memberId');
  const {
    data,
    isLoading,
    currentPage,
    totalPages,
    startPage,
    endPage,
    setCurrentPage,
    myTilData,
  } = useMyTilStore();

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/members/${memberId}/til`;
    myTilData(currentPage, url);
  }, [currentPage, isLogin, memberId]);

  if (isLoading) return <LoadingImage />;

  return (
    <>
      {data.length === 0 && (
        <NoPosts>
          <img src={Blogging} alt="no-til" />
          <h1>작성한 TIL이 없습니다! 지금 작성하러 가볼까요?</h1>
          <LinkFilledBtns to="/write">TIL 작성하러 가기 →</LinkFilledBtns>
        </NoPosts>
      )}
      <TilList
        currentPage={currentPage}
        totalPages={totalPages}
        startPage={startPage}
        endPage={endPage}
        setCurrentPage={setCurrentPage}
      >
        <TilCardWrapper mypage>
          {data &&
            data.map((data) => (
              <li key={data.tilId}>
                <TilCard data={data} memberId={memberId} />
              </li>
            ))}
        </TilCardWrapper>
      </TilList>
    </>
  );
}
