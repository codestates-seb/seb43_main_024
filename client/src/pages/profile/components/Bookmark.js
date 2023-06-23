import { useEffect } from 'react';
import { useMyBookmarkStore } from '../../../default/tilComponents/useTilStore';
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

export function Bookmark() {
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
    myBookmarkData,
  } = useMyBookmarkStore();

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/members/${memberId}/bookmark`;
    myBookmarkData(currentPage, url);
  }, [currentPage, isLogin, memberId]);
  if (isLoading) return <LoadingImage />;

  return (
    <>
      {data.length === 0 && (
        <NoPosts>
          <img src={Blogging} alt="no-til" />
          <h1>등록한 북마크가 없습니다! 마음에 드는 TIL을 등록해보세요!</h1>
          <LinkFilledBtns to="/til/list">탐색페이지로 이동 →</LinkFilledBtns>
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
            data.map((item) => (
              <li key={item.tilId}>
                <TilCard
                  data={{ ...item, checkBookmark: true }}
                  memberId={memberId}
                  checkBookmark={true}
                />
              </li>
            ))}
        </TilCardWrapper>
      </TilList>
    </>
  );
}
