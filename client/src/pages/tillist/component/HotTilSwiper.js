import { useState, useEffect } from 'react';
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { TilWrapper, PreNextButton } from '../../../default/styled';
import TilCard from '../../../default/tilComponents/TilCard';

SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

const SwiperWrapper = styled.section`
  position: relative;
  width: 100vw;
  height: 310px;
  margin-top: 30px;
  background-color: var(--light-background-color);
  @media (max-width: 1200px) {
    height: 280px;
  }
`;

const SwiperInner = styled(TilWrapper)`
  width: 1380px;
  padding: 14px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1400px) {
    width: 1240px;
  }
  @media (max-width: 1300px) {
    width: 900px;
  }
  @media (max-width: 1100px) {
    width: 640px;
  }
  @media (max-width: 700px) {
    width: 600px;
  }
  @media (max-width: 600px) {
    width: 350px;
  }
`;

const SlideContainer = styled(SwiperSlide)`
  height: 240px;
  display: flex;
  justify-content: center;
`;

const PreNextButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50px;
  height: 50px;
  @media (max-width: 1400px) {
    width: 35px;
    height: 35px;
  }
`;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0px;
  z-index: 1;
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    opacity: 0.5;
    transition: opacity 0.3s ease;
    &.swiper-pagination-bullet-active {
      opacity: 1;
      background-color: var(--color-gray8);
    }
  }
`;

function HotTilSwiper({ data, memberId }) {
  const [slideCount, setSlideCount] = useState(4);
  const isMobile = useMediaQuery({ maxWidth: 600 });

  useEffect(() => {
    const handelResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 1300) {
        setSlideCount(4);
      } else if (windowWidth >= 900 && windowWidth <= 1300) {
        setSlideCount(3);
      } else if (windowWidth >= 600 && windowWidth < 900) {
        setSlideCount(2);
      } else {
        setSlideCount(1);
      }
    };

    window.addEventListener('resize', handelResize);

    return () => {
      window.removeEventListener('resize', handelResize);
    };
  }, [slideCount]);

  return (
    <SwiperWrapper>
      <SwiperInner>
        <StyledPagination className="swiper-pagination" />
        <PreNextButtonWrapper className="my-swiper-prev">
          <PreNextButton pre />
        </PreNextButtonWrapper>
        <TilWrapper hotlist>
          <Swiper
            spaceBetween={3}
            slidesPerView={isMobile ? 1 : slideCount}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{
              prevEl: '.my-swiper-prev',
              nextEl: '.my-swiper-next',
            }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
              },
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
              el: '.swiper-pagination',
            }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {data.map((data) => {
              return (
                <SlideContainer key={data.tilId}>
                  <li>
                    <TilCard data={data} memberId={memberId} />
                  </li>
                </SlideContainer>
              );
            })}
          </Swiper>
        </TilWrapper>
        <PreNextButtonWrapper className="my-swiper-next">
          <PreNextButton next />
        </PreNextButtonWrapper>
      </SwiperInner>
    </SwiperWrapper>
  );
}

export default HotTilSwiper;
