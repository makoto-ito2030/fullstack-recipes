# 20250427-rails-nextjs-pg

Rails + Next.js + PostgreSQL フルスタック開発環境

---

## 📦 プロジェクト構成

```
20250427-rails-nextjs-pg/
├── docker-compose.yml    # PostgreSQL起動用
├── backend/               # Rails APIサーバー
├── frontend/              # Next.jsフロントエンド
└── db/                    # PostgreSQLデータ保存用（Git管理対象外）
```

---

## 🚀 セットアップ手順

### 1. DockerでPostgreSQLを起動

```bash
docker-compose up -d
```

- PostgreSQLが `localhost:5432` で起動します。

---

### 2. Rails（バックエンド）セットアップ

```bash
cd backend
bundle install
bin/rails db:create
bin/rails db:migrate
bin/rails s
```

- Railsサーバーが `http://localhost:3000` に立ち上がります。

---

### 3. Next.js（フロントエンド）セットアップ

```bash
cd frontend
yarn install
yarn dev -p 8000
```

- Next.jsが `http://localhost:8000` に立ち上がります。
- 起動時、`-p 8000` オプションでポートを変更しています。

---

## 🛡️ Git管理に関する注意

- `/db/` ディレクトリは `.gitignore` 済み（PostgreSQLデータはGitに含めない）
- `backend/config/master.key` は `.gitignore` 済み
- `backend/config/credentials.yml.enc` はGit管理対象（暗号化ファイル）

---

## 🌐 開発時アクセス先まとめ

| サービス           | URL                      |
|:-------------------|:-------------------------|
| Rails API           | http://localhost:3000    |
| Next.js フロントエンド | http://localhost:8000    |
| PostgreSQL (Docker) | localhost:5432            |

---

## 🛠️ 使用技術

- **Rails 7 (APIモード)**
- **Next.js 14**
  - TypeScript
  - ESLint
  - Tailwind CSS
  - `src/`ディレクトリ構成
- **PostgreSQL 14 (Dockerコンテナ)**

---

## ✍️ Memo

今後、Rails APIとNext.jsを連携させる際は、CORS設定やAPIエンドポイント追加が必要です。

