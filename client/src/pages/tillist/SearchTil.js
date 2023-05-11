//import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import '../../default/style.css';
import { TilWrapper, TilFlexContainer } from '../../default/styled';
import TilList from './component/TilList';
import Search from './component/Search';

const SearchResult = styled.div`
  margin-top: 40px;
`;

function SearchTil() {
  //const { keyword } = useParams();
  return (
    <TilWrapper>
      <TilFlexContainer>
        <Search />
        <SearchResult>
          <h2>검색어에 대한 결과입니다.</h2>
        </SearchResult>
      </TilFlexContainer>
      <TilList />
    </TilWrapper>
  );
}

export default SearchTil;
