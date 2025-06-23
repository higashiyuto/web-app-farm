export function setupSearchToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-search');

    toggleButtons.forEach(toggleBtn => {
        toggleBtn.addEventListener('click', () => {
            const container = toggleBtn.closest('.search-toggle-container');
            const searchBox = container.querySelector('.search-box');

            const isOpen = searchBox.classList.toggle('open');
            searchBox.classList.toggle('hidden', !isOpen);
            toggleBtn.textContent = isOpen ? '▲' : '▼';
        });
    });
}