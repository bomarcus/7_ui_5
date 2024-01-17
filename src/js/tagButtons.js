//tagButtons.js

function addTagButtons(data) {
  const tags = new Set(data.flatMap((item) => item.tags));
  const tagButtonsContainer = document.getElementById('tagButtons');

  tags.forEach((tag) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn data-bs-toggle';
    button.textContent = tag;
    button.setAttribute('data-tag', tag);
    button.addEventListener('click', () => filterByTag(data, tag));
    tagButtonsContainer.appendChild(button);
  });
}
