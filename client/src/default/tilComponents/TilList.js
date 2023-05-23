import styled, { css } from 'styled-components';
import { TilListWrapper, TilCardWrapper } from '../styled';
import LeftArrow from '../image/leftArrow.svg';
import RightArrow from '../image/rightArrow.svg';
import LeftArrowHover from '../image/leftArrowHover.svg';
import RightArrowHover from '../image/rightArrowHover.svg';

const PageButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 50px 0px;
`;

const PageButton = styled.button`
  margin: 5px;
  width: 26px;
  height: 26px;
  background-size: cover;
  font-weight: bold;
  background-color: ${(props) =>
    props.selected ? 'var(--brand-color)' : null};
  border-radius: ${(props) => (props.selected ? '50%' : null)};
  color: ${(props) =>
    props.selected ? 'var(--color-white)' : 'var(--color-black)'};
  &:hover {
    background-color: ${(props) =>
      props.selected ? 'var(--color-darkgreen)' : null};
    color: ${(props) =>
      props.selected ? 'var(--color-white)' : 'var(--brand-color)'};
  }
`;

const PageArrowButton = styled.button`
  background-size: cover;
  margin: 12px;
  width: 8px;
  height: 12px;
  ${(props) =>
    props.left &&
    css`
      background-image: url(${LeftArrow});
      &:hover {
        background-image: url(${LeftArrowHover});
      }
    `}
  ${(props) =>
    props.right &&
    css`
      background-image: url(${RightArrow});
      &:hover {
        background-image: url(${RightArrowHover});
      }
    `}
`;

function TilList({
  currentPage,
  totalPages,
  fetchData,
  setCurrentPage,
  endPage,
  startPage,
  children,
}) {
  const handlePageClick = (pageNum) => {
    if (pageNum !== currentPage) {
      setCurrentPage(pageNum);
      fetchData(pageNum);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <TilListWrapper>
      {/*TilCard를 prop으로 전달 */}
      <TilCardWrapper>{children}</TilCardWrapper>
      <PageButtonWrapper>
        <PageArrowButton left onClick={handlePrevClick}></PageArrowButton>
        {pageNumbers &&
          pageNumbers.map((pageNum) => (
            <PageButton
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              selected={pageNum === currentPage}
            >
              {pageNum}
            </PageButton>
          ))}
        <PageArrowButton right onClick={handleNextClick}></PageArrowButton>
      </PageButtonWrapper>
    </TilListWrapper>
  );
}

export default TilList;
