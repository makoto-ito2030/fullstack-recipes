import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '1.1rem' }}>
        <Link to="/">🏠 ホーム</Link>
        <Link to="/about">🏢 会社情報</Link>
        <Link to="/services">🛠 サービス</Link>
        <Link to="/contact">✉️ お問い合わせ</Link>
      </nav>
    </header>
  );
};

export default Header;
