import { useEffect } from 'react';
import { useTilListStore } from '../../default/tilComponents/useTilStore';
import useStore from '../../default/useStore';
import { TilWrapper, TitleH1 } from '../../default/styled';
import TilList from '../../default/tilComponents/TilList';
import TilCard from '../../default/tilComponents/TilCard';
import LoadingImage from '../../default/LoadingImage';

function FollowTil() {
  const isLogin = useStore((state) => state.isLogin);
  const {
    data,
    isLoading,
    currentPage,
    totalPages,
    startPage,
    endPage,
    fetchData,
    setCurrentPage,
  } = useTilListStore();

  const userId = null;
  const url =
    isLogin && userId
      ? `${process.env.REACT_APP_API_URL}/til/list?member_id=${userId}&`
      : null;

  useEffect(() => {
    fetchData(currentPage, url);
  }, [currentPage, url]);

  if (isLoading) return <LoadingImage />;

  return (
    <TilWrapper>
      <div>
        <TitleH1>내가 팔로우한 틸</TitleH1>
        {data.length === 0 && <LoadingImage />}
        <TilList
          currentPage={currentPage}
          totalPages={totalPages}
          fetchData={fetchData}
          startPage={startPage}
          endPage={endPage}
          setCurrentPage={setCurrentPage}
        >
          {data &&
            data.map((data) => (
              <li key={data.tilId}>
                <TilCard data={data} />
              </li>
            ))}
        </TilList>
      </div>
    </TilWrapper>
  );
}

export default FollowTil;
