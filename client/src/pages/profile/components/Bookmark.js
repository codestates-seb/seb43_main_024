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
  const bookmarkTilData = data.map((item) => item.til);
  console.log(bookmarkTilData);

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
        myBookmarkData={myBookmarkData}
        startPage={startPage}
        endPage={endPage}
        setCurrentPage={setCurrentPage}
      >
        {bookmarkTilData &&
          bookmarkTilData.map((data) => (
            <li key={bookmarkTilData.tilId}>
              <TilCard
                data={{ ...data, checkBookmark: true }}
                memberId={memberId}
                checkBookmark={true}
              />
            </li>
          ))}
      </TilList>
    </>
  );
}
