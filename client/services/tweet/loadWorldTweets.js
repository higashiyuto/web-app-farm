const isLocal = window.location.hostname === 'localhost';
const BASE_URL = isLocal ? 'http://localhost:3000' : window.location.origin;

export async function loadWorldTweets(){
    try {
        const res = await fetch(`${BASE_URL}/api/tweets/all`);
        const data = await res.json();
        if(!res.ok) throw new Error(data.error);

        return data.tweets;
    } catch (err) {
        console.error('全ツイート取得エラー:', err);
    }
}
