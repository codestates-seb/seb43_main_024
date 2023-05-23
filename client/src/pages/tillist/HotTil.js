import { useEffect } from 'react';
import { useHotTilListStore } from '../../default/tilComponents/useTilStore';
import useStore from '../../default/useStore';
import HotTilSwiper from './component/HotTilSwiper';
import TilCard from '../../default/tilComponents/TilCard';
import styled from 'styled-components';
import LoadingImage from '../../default/LoadingImage';
import {
  TilWrapper,
  TilListWrapper,
  TilCardWrapper,
  TitleH1,
} from '../../default/styled';

const HotTilListWrapper = styled(TilListWrapper)`
  margin-bottom: 100px;
`;

function HotTil() {
  const isLogin = useStore((state) => state.isLogin);
  const { data, isLoading, getHotTilData } = useHotTilListStore();

  const userId = null;
  let url = `${process.env.REACT_APP_API_URL}/til/list`;

  if (isLogin && userId) {
    url = `${process.env.REACT_APP_API_URL}/til/list?member_id=${userId}`;
  }

  useEffect(() => {
    getHotTilData(url);
  }, [url]);

  if (isLoading) return <LoadingImage />;

  const HotTilSwiperData = data.slice(0, 10);
  const HotTilData = data.slice(10, 30);

  return (
    <div>
      <TilWrapper>
        <TitleH1>가장 인기있는 틸</TitleH1>
      </TilWrapper>
      <HotTilSwiper data={HotTilSwiperData} />
      <TilWrapper>
        <HotTilListWrapper>
          <TilCardWrapper>
            {data.length === 0 && <LoadingImage />}
            {HotTilData &&
              HotTilData.map((data) => (
                <li key={data.tilId}>
                  <TilCard data={data} />
                </li>
              ))}
          </TilCardWrapper>
        </HotTilListWrapper>
      </TilWrapper>
    </div>
  );
}

export default HotTil;
