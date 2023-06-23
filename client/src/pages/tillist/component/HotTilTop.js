import { useEffect } from 'react';
import { useHotTilListStore } from '../../../default/tilComponents/useTilStore';
import useStore from '../../../default/useStore';
import HotTilSwiper from './HotTilSwiper';
import LoadingImage from '../../../default/LoadingImage';

function HotTilTop() {
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
    <>
      {data && data.length > 8 ? (
        <HotTilSwiper data={data.slice(0, 8)} memberId={memberId} />
      ) : (
        data && <HotTilSwiper data={data} memberId={memberId} />
      )}
    </>
  );
}

export default HotTilTop;
