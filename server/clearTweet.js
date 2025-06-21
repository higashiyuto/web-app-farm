const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Tweet = require('./models/Tweet');
require('dotenv').config();

async function clearTweets() {
  await connectDB();
  await Tweet.deleteMany({});
  console.log('✔ Tweetコレクションのデータをすべて削除しました');
  mongoose.connection.close();
}

clearTweets().catch((err) => {
  console.error('エラー:', err);
});
