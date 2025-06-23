import { postTweet } from '../../../../services/tweet/postTweet.js';

export function setupPostButton(currentUser){
    const postButton = document.getElementById('post-button');
    if(!postButton) return;

    postButton.addEventListener('click', ()=>{
        postTweet(currentUser);
    });
}

export function setImageButton(){
    const imageSelectButton = document.getElementById('tweet-image');
    const imageName = document.getElementById('image-name');
    imageSelectButton.addEventListener('change', async()=>{
        const file = imageSelectButton.files[0]
        imageName.textContent = file.name;
    });
}