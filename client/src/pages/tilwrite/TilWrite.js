import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import { InnerWrapper } from '../../default/styled';

function TilWrite() {
  const [value, setValue] = useState();

  return (
    <InnerWrapper>
      <MDEditor value={value} onChange={setValue} />
      <div style={{ marginTop: '16px' }}>
        <MDEditor.Markdown source={value} />
      </div>
    </InnerWrapper>
  );
}

export default TilWrite;
