//const hostname = window.location.hostname;
//const BASE_URL = `http://${hostname}:3000`;
const BASE_URL = window.location.origin;

let currentUser = null;
export async function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
        const res = await fetch(`${BASE_URL}/api/accounts/user?email=${encodeURIComponent(user.email)}`);
        const userData = await res.json();
        if (!res.ok) throw new Error(userData.error);

        // ヘッダーに表示
        document.getElementById('user-name').textContent = userData.name;
        if (userData.profileImageUrl) {
            document.getElementById('user-image').src = userData.profileImageUrl;
        }

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
