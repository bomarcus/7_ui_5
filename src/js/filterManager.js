// filtering.js

function addEventListeners() {
  document.getElementById('searchInput').addEventListener('input', (event) => {
    clearFilters(); // Clear filters when starting a new search
    searchItems(data, event.target.value);
  });

  document.getElementById('clearSearch').addEventListener('click', () => {
    clearFilters();
  });

  document.getElementById('clearTags').addEventListener('click', () => {
    clearFilters();
  });
}

function clearFilters() {
  activeFilters.tags.clear();
  activeFilters.category = 'all';
  applyFilters(data);

  // Remove active class from all category and tag buttons
  document
    .querySelectorAll('#categoryButtons .btn, #tagButtons .btn')
    .forEach((btn) => {
      btn.classList.remove('active');
    });
}

document.getElementById('clearTags').addEventListener('click', () => {
  activeFilters.tags.clear();
  activeFilters.category = 'all';
  applyFilters(data);

  // Remove active class from all category and tag buttons
  document
    .querySelectorAll('#categoryButtons .btn, #tagButtons .btn')
    .forEach((btn) => {
      btn.classList.remove('active');
    });
});

function filterByCategory(data, category) {
  // Toggle active class for category buttons
  document.querySelectorAll('#categoryButtons .btn').forEach((btn) => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  activeFilters.category = category;
  applyFilters(data);
}
function filterByTag(data, tag) {
  // Toggle active class for tag buttons
  const tagButton = document.querySelector(`[data-tag='${tag}']`);
  if (activeFilters.tags.has(tag)) {
    activeFilters.tags.delete(tag);
    tagButton.classList.remove('active');
  } else {
    activeFilters.tags.add(tag);
    tagButton.classList.add('active');
  }
  applyFilters(data);
}

function applyFilters(data) {
  let filteredData = data;
  if (activeFilters.category !== 'all') {
    filteredData = filteredData.filter(
      (item) => item.category === activeFilters.category
    );
  }
  if (activeFilters.tags.size > 0) {
    filteredData = filteredData.filter((item) =>
      [...activeFilters.tags].some((tag) => item.tags.includes(tag))
    );
  }
  updateContent(filteredData);
}

function searchItems(data, searchText) {
  clearFilters(); // Clear filters before applying new search

  const lowerCaseSearchText = searchText.toLowerCase();
  const filteredData = data.filter((item) => {
    return (
      item.title.toLowerCase().includes(lowerCaseSearchText) ||
      item.description.toLowerCase().includes(lowerCaseSearchText) ||
      item.category.toLowerCase().includes(lowerCaseSearchText) ||
      item.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearchText))
    );
  });
  updateContent(filteredData);
}

function updateContent(data) {
  const contentContainer = document.querySelector('.content-container');
  contentContainer.innerHTML = '';
  data.forEach((item) => {
    contentContainer.appendChild(createPortfolioItem(item));
  });
}

let activeFilters = {
  category: 'all',
  tags: new Set(),
};
