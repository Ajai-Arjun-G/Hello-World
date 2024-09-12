document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('.sent3');
    const optional = document.querySelector('.optional');
    const mainTv = document.querySelector('.tv-frame');
    const animatedElements = document.querySelectorAll('.leftTV, .rightTV, .topTV, .bottomTV');
    const textElement = document.querySelector('.sent1');
    const textElement2  = document.querySelector('.sent2');
    const textElement3  = document.querySelector('.sent3');

    const popUp = document.getElementById("pop-up");
    const close = document.querySelector(".close");
    const done = document.getElementById("done");
    const open = document.getElementById("pop-open");
    const name = document.getElementById('name');

    const text1 = "Hello Dear,";
    const text2 = "Welcome to our World";
    const text3 = "What was your Name again?";

    function typeWriter(element, text, speed = 200, isPlaceholder = false, callback = null) {
        let index = 0;

        function type() {
            if (index < text.length) {
                if (isPlaceholder) {
                    element.placeholder += text.charAt(index);
                } else {
                    element.textContent += text.charAt(index);
                }
                index++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();  
            }
        }

        type();
    }

    typeWriter(textElement, text1, 200, false, function() {
        typeWriter(textElement2, text2, 200, false, function() {
            typeWriter(textElement3, text3, 200, true, function(){
                input.focus();
            });
        });
    });


    if(input){
        input.addEventListener('input', () => {
            if (input.value.trim() !== '' && input.value.length >= 4) {
                optional.style.visibility = 'visible'; 
                optional.style.animationPlayState = "running";
            } else {
                optional.style.visibility = 'hidden'; 
                optional.style.animationPlayState = "paused";
            }
        });
    }
    
    open.onclick = function() {
        var val = input.value.trim();
        popUp.style.display = "block";
        name.textContent = val.charAt(0).toUpperCase() + val.slice(1);
        
    }

    close.addEventListener('click', function() {
        popUp.style.display = 'none'; 
    });

    done.addEventListener('click', function() {
        popUp.style.display = 'none'; 
    });

    document.addEventListener('mousemove', function(event) {
        const rect = mainTv.getBoundingClientRect();
        const x = event.clientX - 100;
        const y = event.clientY;
        const tvXMax = rect.right - 200;

        if (x >= rect.left && x <= tvXMax && y >= rect.top && y <= rect.bottom) {
            requestAnimationFrame(() => {
                animatedElements.forEach(el => {
                    el.style.visibility = 'visible';
                    el.style.animationPlayState = 'running';
                    el.classList.add('fade-in'); 
                    el.classList.remove('fade-out'); 
                });
            })
        } else {
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
                el.classList.add('fade-out'); 
                el.classList.remove('fade-in'); 

                setTimeout(() => {
                    el.style.visibility = 'hidden';
                }, 400);
            });
        }
    });
});
