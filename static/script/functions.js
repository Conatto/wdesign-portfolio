const animationClasses = ['fadeInUp', 'fadeInLeft', 'fadeInRight'];

window.onload = function() {
    bannerAnimation();
    observerTo('animation-children', fadeObserver);

    document.getElementById("yearNow").innerHTML = getYearNow();
    const popovers = document.querySelectorAll('.popover-gallery');
    if (popovers.length > 0) { 
        popovers.forEach((popover, index) => {
            tippy(popover, popoverList[index])
        });
    }
}

const getYearNow = () => { 
    const date = new Date(); 
    return date.getFullYear();
}

const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(element => {
        if (element.isIntersecting) {
            const el = element.target;
            if (el.classList.contains('animation-children')) {
                const childs = Array.from(el.querySelectorAll('.animate__animated')).reverse();
                animateChainedEffect(childs, childs.pop(), 150);
            }
        }
    });
}, { threshold: .1 });

function animateChainedEffect(arr, element, delay) {
    if ((element == null) || (!element.classList.contains("unanimated"))) return

    animateElement(element);
    setTimeout(() => {
        animateChainedEffect(arr, arr.pop(), delay);
    }, delay);
}
const animateElement = (element, prefix = 'animate__') => {
    element.classList.remove('unanimated');
    animationClasses.forEach(animationName => {
        if (element.classList.contains(animationName)) { 
            element.classList.remove(animationName);
            element.classList.add(prefix + animationName);
        }
    });
}

const bannerAnimation = () => {
    const banner = document.getElementsByClassName('banner')[0];
    const blocks = document.getElementsByClassName('blocks');

    if (banner === undefined || blocks === undefined) { return; }
    const LAST = 25;

    for (var i = 1; i < LAST+1; i++) {
      banner.innerHTML += "<div class='blocks'></div>";
      const duration = Math.random() * 1.5;
      blocks[i].style.animationDuration = duration+'s';
      blocks[i].style.animationDelay = duration+'s';
      if (i >= LAST) { addEvent(blocks[i], 'animationend', () => { 
        
       }); }
    }
}

// Funções Auxiliares
const observerTo = (targetClass, observer) => {
    Array.from(document.getElementsByClassName(targetClass)).forEach(key => {
        observer.observe(key);
    })
}
function addEvent(element, event, func) {
    if (element.attachEvent)
        return element.attachEvent('on'+event, func);
    else
        return element.addEventListener(event, func, false);
}
