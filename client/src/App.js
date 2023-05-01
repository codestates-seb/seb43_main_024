import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/say')
      .then((response) => setData(response.data.say[0].id))
      .catch((error) => console.error(error));
  }, []);

  return <div>{data}</div>;
}

export default App;
