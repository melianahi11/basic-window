document.addEventListener("DOMContentLoaded", main);

function main() {
    document.querySelectorAll('.window').forEach(windowElement => {
        dragHer(windowElement);
        resizeHer(windowElement);
        buttonHer(windowElement);
    });
    openHer();
}

function toggleDoorsVisibility(show) {
    const door1 = document.querySelector('#window1 .door1');
    const door2 = document.querySelector('#window1 .door2');
    if (show) {
        door1.style.display = 'block';
        door2.style.display = 'block';
    } else {
        door1.style.display = 'none';
        door2.style.display = 'none';
    }
}

function dragHer(windowElement) {
    const windowDrag = windowElement.querySelector('.window-header');
    let isDragging = false;
    let offsetX, offsetY;

    windowDrag.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - windowElement.getBoundingClientRect().left;
        offsetY = e.clientY - windowElement.getBoundingClientRect().top;
        windowElement.style.zIndex = '1000';
        if (windowElement.id === 'window1') toggleDoorsVisibility(false);
    });

    document.addEventListener('mousemove', function(e) {
        if(isDragging) {
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
            windowElement.style.zIndex = '1000';
            if (windowElement.id === 'window1') toggleDoorsVisibility(true);
        }
    });

    document.addEventListener('mouseup', function(e) {
        if(isDragging) {
            isDragging = false;
            windowElement.style.zIndex = '1000';
            if (windowElement.id === 'window1') toggleDoorsVisibility(true);
        }
    });
}

function resizeHer(windowElement) {
    const resizeHandles = windowElement.querySelectorAll('.resize-handle');

    resizeHandles.forEach(handle => {
        handle.addEventListener('mousedown', initResize);
    });

    let isResizing = false;
    let startX, startY, startWidth, startHeight, handleType;

    function initResize(e) {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(windowElement).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(windowElement).height, 10);
        handleType = e.target.classList[1];
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
        if (windowElement.id === 'window1') toggleDoorsVisibility(false);
    }

    function resize(e) {
        if (isResizing) {
            let newWidth, newHeight;
            switch(handleType) {
                case 'bottom-right':
                    newWidth = startWidth + e.clientX - startX;
                    newHeight = startHeight + e.clientY - startY;
                    break;
                case 'bottom-left':
                    newWidth = startWidth - e.clientX + startX;
                    newHeight = startHeight + e.clientY - startY;
                    if (newWidth >= 200) {
                        windowElement.style.left = e.clientX + 'px';
                    }
                    break;
                case 'top-right':
                    newWidth = startWidth + e.clientX - startX;
                    newHeight = startHeight - e.clientY + startY;
                    if (newHeight >= 200) {
                        windowElement.style.top = e.clientY + 'px';
                    }
                    break;
                case 'top-left':
                    newWidth = startWidth - e.clientX + startX;
                    newHeight = startHeight - e.clientY + startY;
                    if (newWidth >= 200) {
                        windowElement.style.left = e.clientX + 'px';
                    }
                    if (newHeight >= 200) {
                        windowElement.style.top = e.clientY + 'px';
                    }
                    break; 
            }

            if (newWidth >= 200) {
                windowElement.style.width = `${newWidth}px`;
            }
            if (newHeight >= 200) {
                windowElement.style.height = `${newHeight}px`;
            }
        }
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
        if (windowElement.id === 'window1') toggleDoorsVisibility(false);
    }
}

function buttonHer(windowElement) {
    const miniButton = windowElement.querySelector('.mini');
    const maxiButton = windowElement.querySelector('.maxi');
    const exitButton = windowElement.querySelector('.exit');

    let ogWidth = windowElement.style.width;
    let ogHeight = windowElement.style.height;
    let ogLeft = windowElement.style.left;
    let ogTop = windowElement.style.top;

    miniButton.addEventListener('click', function() {
        if (windowElement.style.width === '100vw' && windowElement.style.height === '100vh' || windowElement.style.width > ogWidth || windowElement.style.height > ogHeight) {
            windowElement.style.width = ogWidth;
            windowElement.style.height = ogHeight;
            windowElement.style.left = ogLeft;
            windowElement.style.top = ogTop;
            const content = windowElement.querySelector('.window-content');
            if (content) {
                content.style.display = 'block';
            }
            if (windowElement.id === 'window1') toggleDoorsVisibility(true);
        }
    });

    maxiButton.addEventListener('click', function() {
        if (windowElement.style.width != '100vw' && windowElement.style.height != '100vh') {
            windowElement.style.width = '100vw';
            windowElement.style.height = '100vh';
            windowElement.style.left = '0';
            windowElement.style.top = '0';
            const content = windowElement.querySelector('.window-content');
            if (content) {
                content.style.display = 'block';
            }
            if (windowElement.id === 'window1') toggleDoorsVisibility(false);
        }
    });

    exitButton.addEventListener('click', function() {
        windowElement.style.width = ogWidth;
        windowElement.style.height = '30px';
        const content = windowElement.querySelector('.window-content');
        if (content) {
            content.style.display = 'none';
        }

        const header = windowElement.querySelector('.window-header');
        if(header) {
            header.style.display = 'flex';
        }
        windowElement.style.display = 'block';
        if (windowElement.id === 'window1') toggleDoorsVisibility(false);
    });
}

function openHer() {
    var doors = document.querySelector(".doors");
    var door1 = document.querySelector(".door1");
    var door2 = document.querySelector(".door2");

    doors.addEventListener("click", function(event) {
        if (event.target.classList.contains('door1') || event.target.classList.contains('door2')) {
            toggleDoors();
        }
    });
    
    function toggleDoors() {
      console.log('Toggle doors function called');
      door1.classList.toggle("doorOpen1");
      door2.classList.toggle("doorOpen2");
    }
}