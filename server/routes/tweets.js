// Node.jsモジュール読み込み
const express = require('express');
const router = express.Router();
const sharp = require('sharp');

const cloudinary = require('../config/cloudinary');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});

// スキーマ読み込み
const Tweet = require('../models/Tweet');
const Account = require('../models/Account');

router.get('/', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'メールアドレスが必要です' });
  }

  try {
    const user = await Account.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'ユーザーが見つかりません' });
    }

    const tweets = await Tweet.find({author: user._id})
      .populate('author', 'name email profileImageUrl')
      .sort({createdAt: 1});
    
    const tweetWithImage = tweets.map(tweet => {
      return {
        content : tweet.content,
        createdAt: tweet.createdAt,
        imageUrl: tweet.imageUrl || null,
        author: {
          name: tweet.author.name,
          email: tweet.author.email,
          image: tweet.author.profileImageUrl || null,
        }
      };
    });
    res.json({tweets: tweetWithImage});
  } catch (err) {
    console.error('ツイート取得エラー: ', err);
    res.status(500).json({ error: 'サーバエラーで取得できませんでした' });
  }
});

router.get('/list', async(req, res)=>{
    try{
        const tweets = await Tweet.find()
        .populate('author', 'name email profileImageUrl')
        .sort({createdAt: 1});

      // Base64画像を展開
      const tweetsWithImage = tweets.map(tweet => {
          return {
            content: tweet.content,
            createdAt: tweet.createdAt,
            imageUrl: tweet.imageUrl || null,
            author: {
              name: tweet.author?.name || '名無しユーザ',
              email: tweet.author?.email || '',
              image: tweet.author?.profileImageUrl || null,
            },
          };
      });
      res.json({tweets: tweetsWithImage});
    }catch(err){
        console.error('全ツイート取得エラー: ', err);
        res.status(500).json({error: '全ツイート取得失敗'});
    }
});



router.post('/', upload.single('image'), async (req, res) => {
    // ここで req.body はちゃんと値を持っている（ただし文字列）
    const email = req.body.email;
    const text = req.body.text;

    try {
        const user = await Account.findOne({ email });
        if (!user) return res.status(404).json({ error: 'ユーザが見つかりません' });

        let imageUrl = null;
        if (req.file) {
            const resizedBuffer = await sharp(req.file.buffer)
              .resize(400)
              .toFormat('jpeg')
              .toBuffer();

            imageUrl = await new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                {folder: 'farmapp_tweets', resource_type: 'image'},
                (error, result) => {
                  if(error) reject(error);
                  else resolve(result.secure_url);
                }
              );
              stream.end(resizedBuffer);
            });
        }

        const tweet = new Tweet({
            author: user._id,
            content: text,
            imageUrl
        });

        await tweet.save();
        res.status(201).json({ message: 'ツイートを投稿しました' });
    } catch (err) {
        console.error('ツイート投稿エラー: ', err);
        res.status(500).json({ error: 'サーバエラーで投稿できませんでした' });
    }
});


router.delete('/:tweetId', async(req, res)=>{
    const {tweetId} = req.params;

    if(!tweetId) return res.status(400).json({error: 'ツイートIDは必須です'});

    try{
      await Tweet.findByIdAndDelete(tweetId);
      res.json({message: '削除完了'});
    }catch(err){
      console.error('ツイート削除エラー', err);
      res.status(500).json({error: 'サーバエラーで削除できませんでした'});
    }
});


module.exports = router;