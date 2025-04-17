import { useEffect, useState } from 'react';

const About = () => {
  const [message, setMessage] = useState<string>('読み込み中...');

  useEffect(() => {
    fetch('http://localhost:3000/api/hello')
      .then((res) => res.json())
      .then((data: { message: string }) => setMessage(data.message))
      .catch((err) => {
        console.error('API fetch error:', err);
        setMessage('エラーが発生しました');
      });
  }, []);

  return (
    <section>
      <h1>会社情報</h1>
      <p>設立: 2020年 / 所在地: 東京都渋谷区</p>
      <p>ミッション: 誰もがテクノロジーを活用できる社会へ</p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h2>📡 API連携デモ</h2>
        <p>バックエンドからのメッセージ: <strong>{message}</strong></p>
      </div>
    </section>
  );
};

export default About;
