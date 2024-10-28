import { MessageType, TagInfo } from './messaging';

const collectElements = (): TagInfo[] => {
  // If button, only add tagname
  const buttons = Array.from(document.querySelectorAll('button'))
      .map(() => ({ tagName: 'button' }));
      
  // If link, also add href
  const links = Array.from(document.querySelectorAll('a'))
      .map(link => ({ 
          tagName: 'a', 
          href: (link as HTMLAnchorElement).href 
      }));

  return [...buttons, ...links];
}

const highlightElements = (reverse: boolean = false) => {
    const buttonColor = reverse ? 'orange' : 'blue';
    const linkColor = reverse ? 'blue' : 'orange';

    document.querySelectorAll('button')
        .forEach(button => button.style.boxShadow = `0 0 20px ${buttonColor}`);
        
    document.querySelectorAll('a')
        .forEach(link => link.style.boxShadow = `0 0 20px ${linkColor}`);
}

const init = () => {
    console.log("Content script initialized");

    const urlParams = new URLSearchParams(window.location.search);
    const reverse = urlParams.get('reverse') === 'true';
    
    const elements = collectElements();
    
    // Send elements to background script
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