const mongoose = require('mongoose');

/*
    unique: AccountSchema内で被らないようにする設定
    date: Buffer : バイナリデータを扱うための型
    contentType: String: 画像が何の種類か(JPEGかPNGか)を示す情報を入れておく
*/
const AccountSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age:  {type: Number},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    profileImageUrl: {type: String},
    tweets: [{
        text: {type: String, required: true},
        createdAt: {type: Date, default: Date.now},
    }],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

// データベース名を「Account」というAccountSchemaをモジュール化してエクスポート
module.exports = mongoose.model('Account', AccountSchema);