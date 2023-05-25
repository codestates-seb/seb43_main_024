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

function TilBookmark({ checkBookmark, memberId, tilId, width, height }) {
  const { getBookmarkData, bookmarksData, deleteData, addBookmarkData } =
    useBookmarkStore();
  const [bookmarkCheck, setBookmarkCheck] = useState(checkBookmark);

  const toggleBookmark = async () => {
    if (bookmarkCheck) {
      const deleteItem = bookmarksData.find((item) => item.til.tilId === tilId);
      const { bookmarkId } = deleteItem;
      await deleteData(bookmarkId); // 북마크 삭제 API 요청 완료까지 대기
    } else {
      await addBookmarkData(memberId, tilId); // 북마크 추가 API 요청 완료까지 대기
    }
    setBookmarkCheck((prevCheck) => !prevCheck);
  };

  useEffect(() => {
    getBookmarkData(memberId);
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
