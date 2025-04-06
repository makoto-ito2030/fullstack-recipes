import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3000/api/hello')
      .then((res) => res.json())
      .then((data: { message: string }) => setMessage(data.message))
      .catch((err) => console.error('API fetch error:', err));
  }, []);

  return (
    <div style={{ padding: '2rem', fontSize: '1.5rem' }}>
      {message ? `🎉 ${message}` : 'Loading...'}
    </div>
  );
}

export default App;
