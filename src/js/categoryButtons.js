function addCategoryButtons(data) {
  // Create a map to group data by categories
  const categoryMap = data.reduce((map, item) => {
    if (!map[item.category]) {
      map[item.category] = [];
    }
    map[item.category].push(item);
    return map;
  }, {});

  const categoryButtonsContainer = document.getElementById('categoryButtons');

  // Iterate over each category in the map
  Object.keys(categoryMap).forEach((category) => {
    // Create the container for the split button
    const splitButtonContainer = document.createElement('div');
    splitButtonContainer.className = 'btn-group';

    // Create the main button
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary';
    button.textContent = category;
    button.setAttribute('data-filter', category);
    button.addEventListener('click', () => filterByCategory(data, category));

    // Create the dropdown toggle button
    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className =
      'btn btn-primary dropdown-toggle dropdown-toggle-split';
    toggleButton.setAttribute('data-bs-toggle', 'dropdown');
    toggleButton.setAttribute('aria-haspopup', 'true');
    toggleButton.setAttribute('aria-expanded', 'false');

    // Create the dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu';

    // Add items to the dropdown menu
    categoryMap[category].forEach((item) => {
      const dropdownItem = document.createElement('a');
      dropdownItem.className = 'dropdown-item';
      dropdownItem.href = '#'; // Modify as needed
      dropdownItem.textContent = item.title;
      dropdownMenu.appendChild(dropdownItem);
    });

    // Append elements to the split button container
    splitButtonContainer.appendChild(button);
    splitButtonContainer.appendChild(toggleButton);
    splitButtonContainer.appendChild(dropdownMenu);

    // Append the split button container to the main container
    categoryButtonsContainer.appendChild(splitButtonContainer);
  });
}
