
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Account = require('./models/Account');
require('dotenv').config();

async function clearAccounts() {
  await connectDB();
  await Account.deleteMany({});
  console.log('✔ Accountコレクションのデータをすべて削除しました');
  mongoose.connection.close();
}

clearAccounts().catch((err) => {
  console.error('エラー:', err);
});
