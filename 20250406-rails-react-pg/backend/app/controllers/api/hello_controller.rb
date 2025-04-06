# http://localhost:5173
# → フロントエンドの開発サーバー
# → Viteで起動しているReactアプリの「ドキュメントルート」
# → HTML / CSS / JS（React）が表示される

# http://localhost:3000
# → バックエンド（Rails APIサーバー）
# → JSON形式のAPIレスポンスを返す

# http://localhost:3000/api/hello
# → Railsで定義されたAPIエンドポイント
# → Reactアプリがfetch()などでアクセスしてJSONを受け取る

# 【関係性】
# React (Viteサーバー) から Rails (APIサーバー) に対して HTTPリクエストを送り、
# RailsがJSONで応答する形でフロントとバックが連携している。

class Api::HelloController < ApplicationController
  def index
    message = Message.first
    render json: { message: message&.content || "No message found" }
  end
end
