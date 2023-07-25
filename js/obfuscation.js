(function() {
    const elements = document.querySelectorAll('.obfuscated');
    for (let element of elements) {
        element.innerText = atob(element.innerText)

        if (element.tagName === 'A') {
            element.setAttribute('href', atob(element.getAttribute('href')))
        }
    }
})()