import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../../default/style.css';
import { ReactComponent as SearchImg } from '../../../default/image/searchImg.svg';

const InputWrapper = styled.div`
  position: relative;
  width: 450px;
  height: 52px;
`;

const SearchInput = styled.input`
  width: 370px;
  height: 100%;
  outline: none;
  padding-inline-start: 30px;
  padding-inline-end: 45px;
  border-radius: 30px;
  border: 1px solid var(--brand-color);
  font-size: 18px;
  &:hover {
    box-shadow: 1px 1px 5px rgba(65, 104, 49, 0.35);
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-40%);
  width: 35px;
  height: 35px;
`;

const SearchImage = styled(SearchImg)`
  width: 20px;
  height: 20px;
`;

function Search() {
  //const navigate = useNavigate();
  const [text, setText] = useState('');
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //navigate(`/tils/${text}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputWrapper>
        <SearchInput
          type="text"
          placeholder="검색어를 입력해주세요"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button type="submit">
          <SearchImage />
        </Button>
      </InputWrapper>
    </form>
  );
}

export default Search;
