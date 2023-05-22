import { useEffect } from 'react';
import { useTilListStore } from '../../default/tilComponents/useTilStore';
import { TilWrapper, TitleH1 } from '../../default/styled';
import TilList from '../../default/tilComponents/TilList';
import TilCard from '../../default/tilComponents/TilCard';
import LoadingImage from '../../default/LoadingImage';

function FollowTil() {
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

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <TilWrapper>
      <div>
        <TitleH1>내가 팔로우한 틸</TitleH1>
        {isLoading && !data && <LoadingImage />}
        <TilList
          data={data}
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
