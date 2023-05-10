import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios
      .get('/sample/')
      .then((response) => {
        const parsedData = JSON.parse(response.data);
        setData(parsedData.message);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>{data}</h1>
      <p>위에 helloworld 가 입력되지 않는다면 연결에 실패한 것입니다.</p>
    </div>
  );
}

export default App;
