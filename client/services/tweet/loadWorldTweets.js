//const hostname = window.location.hostname;
//const BASE_URL = `http://${hostname}:3000`;
const BASE_URL = window.location.origin;

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
