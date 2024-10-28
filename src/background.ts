// background.ts
import { MessageType, PageData } from './messaging';

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message: MessageType, sender, sendResponse) => {
  if (message.type === 'STORE_ELEMENTS') {
      // Store the data in extension's local storage (NOT website's local storage)
      chrome.storage.local.set({
          [message.data.url]: message.data.elements
      }, () => {
          // After storing, immediately log
          chrome.storage.local.get(null, function(items) {
              console.log('Extension current local storage contents:', items);
          });
      });
  }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content-script.js']
        });
    }
});