window.addEventListener('DOMContentLoaded', () => {

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

            bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
            bindModal('.phone_link', 'popup', '.popup .popup_close');
        }

        function showModalByTime(selector, time) {
            setTimeout(function() {
                document.querySelector(selector).style.display = "block";
                document.body.style.overflow = "hidden";
            }, time);
        }

        showModalByTime('.popup', 3000);
});