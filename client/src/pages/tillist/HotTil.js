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
  const memberId = localStorage.getItem('memberId');
  const { data, isLoading, getHotTilData } = useHotTilListStore();

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/hotTil/list?`;

    if (memberId) {
      url += `member_id=${memberId}`;
    }
    getHotTilData(url);
  }, [isLogin, memberId]);

  if (isLoading) return <LoadingImage />;

  return (
    <div>
      <TilWrapper>
        <TitleH1>가장 인기있는 틸</TitleH1>
      </TilWrapper>
      {data && data.length > 8 ? (
        <HotTilSwiper data={data.slice(0, 8)} memberId={memberId} />
      ) : (
        data && <HotTilSwiper data={data} memberId={memberId} />
      )}
      <TilWrapper>
        <HotTilListWrapper>
          <TilCardWrapper>
            {!data && <LoadingImage />}
            {data && data.length > 9
              ? data.slice(8).map((data) => (
                  <li key={data.tilId}>
                    <TilCard data={data} memberId={memberId} />
                  </li>
                ))
              : null}
          </TilCardWrapper>
        </HotTilListWrapper>
      </TilWrapper>
    </div>
  );
}

export default HotTil;
