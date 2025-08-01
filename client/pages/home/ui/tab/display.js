export function renderTweets(tweets, user) {
    const tweetList = document.getElementById('tweetList');
    tweetList.innerHTML = '';

    tweets.forEach(tweet => {
        console.log(tweet.imageUrl); // これがnullでなければ画像がある
        const tweetBlock = document.createElement('div');
        tweetBlock.className = 'tweet-block';

        // HTML構築用の変数を最初に定義
        let tweetHTML = `
            <img class="tweet-image" src="${user.image}" alt="プロフィール画像">
            <div class="content-container">
                <div class="tweet-name">${user.name}</div>
                <div class="tweet-content">${tweet.content}</div>
        `;

        // 画像があれば追加
        if (tweet.imageUrl) {
            tweetHTML += `
                <img class="tweet-content-image" src="${tweet.imageUrl}" alt="投稿画像">
            `;
        }

        tweetHTML += `</div>`; // content-container閉じタグ
        tweetBlock.innerHTML = tweetHTML;
        tweetList.prepend(tweetBlock);
    });
}


export async function renderWorldTweets(tweets){
    const tweetList = document.getElementById('tweetList2');
    tweetList.innerHTML = ''; // 既存のツイートをクリア

    tweets.forEach(tweet => {
        const userName = tweet.author?.name || '名無しユーザー';
        const userImage = tweet.author?.image || 'default.png'; // ← base64 or デフォルト画像

        const imageHtml = tweet.imageUrl
            ? `<img class="tweet-content-image" src="${tweet.imageUrl}" alt="投稿画像">`
            : '';

        const tweetBlock = document.createElement('div');
        tweetBlock.className = 'tweet-block';
        tweetBlock.innerHTML = `
            <img class="tweet-image" src="${userImage}" alt="プロフィール画像">
            <div class="content-container">
                <div class="tweet-name">${userName}</div>
                <div class="tweet-content">${tweet.content}</div>
                ${imageHtml}
            </div>
        `;

        tweetList.prepend(tweetBlock);
    });
}