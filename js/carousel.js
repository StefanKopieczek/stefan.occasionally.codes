(function() {
    const carousels = document.querySelectorAll('ol.carousel');
    console.log(`Found ${carousels.length} carousel(s)`)
    for (let carousel of carousels) {
        initCarousel(carousel);        
    }
    setTimeout(fadeOut, 5000, carousels);    
})();

function initCarousel(carousel) {
    console.log(`Starting carousel '${carousel.id}'`)    
    const items = carousel.querySelectorAll('li')
    if (items.length > 0) {
        items[0].classList.remove('hide');
        items[0].style.opacity = 1;
        for (let laterItem of Array.prototype.slice.call(items, 1)) {            
            laterItem.classList.add('hide')
            laterItem.style.opacity = 1;
        }
    }
    console.log(`Carousel ${carousel.id} started`)    
}

function fadeOut(carousels) {
    console.log('Fade out')
    let lastOpacity = -1;
    for (let carousel of carousels) {
        let activeItem = carousel.querySelector('li:not(.hide)');
        if (activeItem) {            
            activeItem.style.opacity = parseFloat(activeItem.style.opacity) - 0.01;
            lastOpacity = activeItem.style.opacity;
        }
    }

    if (lastOpacity <= 0) {
        tickCarousels(carousels);
        fadeIn(carousels);
    } else {
        setTimeout(fadeOut, 10, carousels);
    }
}

function tickCarousels(carousels) {
    for (let carousel of carousels) {
        let activeItem = carousel.querySelector('li:not(.hide)');    
        if (activeItem) {                       
            const allItems = carousel.querySelectorAll('li');
            const activeItemIdx = Array.prototype.indexOf.call(allItems, activeItem);
            activeItem.classList.add('hide');
            activeItem.style.opacity = 1;
            const nextItem = allItems[(activeItemIdx + 1) % allItems.length];
            nextItem.style.opacity = 0;
            nextItem.classList.remove('hide');            
            console.log(`Active item in carousel '${carousel.id}' was '${activeItem.innerText}'; now '${nextItem.innerText}'`)
        }
    }
}

function fadeIn(carousels) {    
    let lastOpacity = -1;
    for (let carousel of carousels) {
        let activeItem = carousel.querySelector('li:not(.hide)');
        if (activeItem) {                       
            activeItem.style.opacity = parseFloat(activeItem.style.opacity) + 0.01;                         
            lastOpacity = activeItem.style.opacity;
        }
    }

    if (lastOpacity >= 1) {
        setTimeout(fadeOut, 5000, carousels);
    } else {
        setTimeout(fadeIn, 10, carousels);
    }
}