import { useEffect } from 'react';
import { useTilListStore } from '../../default/tilComponents/useTilStore';
import { TilWrapper, TitleH1 } from '../../default/styled';
import HotTilNav from './component/HotTilNav';
import HotTilSwiper from './component/HotTilSwiper';
import TilList from '../../default/tilComponents/TilList';
import TilCard from '../../default/tilComponents/TilCard';
import LoadingImage from '../../default/LoadingImage';

function HotTil() {
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
  }, [currentPage, fetchData]);

  const HotTilData = data.slice(0, 10);

  return (
    <div>
      <TilWrapper>
        <TitleH1>가장 인기있는 틸</TitleH1>
      </TilWrapper>
      <HotTilSwiper data={HotTilData} />
      <TilWrapper>
        <HotTilNav />
        {isLoading && !data && <LoadingImage />}
        <TilList
          data={data}
          currentPage={currentPage}
          totalPages={totalPages}
          startPage={startPage}
          endPage={endPage}
          fetchData={fetchData}
          setCurrentPage={setCurrentPage}
        >
          {data &&
            data.map((data) => (
              <li key={data.tilId}>
                <TilCard data={data} />
              </li>
            ))}
        </TilList>
      </TilWrapper>
    </div>
  );
}

export default HotTil;
