import { renderTweets } from '../../pages/home/ui/tab/display.js';
import { loadTweets } from './loadTweets.js';

const hostname = window.location.hostname;
const BASE_URL = `http://${hostname}:3000`;

export async function postTweet(user){
    const text = document.getElementById('tweetInput').value.trim();
    const imageInput = document.getElementById('tweet-image');

        if(!text && imageInput.files.length === 0){
        alert('投稿内容が空です');
        return;
    }
    
    try{
        const formData = new FormData();
        formData.append('email', user.email);
        formData.append('text', text);
        if(imageInput.files.length > 0){
            formData.append('image', imageInput.files[0]);
        }

        const res = await fetch(`${BASE_URL}/api/tweets`,{
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.error);

        document.getElementById('tweetInput').value = '';
        imageInput.value = '';

        const tweets = await loadTweets(user);
        renderTweets(tweets, user);
    }catch(err){
        console.error('投稿エラー: ', err);
        alert('投稿に失敗しました: ' + err.message);
    }
}