import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTilStore } from '../../default/tilComponents/useTilStore';
import useStore from '../../default/useStore';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import CheckIcon from '../../default/image/check.svg';
import {
  FilledBtns,
  InnerWrapper,
  OutlineBtns,
  WritrForm,
  PostActions,
  GreenOutlineBtns,
} from '../../default/styled';

function TilEdit() {
  const navigate = useNavigate();
  const { tilId } = useParams();
  const getData = useTilStore((state) => state.getData);
  const updateData = useTilStore((state) => state.updateData);

  const [titleValue, setTitleValue] = useState('');
  const [value, setValue] = useState('');
  const [isPrivate, setIsPrivate] = useState(null);
  const openModal = useStore((state) => state.openModal);
  const closeModal = useStore((state) => state.closeModal);

  useEffect(() => {
    (async () => {
      const postData = await getData(tilId);
      if (postData) {
        setTitleValue(postData.tilTitle);
        setValue(postData.tilContent);
        setIsPrivate(
          postData.tilStatus !== undefined ? postData.tilStatus : false
        ); // tilStatus 값이 undefined인 경우 기본값인 false로 설정
      }
    })();
  }, [getData, tilId]);

  const handleOpenModal = () => {
    openModal({
      icon: <img src={CheckIcon} alt="수정완료 아이콘" />,
      title: '수정이 완료 되었습니다.',
      content: '아래 버튼을 클릭하면 게시물 화면으로 돌아갑니다.',
      buttons: [
        <GreenOutlineBtns key="confirmButton" onClick={handleSubmit}>
          알겠습니다.
        </GreenOutlineBtns>,
      ],
    });
  };

  const onTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const onPrivateChange = (e) => {
    setIsPrivate(e.target.checked);
  };

  const handleSubmit = async () => {
    const updatedData = {
      tilId: `${tilId}`,
      tilTitle: titleValue,
      tilContent: value,
      tilStatus: isPrivate === null ? false : isPrivate, // tilStatus 값이 null이면 기본값인 false로 설정
    };
    await updateData(tilId, updatedData); // 'tilId'를 인수로 전달하도록 수정
    closeModal();
    navigate(`/til/${updatedData.tilId}`);
  };

  const handleCancel = () => {
    navigate(-1);
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
      </WritrForm>
      <PostActions>
        <div>
          <label htmlFor="private" className="custom-checkbox">
            <input
              type="checkbox"
              name="private"
              id="private"
              onClick={onPrivateChange}
              checked={isPrivate}
            />
            <span className="checkmark"></span>
            <p>이 게시글을 비공개로 작성합니다.</p>
          </label>
        </div>
        <div>
          <OutlineBtns onClick={handleCancel}>취소하기</OutlineBtns>
          <FilledBtns onClick={handleOpenModal}>TIL 수정하기</FilledBtns>
        </div>
      </PostActions>
    </InnerWrapper>
  );
}

export default TilEdit;
