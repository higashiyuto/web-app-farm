import { renderWorldTweets } from './display.js';
import { loadWorldTweets } from '../../../../services/tweet/loadWorldTweets.js';
import { setupSearchToggle } from './setupSearchToggle.js';

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

            if(targetTab === '2') {
                try{
                    const tweets = await loadWorldTweets();
                    renderWorldTweets(tweets,'worldtweetlist');
                }catch(err){
                    console.error('Worldツイート取得エラー: ', err);
                }
            }
        });
    });
}