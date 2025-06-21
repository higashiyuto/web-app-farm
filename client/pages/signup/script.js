// element変数
const sign_form = document.getElementById('auth-form');
const form_name = document.getElementById('name');
const form_age = document.getElementById('age');
const form_email = document.getElementById('email');
const form_password = document.getElementById('password');
const form_imageFile = document.getElementById('image');

const sign_link = document.getElementById('toggle-link');

const hostname = window.location.hostname;
const BASE_URL = `http://${hostname}:3000`;

const message = document.getElementById('message');

sign_form.addEventListener('submit', async(e)=>{
    e.preventDefault(); //フォーム送信でページがリロードされるのを防ぐ
    message.textContent = '';

    try{
        /* ブラウザで「フォームのデータを簡単にまとめて送る」ための特別なオブジェクト */
        const formData = new FormData();
        formData.append('name', form_name.value.trim());
        formData.append('age', parseInt(form_age.value));
        formData.append('email', form_email.value.trim());
        formData.append('password', form_password.value);
        if(form_imageFile) formData.append('image', form_imageFile.files[0]);

        const res = await fetch(`${BASE_URL}/api/accounts/signup`,{
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.error || '登録に失敗しました');

        message.style.color = 'green';
        message.textContent = '登録に成功しました';

        const email = form_email.value.trim();

        // ユーザー情報を再取得
        const resUser = await fetch(`${BASE_URL}/api/accounts/user?email=${encodeURIComponent(email)}`);
        const userData = await resUser.json();

        localStorage.setItem('user', JSON.stringify(userData));
        window.location.href = '/pages/home/index.html';
    }catch(err){
        console.error('エラー発生: ', err);
        message.style.color = 'red';
        message.textContent = err.message;
    }
});

sign_link.addEventListener('click', async(e) => {
    window.location.href = '/pages/login/index.html';
});