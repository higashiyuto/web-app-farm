// element変数
const sign_form = document.getElementById('auth-form');
const form_email = document.getElementById('email');
const form_password = document.getElementById('password');

const sign_link = document.getElementById('toggle-link');

//const hostname = window.location.hostname;
//const BASE_URL = `http://${hostname}:3000`;
const BASE_URL = window.location.origin;

const message = document.getElementById('message');

sign_form.addEventListener('submit', async (e) => {
    e.preventDefault(); // フォーム送信でページがリロードされるのを防ぐ
    message.textContent = '';

    const email = form_email.value.trim();
    const password = form_password.value;

    try {
        const res = await fetch(`${BASE_URL}/api/accounts/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'ログインに失敗しました');

        // ログイン成功 → ユーザー情報を保存
        localStorage.setItem('user', JSON.stringify({
            email: data.email,
            name: data.name,
        }));

        window.location.href = '/pages/home/index.html';
    } catch (err) {
        console.error('エラー発生: ', err);
        message.style.color = 'red';
        message.textContent = err.message;
    }
});

sign_link.addEventListener('click', async(e) => {
    window.location.href = '/pages/signup/index.html';
});