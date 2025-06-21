import { postTweet } from '../../../../services/tweet/postTweet.js';

export function setupPostButton(currentUser){
    const postButton = document.getElementById('post-button');
    if(!postButton) return;

    postButton.addEventListener('click', ()=>{
        postTweet(currentUser);
    });
}