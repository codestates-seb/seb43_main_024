import { useState } from 'react';
import styled from 'styled-components';
import { TilFlexContainer } from '../../../default/styled';
import TilCard from '../../../default/TilCard';
import { ReactComponent as LeftArrow } from '../../../default/image/leftArrow.svg';
import { ReactComponent as RightArrow } from '../../../default/image/rightArrow.svg';

const TilListWrapper = styled(TilFlexContainer)`
  justify-content: center;
  margin: 30px 0px;
`;

const TilCardWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const PageButtonWrapper = styled.div`
  display: flex;
  margin: 50px 0px;
`;

const PageButton = styled.button`
  margin: 5px;
  width: 26px;
  height: 26px;
  background-color: ${(props) =>
    props.selected ? 'var(--brand-color)' : null};
  border-radius: ${(props) => (props.selected ? '50%' : null)};
  color: ${(props) =>
    props.selected ? 'var(--color-white)' : 'var(--color-black)'};
  &:hover {
    scale: 120%;
    transition: 0.7s;
  }
`;

function TilList() {
  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
    { id: 14 },
    { id: 15 },
    { id: 16 },
    { id: 17 },
    { id: 18 },
    { id: 19 },
    { id: 20 },
  ];
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = data.slice(firstItem, lastItem);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <TilListWrapper>
      <TilCardWrapper>
        {currentItems.map((item) => (
          <TilCard key={item.id} />
        ))}
      </TilCardWrapper>
      <PageButtonWrapper>
        <PageButton onClick={handlePrevClick}>
          <LeftArrow />
        </PageButton>
        {pageNumbers.map((pageNum) => (
          <PageButton
            key={pageNum}
            onClick={() => handlePageClick(pageNum)}
            selected={pageNum === currentPage}
          >
            {pageNum}
          </PageButton>
        ))}
        <PageButton onClick={handleNextClick}>
          <RightArrow />
        </PageButton>
      </PageButtonWrapper>
    </TilListWrapper>
  );
}

export default TilList;
