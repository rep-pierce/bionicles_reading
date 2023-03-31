function boldHalfOfLetters(textNode) {
  const text = textNode.nodeValue;
  const words = text.split(/\s+/);
  const halfBoldWords = words.map((word) => {
    let boldedWord = '';
    for (let i = 0; i < word.length; i++) {
      boldedWord +=
        i < Math.ceil(word.length / 2) ? `<b>${word[i]}</b>` : word[i];
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