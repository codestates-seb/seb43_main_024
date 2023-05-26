import { useEffect } from 'react';
import { useMyBookmarkStore } from '../../../default/tilComponents/useTilStore';
import LoadingImage from '../../../default/LoadingImage';
import TilCard from '../../../default/tilComponents/TilCard';
import TilList from '../../../default/tilComponents/TilList';
import useStore from '../../../default/useStore';

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
      {data.length === 0 && <LoadingImage />}
      <TilList
        currentPage={currentPage}
        totalPages={totalPages}
        startPage={startPage}
        endPage={endPage}
        setCurrentPage={setCurrentPage}
      >
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
      </TilList>
    </>
  );
}
