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
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleBookmark = async () => {
    if (isProcessing || !memberId) {
      return;
    }

    setIsProcessing(true);

    try {
      if (bookmarkCheck) {
        const deleteItem = bookmarksData.find((item) => item.tilId === tilId);
        const { bookmarkId } = deleteItem;
        await deleteData(bookmarkId);
        await getBookmarkData(memberId);
      } else {
        await addBookmarkData(memberId, tilId);
        await getBookmarkData(memberId);
      }

      setBookmarkCheck((prevCheck) => !prevCheck);
    } catch (error) {
      console.error('북마크 처리 오류', error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (memberId) {
      getBookmarkData(memberId);
    }
  }, [memberId, tilId]);

  return (
    <>
      {bookmarkCheck ? (
        <Button
          width={width}
          height={height}
          onClick={toggleBookmark}
          disabled={isProcessing}
        >
          <StyledCheckBookmarkIcon
            className="book-icon"
            width={width}
            height={height}
          />
        </Button>
      ) : (
        <Button
          width={width}
          height={height}
          onClick={toggleBookmark}
          disabled={isProcessing}
        >
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
