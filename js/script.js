document.addEventListener("DOMContentLoaded", main);

function main() {
    dragHer();
    resizeHer();
    buttonHer();
}

function dragHer() {
    const windowElement = document.querySelector('.window');
    const windowDrag = document.getElementById('window-header');
    let isDragging = false;
    let offsetX, offsetY;

    windowDrag.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - windowDrag.getBoundingClientRect().left;
        offsetY = e.clientY - windowDrag.getBoundingClientRect().top;
        windowElement.style.zIndex = '1000';
    });

    document.addEventListener('mousemove', function(e) {
        if(isDragging) {
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function(e) {
        if(isDragging) {
            isDragging = false;
            windowElement.style.zIndex = '';
        }
    });
}

function resizeHer() {
    const windowElement = document.querySelector('.window');
    const resizeHandles = document.querySelectorAll('.resize-handle');

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
    }
}

function buttonHer() {
    const windowElement = document.querySelector('.window');
    const miniButton = windowElement.querySelector('.mini');
    const maxiButton = windowElement.querySelector('.maxi');
    const exitButton = windowElement.querySelector('.exit');

    let ogWidth = windowElement.style.width;
    let ogHeight = windowElement.style.height;
    let ogLeft = windowElement.style.left;
    let ogTop = windowElement.style.top;

    miniButton.addEventListener('click', function() {
        if (windowElement.style.width === '100vw' && windowElement.style.height === '100vh') {
            windowElement.style.width = ogWidth;
            windowElement.style.height = ogHeight;
            windowElement.style.left = ogLeft;
            windowElement.style.top = ogTop;
            const content = windowElement.querySelector('.window-content');
            if (content) {
                content.style.display = 'block';
            }
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
    });
}