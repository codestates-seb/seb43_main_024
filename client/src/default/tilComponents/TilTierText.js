import styled from 'styled-components';
import TilFry from '../image/tilFry.svg';
import TilEgg from '../image/tilEgg.svg';
import TilHatchling from '../image/tilHatchling.svg';
import TilChick from '../image/tilChick.svg';
import TilChicken from '../image/tilChicken.svg';
import TilDinosaur from '../image/tilDinosaur.svg';

const TilTierContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => (props.size ? props.size : '10px')};
  @media (max-width: 800px) {
    font-size: 10px;
  }
`;

const TilTierWrapper = styled.span`
  display: inline-block;
  margin-left: 2px;
  width: ${(props) => (props.size ? props.size : '12px')};
  height: ${(props) => (props.size ? props.size : '12px')};
`;

const TilTierImage = styled.img`
  width: 100%;
  height: 100%;
`;

function TilTierText({ tilTier, textTil, size }) {
  let emoji;

  if (tilTier >= 1 && tilTier <= 9) {
    emoji = <TilTierImage src={TilFry} alt="tiltier" />;
  } else if (tilTier >= 10 && tilTier <= 19) {
    emoji = <TilTierImage src={TilEgg} alt="tiltier" />;
  } else if (tilTier >= 20 && tilTier <= 49) {
    emoji = <TilTierImage src={TilHatchling} alt="tiltier" />;
  } else if (tilTier >= 50 && tilTier <= 99) {
    emoji = <TilTierImage src={TilChick} alt="tiltier" />;
  } else if (tilTier >= 100 && tilTier <= 199) {
    emoji = <TilTierImage src={TilChicken} alt="tiltier" />;
  } else if (tilTier >= 200) {
    emoji = <TilTierImage src={TilDinosaur} alt="tiltier" />;
  } else {
    emoji = '';
  }

  return (
    <>
      {tilTier && (
        <TilTierContainer size={size}>
          {textTil === 'tilday' ? '' : '('}
          {tilTier}
          {textTil}
          <TilTierWrapper size={size}>{emoji}</TilTierWrapper>
          {textTil === 'tilday' ? '' : ')'}
        </TilTierContainer>
      )}
    </>
  );
}

export default TilTierText;
