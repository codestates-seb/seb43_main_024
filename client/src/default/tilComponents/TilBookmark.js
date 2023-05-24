import { useEffect, useState } from 'react';
import { useBookmarkStore } from './useTilStore';
import styled from 'styled-components';
import { ReactComponent as BookmarkIcon } from '../image/bookmark.svg';
import { ReactComponent as CheckBookmarkIcon } from '../image/checkBookmark.svg';

const Button = styled.button`
  > .book-icon {
    width: ${(props) => (props.width ? props.width : '12px')};
    height: ${(props) => (props.height ? props.height : '16px')};
  }
`;

const StyledBookmarkIcon = styled(BookmarkIcon)`
  width: 100%;
  height: 100%;
`;

const StyledCheckBookmarkIcon = styled(CheckBookmarkIcon)`
  width: 100%;
  height: 100%;
`;

function TilBookmark({ checkBookmark, tilId, width, height }) {
  //memberId를 받아와야함
  const memberId = 1;
  // eslint-disable-next-line no-unused-vars
  const { getBookmarkData, data, deleteData, addBookmarkData } =
    useBookmarkStore();
  const [bookmarkCheck, setBookmarkCheck] = useState(checkBookmark);
  //const bookmarkItem = data.find(item => item.bookmarkId === bookmarkId);
  const toggleBookmark = () => {
    if (bookmarkCheck) {
      deleteData(); // bookmarkId에는 삭제할 북마크의 ID를 전달해야 합니다.
    } else {
      addBookmarkData(memberId, tilId); // memberId와 tilId를 전달하여 북마크 추가
    }
    setBookmarkCheck((prevCheck) => !prevCheck);
  };
  // console.log(memberId);
  // console.log(tilId);
  // console.log(bookmarkCheck);
  // console.log(data);

  useEffect(() => {
    getBookmarkData(memberId, tilId);
  }, [memberId, tilId]);

  return (
    <>
      {bookmarkCheck ? (
        <Button width={width} height={height} onClick={toggleBookmark}>
          <StyledCheckBookmarkIcon
            className="book-icon"
            width={width}
            height={height}
          />
        </Button>
      ) : (
        <Button width={width} height={height} onClick={toggleBookmark}>
          <StyledBookmarkIcon
            className="book-icon"
            width={width}
            height={height}
          />
        </Button>
      )}
    </>
  );
}

export default TilBookmark;
