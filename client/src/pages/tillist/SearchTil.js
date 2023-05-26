import { useState, useEffect } from 'react';
import { useTilListStore } from '../../default/tilComponents/useTilStore';
import useStore from '../../default/useStore';
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
  const isLogin = useStore((state) => state.isLogin);
  const memberId = localStorage.getItem('memberId');
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

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/til/list?`;

    if (memberId) {
      url += `member_id=${memberId}&`;
    }
    if (keyword) {
      url += `searchKeyword=${keyword}&`;
    }
    fetchData(currentPage, url);
  }, [currentPage, keyword, isLogin, memberId]);

  const handleSearchSubmit = (keyword) => {
    setKeyword(keyword);
    setCurrentPage(1);
  };

  if (isLoading) return <LoadingImage />;

  return (
    <TilWrapper>
      <TilFlexContainer>
        <Search onSubmit={handleSearchSubmit} />
        {keyword && (
          <SearchResult>
            {data.length === 0 ? (
              <h2>{keyword}에 대한 결과가 없습니다.</h2>
            ) : (
              <h2>{keyword}에 대한 결과입니다.</h2>
            )}
          </SearchResult>
        )}
      </TilFlexContainer>
      {data.length === 0 && <LoadingImage />}
      <TilList
        currentPage={currentPage}
        totalPages={totalPages}
        startPage={startPage}
        endPage={endPage}
        setCurrentPage={setCurrentPage}
      >
        {data &&
          data.map((data) => (
            <li key={data.tilId}>
              <TilCard data={data} memberId={memberId} />
            </li>
          ))}
      </TilList>
    </TilWrapper>
  );
}

export default SearchTil;
