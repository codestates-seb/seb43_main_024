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
    let url = `${process.env.REACT_APP_API_URL}/til/list?`;

    if (memberId) {
      url += `member_id=${memberId}`;
    }
    getHotTilData(url);
  }, [isLogin, memberId]);

  if (isLoading) return <LoadingImage />;

  const HotTilSwiperData = data.slice(0, 8);

  return (
    <>
      <HotTilSwiper data={HotTilSwiperData} memberId={memberId} />
    </>
  );
}

export default HotTilTop;
