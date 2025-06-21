require('dotenv').config(); //dotenvモジュールを読み込んで、config関数を実行することで「.env」が読み込めるようになる

const app = require('./app'); //サーバ設定用ファイル「app.js」を読み込む
app.listen(process.env.PORT, '0.0.0.0' ,()=>{
    console.log(`サーバ起動: http://localhost:${process.env.PORT}`);
});