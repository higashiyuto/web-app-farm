const isLocal = window.location.hostname === 'localhost';
const BASE_URL = isLocal ? 'http://localhost:3000' : window.location.origin;

export async function loadWorldUserInfo() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
        const res = await fetch(`${BASE_URL}/api/accounts/list}`);
        const userData = await res.json();
        if (!res.ok) throw new Error(userData.error);
        // グローバルで保持
        return {
            name: userData.name,
            image: userData.profileImageUrl,
            email: user.email
        };

    } catch (err) {
        console.error('ユーザ情報取得エラー:', err);
    }
}