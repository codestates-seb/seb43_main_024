import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const InnerWrapper = styled.div`
  width: 1320px; /* 기본 컨텐츠영역 크기 */
  height: 100%;
  box-sizing: border-box;
  margin: 0 auto;
`;

export const FilledBtns = styled.button`
  padding: 8px 16px;
  background-color: var(--brand-color);
  color: white;
  border-radius: 50px;
  &:hover {
    background-color: var(--color-darkgreen);
    color: var(--color-lightgreen);
  }
`;

export const OutlineBtns = styled.button`
  padding: 8px 16px;
  color: var(--brand-color);
  border-radius: 50px;
  border: 1px solid var(--brand-color);
  &:hover {
    background-color: var(--light-background-color);
  }
`;

export const Tags = styled.span`
  font-size: 12px;
  display: inline-block;
  background: var(--light-background-color);
  border: 1px solid #e0e4d7;
  color: var(--brand-color);
  padding: 6px 12px;
  border-radius: 50px;
  margin-right: 8px;
`;

export const TextInput = styled.textarea`
  padding: 10px;
  border: 1px solid gray;
  border-radius: 4px;
  display: block;
`;
