import { renderWorldTweets } from './display.js';
import { loadWorldTweets } from '../../../../services/tweet/loadWorldTweets.js';
import { loadWorldUserInfo } from '../../../../services/account/loadWorldUserInfo.js';
import { loadUserInfo } from '../../../../services/account/loadUserInfo.js';
import { loadTweets } from '../../../../services/tweet/loadTweets.js';

export async function setupTabSwitching(user){
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', async() => {
            const targetTab = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => {
                if (content.id === `tab-content-${targetTab}`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });

            if(targetTab === '1'){
                try{
                    const user = await loadUserInfo();
                    const tweets = await loadTweets(user);
                    renderTweets(tweets);
                }catch(err){
                    console.error('Worldツイート取得エラー: ', err);
                }
            }
        });
    });
}