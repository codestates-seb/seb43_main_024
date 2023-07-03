import { useState, useEffect } from 'react';
import { useTilListStore } from '../../default/tilComponents/useTilStore';
import useStore from '../../default/useStore';
import styled from 'styled-components';
import {
  TilWrapper,
  TilFlexContainer,
  TilCardWrapper,
} from '../../default/styled';
import TilList from '../../default/tilComponents/TilList';
import TilCard from '../../default/tilComponents/TilCard';
import Search from './component/Search';
import LoadingImage from '../../default/LoadingImage';
import MoveButton from '../../default/tilComponents/MoveButton';

const SearchResult = styled.div`
  margin-top: 20px;
  @media (max-width: 900px) {
    margin-top: 10px;
    > h2{
      font-size: 15px;
    }
  }
    @media (max-width: 500px) {
    > h2{
      font-size: 13px;
    }
  }
  }
`;

function SearchTil() {
  const isLogin = useStore((state) => state.isLogin);
  const memberId =
    localStorage.getItem('memberId') !== 'null'
      ? localStorage.getItem('memberId')
      : null;
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

    if (memberId !== null && memberId !== undefined) {
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
      {!data && <LoadingImage />}
      <TilList
        currentPage={currentPage}
        totalPages={totalPages}
        startPage={startPage}
        endPage={endPage}
        setCurrentPage={setCurrentPage}
      >
        <TilCardWrapper>
          {data &&
            data.map((data) => (
              <li key={data.tilId}>
                <TilCard data={data} memberId={memberId} />
              </li>
            ))}
        </TilCardWrapper>
      </TilList>
      <MoveButton />
    </TilWrapper>
  );
}

export default SearchTil;
