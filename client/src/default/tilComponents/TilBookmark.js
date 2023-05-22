import { useState } from 'react';
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

function TilBookmark({ checkBookmark, width, height }) {
  const [bookmarkCheck, setBookmarkCheck] = useState(checkBookmark);
  const toggleBookmark = () => {
    setBookmarkCheck((prevCheck) => !prevCheck);
  };

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
