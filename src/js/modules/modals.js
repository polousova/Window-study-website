const modals = () => {
    function bindModal (triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);
        
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target) {
                    e.preventDefault;
                }
    
                modal.style.display = "block";
                //используем встроенный класс bootstrap modal-open
                document.body.classList.add('modal-open');
            });
        });

        //чтобы модальное окно закрывалось при клике на крестик
        close.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
        });

        //чтобы модальное окно закрывалось при клике на любое место подложки (div с классом popup_engineer)
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.style.display = "none";
                document.body.classList.remove('modal-open');
            }
        });
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
};

export default modals;