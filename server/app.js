// ここで、実際のサーバを作っていく。サーバ起動はserver.jsで行う

// Node.jsモジュールの読み込み
const express = require('express'); //Node.jsのサーバ構築用フレームワーク
const cors = require('cors'); //異なるポートからのリクエストを制御するモジュール
const path = require('path');

// データベース読み込み
const connectDB = require('./config/db.js');

// ルート読み込み
const accountRoutes = require('./routes/accounts');
const tweetRoutes = require('./routes/tweets');

// express初期化
const app = express();

// DB接続
connectDB();

// ミドルウェアの付与
app.use(cors());

// ExpressでJSON形式のリクエストボディを自動的に解析(parse)してくれる
// 例: {"name": "Yuto", "age": 30}のようなJSONデータあったとき、これを
//     サーバ側で「req.body」として扱えるようになる
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '../client/pages/login/index.html')));
app.use('/api/accounts', accountRoutes); //このURLのルートは「accountRoutes」に任せる
app.use('/api/tweets', tweetRoutes);

//このファイルをモジュール化し「app」という名前でエクスポートする
module.exports = app;