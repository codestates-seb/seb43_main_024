import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../default/useStore';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import {
  FilledBtns,
  GrayFilledBtns,
  OutlineBtns,
  GrayOutlineBtns,
  InnerWrapper,
  WritrForm,
  PostActions,
  ModalIcon,
} from '../../default/styled';
import WarningIcon from '../../default/image/icoWarning.svg';
import API from '../../API';

function TilWrite() {
  const [titleValue, setTitleValue] = useState();
  const [value, setValue] = useState();
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();
  const openModal = useStore((state) => state.openModal);
  const closeModal = useStore((state) => state.closeModal);
  const memberId = localStorage.getItem('memberId');

  const handleOpenModal = () => {
    openModal({
      icon: <ModalIcon src={WarningIcon} alt="경고 아이콘" />,
      title: '정말로 삭제 하시겠습니까?',
      content: '작성중인 내용은 저장되지 않습니다.',
      buttons: [
        <GrayOutlineBtns key="cancelButton" onClick={closeModal}>
          취소
        </GrayOutlineBtns>,
        <GrayFilledBtns key="confirmButton" onClick={handleCancel}>
          확인
        </GrayFilledBtns>,
      ],
    });
  };

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
    closeModal();
  };

  const handleSubmit = async () => {
    const data = {
      memberId: memberId,
      tilTitle: titleValue,
      tilContent: value,
      tilStatus: isPrivate,
    };

    try {
      const response = await API.post(
        `${process.env.REACT_APP_API_URL}/til`,
        data
      );
      console.log(response);
      const postId = response.data.tilId; // 서버 응답에서 작성된 글의 ID 가져오기
      navigate(`/til/${postId}`);
      //요청이 성공했을 때 처리
    } catch (error) {
      console.log(memberId);
      console.log('Error: ', error); // 에러를 좀 더 자세하게 표시
      console.log('Error response: ', error.response); // 에러 응답 객체도 출력
      console.log('Error message: ', error.message); // errorMessage를 인쇄합니다.
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
        {/* <div style={{ marginTop: '16px' }}>
          <MDEditor.Markdown source={value} />
        </div> */}
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
          <OutlineBtns onClick={handleOpenModal}>취소하기</OutlineBtns>
          <FilledBtns onClick={handleSubmit}>TIL 작성하기</FilledBtns>
        </div>
      </PostActions>
    </InnerWrapper>
  );
}

export default TilWrite;
