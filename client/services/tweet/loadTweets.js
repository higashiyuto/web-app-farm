const isLocal = window.location.hostname === 'localhost';
const BASE_URL = isLocal ? 'http://localhost:3000' : window.location.origin;

export async function loadTweets(currentUser){
    if(!currentUser) return;

    try{
        const res = await fetch(`${BASE_URL}/api/tweets?email=${encodeURIComponent(currentUser.email)}`);
        const data = await res.json();
        if(!res.ok) throw new Error(data.error);

        return data.tweets;
    }catch(err){
        console.error('ツイート一覧取得エラー: ', err);
    }
}