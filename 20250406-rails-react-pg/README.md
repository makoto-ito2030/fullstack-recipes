# Rails + React + PostgreSQL 環境（2025-04-06）

この構成は、**Rails（APIモード）とReact（Vite）を分離**し、**Docker上のPostgreSQLと接続**する最小構成のサンプルです。

---

## 🧩 構成内容

- **Rails API**（`backend/`）  
  `bundle exec rails s` で起動。APIサーバーとしてJSONを返します。

- **React (Vite)**（`frontend/`）  
  `npm run dev` で開発用サーバー（http://localhost:5173）を起動。

- **PostgreSQL**（`docker-compose.yml`）  
  Dockerで起動するDBサーバー。Railsと接続されています。

---

## 🚀 起動手順

```bash
# DB起動（Docker）
docker compose up -d

# Rails 起動
cd backend
bundle install        # 初回のみ
bundle exec rails db:create db:migrate # 初回のみ
bundle exec rails s

# React 起動
cd ../frontend
npm install           # 初回のみ
npm run dev
