import { useState, useEffect } from 'react';
import { useTilListStore } from '../../default/tilComponents/useTilStore';
import styled from 'styled-components';
import { TilWrapper, TilFlexContainer } from '../../default/styled';
import TilList from '../../default/tilComponents/TilList';
import TilCard from '../../default/tilComponents/TilCard';
import Search from './component/Search';
import LoadingImage from '../../default/LoadingImage';

const SearchResult = styled.div`
  margin-top: 20px;
`;

function SearchTil() {
  //const { keyword } = useParams();
  const [keyword, setKeyword] = useState('');
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

  const handleSearchSubmit = (keyword) => {
    setKeyword(keyword);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <TilWrapper>
      <TilFlexContainer>
        <Search onSubmit={handleSearchSubmit} />
        {keyword && (
          <SearchResult>
            <h2>{keyword}에 대한 결과입니다.</h2>
          </SearchResult>
        )}
      </TilFlexContainer>
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
    </TilWrapper>
  );
}

export default SearchTil;
