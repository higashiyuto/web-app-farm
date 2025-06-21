
require('dotenv').config(); //dotenvモジュールを読み込んで、config関数を実行することで「.env」が読み込めるようになる
const app = require('./app'); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
