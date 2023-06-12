window.addEventListener('DOMContentLoaded', () => {

        //Modals
        function bindModal(triggerSelector, modalSelector, closeSelector) {
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

        //showModalByTime('.popup', 3000);

        //Tabs

        function tabs(headerSelector, tabSelector, contentSelector, activeClass) {
            const header = document.querySelector(headerSelector),
            tab = document.querySelectorAll(tabSelector),
            content = document.querySelectorAll(contentSelector);

            //скрываем все табы
            function hideTabContent() {
                content.forEach(item => {
                    item.style.display = "none";
                });

                //убираем класс активности
                tab.forEach(item => {
                    item.classList.remove(activeClass);
                });
            }

            //показываем таб i и добавляем ему класс активности
            function showTabContent(i = 0) { //сразу передаем 0 в качестве аргумента
                content[i].style.display = "block";
                tab[i].classList.add(activeClass);
            }

            hideTabContent();
            showTabContent();

            //делегируем событие клик оболочке всех табов
            header.addEventListener('click', (e) => {
                const target = e.target;
                //проаверяем, что пользователь кликнул либо на таб, либо на оболочку табов (parentNode)
                if(target.classList.contains(tabSelector.replace(/\./, "")) ||
                target.parentNode.classList.contains(tabSelector.replace(/\./, ""))) {
                    //когда перебираемый таб станет равен тому табу, который кликнул пользователь, 
                    //мы используем индекс i этого таба и передаем его аргументом функции
                    tab.forEach((item, i) => {
                        if(target == item || target.parentNode == item) {
                            hideTabContent();
                            showTabContent(i);
                        }
                    });
                }
            });

            tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
        }
});