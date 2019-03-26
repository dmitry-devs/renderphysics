export const loadingComplete = () => {
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('preloader--hidden');
        setTimeout(() => {
            preloader.style.display = 'none'
        }, 500)
    }, 1000)  ;
};