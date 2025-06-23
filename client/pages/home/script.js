import { setupTabSwitching } from './ui/tab/controller.js';
import { setupPostButton } from './ui/form/button.js';
import { setImageButton } from './ui/form/button.js'
import { loadUserInfo } from '../../services/account/loadUserInfo.js';
import { loadTweets } from '../../services/tweet/loadTweets.js';
import { renderTweets } from '../home/ui/tab/display.js';
import { logoutButton } from './ui/header/logoutButton.js';

let currentUser = null;
document.addEventListener('DOMContentLoaded', async () => {
    currentUser = await loadUserInfo();
    if (!currentUser) return;

    setupTabSwitching(currentUser);
    const tweets = await loadTweets(currentUser);

    logoutButton();
    setImageButton();
    setupPostButton(currentUser);
    renderTweets(tweets, currentUser);
});

const toggleBtn = document.getElementById('toggle-search');
const searchBox = document.getElementById('search-box');

toggleBtn.addEventListener('click', () => {
  const isOpen = searchBox.classList.toggle('open');
  if (isOpen) {
    toggleBtn.textContent = '▲';
  } else {
    toggleBtn.textContent = '▼';
  }
});
