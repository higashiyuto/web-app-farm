
// Node.jsモジュールの読み込み
const express = require('express');
const bcrypt = require('bcrypt');
const sharp  = require('sharp');
const router = express.Router(); //ルート処理を分割・整理するための「ミニアプリ(サブルータ)」そして、Expressアプリに取り込めるミドルウェア的な存在
const cloudinary = require('../config/cloudinary');

// アップロードされたファイルを一時的にメモリ上(RAM)に保持する設定のメソッド
// アップロードされたファイルは、「req.file.buffer」にバイナリデータ(Buffer)として入ってくる
const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload = multer({storage}); //

// スキーマ読み込み
const Account = require('../models/Account');

// getリクエスト処理
// 一人のユーザの情報を読み込む(emailとデータベースを照らし合わせることでuserが一意に定まることを利用してgetする)
router.get('/user', async(req, res)=>{
    const {email} = req.query; // getの場合はqueryで読み込む

    const user = await Account.findOne({email}); //emailフィールドが指定された値と一致するドキュメントを1件だけ探して返す
    if(!user) return res.status(404).json({error: "ユーザが見つかりません"}); // 「404」は「Not found」

    // もしuserの中にprofileImageが存在して、かつその中のdataが存在すれば次の処理をする
    const imageBase64 = user.profileImage?.data ? `data:${user.profileImage.contentType};base64,${user.profileImage.data.toString('base64')}`: null;

    // レスポンスをこの配列でjson形式にして返す
    res.json({
        name: user.name,
        email: user.email,
        age: user.age,
        profileImageUrl: user.profileImageUrl || null,
    });
});

// すべてのユーザの情報を読み込む
router.get('/list', async(req, res)=>{
    try{
      const users = await Account.find({}, 'name age email profileImageUrl createdAt').lean();
      res.json(users);
    }catch(err){
      console.error('ユーザ一覧取得エラー: ', err);
      res.status(500).json({error: 'サーバエラー'});
    }
});


//postリクエスト処理
router.post('/signup', upload.single('image'), async(req, res)=>{
    // 送られてきたreqの変数名と同じにしないとundefinedになるので注意
    try{
      const {name, age, email, password} = req.body;
      if(!name || !email || !password) return res.status(400).json({error: '必須項目があります'});

      // 送られてきたemailが既に使われているかの確認(existing(既存の、存在している))
      const existingUser = await Account.findOne({email});
      if(existingUser) return res.status(409).json({error: 'このメールアドレスはすでに使われています'});

      // パスワードの暗号化
      const passwordHash = await bcrypt.hash(password, 10);

      // 画像のリサイズ
      let profileImageUrl = null;
      if(req.file){
        const resizedBuffer = await sharp(req.file.buffer)
          .resize(100, 120)
          .toFormat('jpeg')
          .toBuffer();

          profileImageUrl = await new Promise((resolve, reject)=>{
            const stream = cloudinary.uploader.upload_stream(
              { folder: 'farmapp_users', resource_type: 'image'},
              (error, result) => {
                if(error) reject(error);
                else resolve(result.secure_url);
              }
            );
            stream.end(resizedBuffer);
          });
      }

      const newAccount = new Account({
        name, age, email, passwordHash, 
        profileImageUrl: profileImageUrl,
      });
      await newAccount.save();
      res.status(201).json({message: 'アカウントを作成しました'});
    }catch(err){
      console.error('サインアップエラー: ',err);
      res.status(500).json({error: 'サーバエラーで登録できませんでした'});
    }
});

router.post('/login', async(req, res)=>{
  const {email, password} = req.body;

  try{
    const user = await Account.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'ユーザーが存在しません' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'メールアドレスまたはパスワードが違います' });
    }

    res.json({
      email: user.email,
      name: user.name,
      profileImageUrl: user.profileImageUrl || '',
    });
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'ログイン処理中にエラーが発生しました'});
  }
});

module.exports = router;
