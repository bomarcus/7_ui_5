// contentManager.js

function initializePage(data) {
  const contentContainer = document.querySelector('.content-container');
  data.forEach((item) => {
    contentContainer.appendChild(createPortfolioItem(item));
  });
}

function createPortfolioItem(item) {
  const div = document.createElement('div');
  div.className = 'portfolio-item';
  div.style.maxWidth = '720px';
  div.style.margin = '0 auto';

  let moreInfo = '';
  for (const role in item.team) {
    moreInfo += `<p>${role}: ${item.team[role]}</p>`;
  }

  div.innerHTML = `
    <h6 class="lh-1 fs-6 font-monospace" style="margin: 0px 00px;">Category: ${item.category}</h6>
    <h6 class="lh-1 fs-6 font-monospace" style="margin: 0px 00px;"> Tags: ${item.tags}</h6>
    <h2 style="text-align: center; margin: 20px 0;">${item.title}</h2>
    <h3 style="text-align: center;">${item.subtitle}</h3>
<div class="image-container" style="position: relative; width: 100%; max-width: 720px; height: 0; padding-top: 56.25%; overflow: hidden; margin-top: 20px;">
  <img src="${item.imageUrl}" alt="${item.title}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
</div>
    <p style="margin: 20px 0px 0px 0px;">${item.description}</p>
    <p class="lh-1 font-monospace" style="margin: 0px 0px; ">${item.year}</p>
    <p class="lh-1 font-monospace" style="margin: 0px 0px;">${item.language}</p>
    <p class="lh-1 font-monospace" style="margin: 0px 0px;">${item.production}</p>

<button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#moreInfo${item.id}" aria-expanded="false" aria-controls="moreInfo${item.id}" style="display: block; margin-left: auto; margin-right: auto;">
      Show More
    </button>
    <div class="collapse" id="moreInfo${item.id}">
      <div class="card card-body">
        ${moreInfo}
      </div>
    </div>
    <hr class="border border-secondary border-1 opacity-75">
  `;
  return div;
}
