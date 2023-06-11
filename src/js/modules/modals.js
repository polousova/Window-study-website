const modals = () => {
    function bindModal (triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelector(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);
        
        trigger.addEventListener('click', (e) => {
            if(e.target) {
                e.preventDefault;
            }

            modal.style.display = "block";
            //используем встроенный класс bootstrap modal-open
            document.body.classList.add('modal-open');
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

    const callEngineerBtn = document.querySelector('.popup_engineer_btn'),
        modalEngineer = document.querySelector('.popup_engineer'),
        modalEngineerClose = document.querySelector('.popup_engineer .popup_close');

    bindModal(callEngineerBtn, modalEngineer, modalEngineerClose);
};

export default modals;