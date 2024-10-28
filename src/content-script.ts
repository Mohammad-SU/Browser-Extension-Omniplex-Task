// content-script.ts
import { MessageType, TagInfo } from './messaging';

function collectElements(): TagInfo[] {
    const elements: TagInfo[] = [];
    
    const buttons = document.getElementsByTagName('button');
    const links = document.getElementsByTagName('a');

    // If button, only add tagname
    for (const button of buttons) {
        elements.push({
            tagName: 'button'
        });
    }

    // If link, also add href
    for (const link of links) {
        elements.push({
            tagName: 'a',
            href: link.href
        });
    }

    return elements;
}

function highlightElements(reverse: boolean = false) {
    const buttons = document.getElementsByTagName('button');
    const links = document.getElementsByTagName('a');

    const buttonColor = reverse ? 'orange' : 'blue';
    const linkColor = reverse ? 'blue' : 'orange';

    // Highlight buttons
    for (const button of buttons) {
        button.style.boxShadow = `0 0 20px ${buttonColor}`;
    }

    // Highlight links
    for (const link of links) {
        link.style.boxShadow = `0 0 20px ${linkColor}`;
    }
}

// Initial execution
function init() {
    console.log("Content script initialized");

    const urlParams = new URLSearchParams(window.location.search);
    const reverse = urlParams.get('reverse') === 'true';
    
    const elements = collectElements();
    
    // Send to background script
    chrome.runtime.sendMessage<MessageType>({
        type: 'STORE_ELEMENTS',
        data: {
            url: window.location.href,
            elements: elements
        }
    });

    highlightElements(reverse);
}

// Run on page load
init();