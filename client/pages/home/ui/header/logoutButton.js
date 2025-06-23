export async function logoutButton(){
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', async() => {
        window.location.href = '/pages/login/index.html';
    });
}
