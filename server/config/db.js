const Tweet = require('../models/Tweet');
const Account = require('../models/Account');

// MongoDBをmongooseを使って利用する設定と、
// データベースを「.env」のMONGO_URLをもとにつなげるためのファイル
const mongoose = require('mongoose');
const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Atlasに接続成功');
    }catch(err){
        console.log('MongoDB 接続エラー: ', err);
        process.exit(1);
    }
};

//このファイルを「connectDB」という名前でモジュール化し、エクスポート
module.exports = connectDB;