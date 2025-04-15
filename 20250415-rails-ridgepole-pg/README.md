# Rails + Ridgepole + PostgreSQL 開発環境

このプロジェクトは、**Rails 7.1 + Ridgepole + PostgreSQL（Docker）構成**で、データベースを `Schemafile` ベースで管理するスタイルを採用しています。  
また、`annotate` によってモデルファイルにスキーマ情報のコメントが自動で付与されるようになっています。

---

## 📦 使用技術スタック

| 技術          | バージョン例       |
|---------------|--------------------|
| Ruby          | 3.2.2              |
| Rails         | ~> 7.1.2           |
| Ridgepole     | 最新（Gem）        |
| PostgreSQL    | 15（Docker）       |
| Annotate      | ~> 3.2.0（モデル注釈） |

---

## 🚀 セットアップ手順

### 1. リポジトリをクローンして依存関係をインストール

```bash
bundle install
```

### 2. PostgreSQL を Docker で起動

```bash
docker-compose up -d db
```

### 3. データベースを作成

```bash
bin/rails db:create
```

### 4. スキーマを適用（Ridgepole）＆ モデル注釈

```bash
bin/rails db:migrate
```

---

## 🧩 Ridgepole でのスキーマ管理

スキーマは `db/Schemafile` に記述します。例：

```ruby
create_table "users", force: :cascade do |t|
  t.string :name
  t.string :email
  t.timestamps
end
```

適用は通常の `db:migrate` でOK（カスタム Rake タスクで Ridgepole をフック済）：

```bash
bin/rails db:migrate
```

差分だけ確認したいとき：

```bash
bundle exec ridgepole -c config/database.yml --diff -f db/Schemafile
```

---

## 📝 Annotate（モデルにスキーマ情報コメント）

スキーマ変更後、モデルファイルの先頭にスキーマコメントを付けたい場合：

```bash
bundle exec annotate
```

または、以下のカスタム Rake タスクにより `bin/rails db:migrate` 実行時に自動実行されます。

```ruby
namespace :db do
  desc "Apply schema using Ridgepole and annotate models"
  task :migrate do
    config = Rails.configuration.database_configuration[Rails.env]
    cmd = [
      "bundle exec ridgepole",
      "-c config/database.yml",
      "--env \#{Rails.env}",
      "--apply",
      "-f db/Schemafile"
    ].join(" ")

    puts "Running Ridgepole..."
    system(cmd)

    puts "Running Annotate..."
    system("bundle exec annotate")
  end
end
```

❗️**注意**：モデルファイル名とクラス名が一致していないと annotate はエラーになります。  
例：`app/models/test_user.rb` には `class TestUser < ApplicationRecord` が必要です。

---

## 📁 プロジェクト構成（抜粋）

```
myapp/
├── app/
│   └── models/
│       └── user.rb         # ← Annotateでコメント付与済
├── db/
│   └── Schemafile          # ← Ridgepoleで管理
├── docker-compose.yml      # ← PostgreSQL用
├── Gemfile
├── lib/tasks/
│   └── ridgepole.rake      # ← カスタムRakeタスク（db:migrateにHook）
└── frontend/               # ← 今は空。将来のフロント用ディレクトリ
```

---

## 📚 よく使うコマンドまとめ

| 処理内容                         | コマンド                                               |
|----------------------------------|--------------------------------------------------------|
| PostgreSQL 起動（Docker）       | `docker-compose up -d db`                             |
| DB 作成                          | `bin/rails db:create`                                 |
| スキーマ反映 + Annotate         | `bin/rails db:migrate`                                |
| スキーマ差分確認                 | `bundle exec ridgepole --diff ...`                    |
| モデル注釈だけ更新               | `bundle exec annotate`                                |
| Rails サーバー起動               | `bin/rails s`                                         |

---

## 🌱 Seed データ（任意）

`db/seeds.rb` に記述して、以下で投入：

```bash
bin/rails db:seed
```

---

## 💡 フロントエンド

今は未導入ですが、`frontend/` ディレクトリをプレースホルダーとして用意済みです。将来的に以下のような技術を導入可能：

- React / Vite / Next.js など
- API通信：Railsを API-only 化して連携

---

## 🛠 今後の拡張アイデア

- RSpec / FactoryBot などテスト環境の導入
- CI/CD（GitHub Actions など）対応
- API モード対応
- 本番デプロイ環境（Kamal / Heroku / Fly.io etc）

---

## 🙌 Author

- 環境構築：Rails 7.1 + Ridgepole + PostgreSQL（Docker）
- コメント生成：Annotate
