# Rails + React + PostgreSQL 環境（2025-04-06）

この構成は、**Rails（APIモード）とReact（Vite）を分離**し、**Docker上のPostgreSQLと接続**する最小構成のサンプルです。

---

## 📦 事前に必要なもの（グローバルインストール）

以下のツールがローカルにインストールされている必要があります：

| ツール          | バージョン例        | 備考                                   |
|------------------|---------------------|----------------------------------------|
| Docker            | 24.x 以降           | PostgreSQLをコンテナで起動するため     |
| Ruby              | 3.2.x               | rbenvやrvmでの管理を推奨               |
| Node.js           | 18.x or 20.x        | React（Vite）用                        |
| npm または Yarn   | npm 8.x〜（推奨）    | React依存のインストール用              |
| Git               | 任意                | GitHubからcloneする場合に使用          |

> 💡 Rubyは [`rbenv`](https://github.com/rbenv/rbenv)、Node.jsは [`volta`](https://volta.sh) でのバージョン管理がおすすめです。

---

## 🧩 構成内容

- **Rails API**（`backend/`）  
  `bundle exec rails s` で起動。APIサーバーとしてJSONを返します。

- **React (Vite)**（`frontend/`）  
  `npm run dev` で開発用サーバー（http://localhost:5173）を起動。

- **PostgreSQL**（`docker-compose.yml`）  
  Dockerで起動するDBサーバー。Railsと接続されています。

---

## 🚀 起動手順（初回セットアップ）

```bash
# ① PostgreSQLコンテナ起動
docker compose up -d

# ② Railsのセットアップ
cd backend
bundle install
bundle exec rails db:create db:migrate
bundle exec rails s
