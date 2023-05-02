import useStore from './default/useStore';
import './default/style.css';
import { FilledBtns, Tags, OutlineBtns, TextInput } from './default/styled';

function App() {
  const { count, increment, decrement } = useStore();

  return (
    <div>
      <h1>24시간이 모자라</h1>
      <h2>Count: {count}</h2>
      <p>
        React의 입력 텍스트 영역에 스타일이 지정된 구성 요소를 제공하려면
        styled-components 라이브러리를 사용할 수 있습니다.
      </p>
      <FilledBtns onClick={increment}>Increment</FilledBtns>
      <OutlineBtns onClick={decrement}>Decrement</OutlineBtns>
      <Tags>html</Tags>
      <Tags>css</Tags>
      <TextInput></TextInput>
    </div>
  );
}

export default App;
