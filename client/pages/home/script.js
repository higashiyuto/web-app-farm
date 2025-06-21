import { setupTabSwitching } from './ui/tab/controller.js';
import { setupPostButton } from './ui/form/button.js';
import { loadUserInfo } from '../../services/account/loadUserInfo.js';
import { loadTweets } from '../../services/tweet/loadTweets.js';
import { renderTweets } from '../home/ui/tab/display.js';

let currentUser = null;
document.addEventListener('DOMContentLoaded', async () => {
    currentUser = await loadUserInfo();
    if (!currentUser) return;

    setupTabSwitching(currentUser);
    const tweets = await loadTweets(currentUser);
    setupPostButton(currentUser);
    renderTweets(tweets, currentUser);
});