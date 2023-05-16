import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import {
  FilledBtns,
  InnerWrapper,
  OutlineBtns,
  WritrForm,
  PostActions,
} from '../../default/styled';

function TilWrite() {
  const [titleValue, setTitleValue] = useState();
  const [value, setValue] = useState();

  const onTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  return (
    <InnerWrapper>
      <WritrForm>
        <textarea
          placeholder="제목을 입력하세요"
          value={titleValue}
          onChange={onTitleChange}
        ></textarea>

        <MDEditor value={value} onChange={setValue} />
        {/* 아래가 글내용 */}
        <div style={{ marginTop: '16px' }}>
          <MDEditor.Markdown source={value} />
        </div>
      </WritrForm>
      <PostActions>
        <div>
          <label htmlFor="private" className="custom-checkbox">
            <input type="checkbox" name="private" id="private" />
            <span className="checkmark"></span>
            <p>이 게시글을 비공개로 작성합니다.</p>
          </label>
        </div>
        <div>
          <OutlineBtns>취소하기</OutlineBtns>
          <FilledBtns>TIL 작성하기</FilledBtns>
        </div>
      </PostActions>
    </InnerWrapper>
  );
}

export default TilWrite;
