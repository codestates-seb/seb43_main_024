import { useEffect } from 'react';
import { useMyTilStore } from '../../../default/tilComponents/useTilStore';
import LoadingImage from '../../../default/LoadingImage';
import TilCard from '../../../default/tilComponents/TilCard';
import TilList from '../../../default/tilComponents/TilList';
import useStore from '../../../default/useStore';

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
      {data.length === 0 && <LoadingImage />}
      <TilList
        currentPage={currentPage}
        totalPages={totalPages}
        startPage={startPage}
        endPage={endPage}
        setCurrentPage={setCurrentPage}
      >
        {data &&
          data.map((data) => (
            <li key={data.tilId}>
              <TilCard data={data} memberId={memberId} />
            </li>
          ))}
      </TilList>
    </>
  );
}
