document.querySelector('button.header-bar').addEventListener('click', () => {
    document.querySelector('nav.header-nav').classList.toggle('active');
});
window.addEventListener('resize', () => {
    if (window.innerWidth >= 800) {
        document.querySelector('nav.header-nav').classList.remove('active');
    }
});