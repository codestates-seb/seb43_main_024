import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();

  const onTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const onPrivateChange = (e) => {
    setIsPrivate(e.target.checked);
  };

  const handleCancel = () => {
    //취소처리
    setTitleValue('');
    setValue('');
    setIsPrivate(false);
    navigate(-1); //이전페이지로 돌아가기
  };

  const handleSubmit = async () => {
    const data = {
      memberId: 1,
      tilTitle: titleValue,
      tilContent: value,
      tilStatus: isPrivate,
    };

    try {
      const response = await axios.post('/til', data);
      console.log(response);
      navigate(-1); //! 이전페이지로 돌아가기, 추 후 작성한 게시글 페이지로 이동하도록 수정 필요
      //요청이 성공했을 때 처리
    } catch (error) {
      console.log(error);
      //에러처리
    }
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
            <input
              type="checkbox"
              name="private"
              id="private"
              onChange={onPrivateChange}
            />
            <span className="checkmark"></span>
            <p>이 게시글을 비공개로 작성합니다.</p>
          </label>
        </div>
        <div>
          <OutlineBtns onClick={handleCancel}>취소하기</OutlineBtns>
          <FilledBtns onClick={handleSubmit}>TIL 작성하기</FilledBtns>
        </div>
      </PostActions>
    </InnerWrapper>
  );
}

export default TilWrite;
