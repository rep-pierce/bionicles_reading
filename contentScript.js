const customBoldClass = 'custom-bold';

// Add the custom CSS class for increased boldness
const style = document.createElement('style');
style.textContent = `
  .${customBoldClass} {
    font-weight: 900; /* Increase this value for a bolder font-weight (100 to 900) */
  }
`;
document.head.appendChild(style);

function boldHalfOfLetters(textNode) {
  const text = textNode.nodeValue;
  const words = text.split(/\s+/);
  const halfBoldWords = words.map((word) => {
    let boldedWord = '';
    for (let i = 0; i < word.length; i++) {
      boldedWord +=
        i < Math.ceil(word.length / 2)
          ? `<span class="${customBoldClass}">${word[i]}</span>`
          : word[i];
    }
    return boldedWord;
  });
  const newNode = document.createElement('span');
  newNode.innerHTML = halfBoldWords.join(' ');
  textNode.replaceWith(newNode);
}

function walk(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    boldHalfOfLetters(node);
  } else {
    for (let child of node.childNodes) {
      walk(child);
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'boldHalfOfLetters') {
    walk(document.body);
  }
});