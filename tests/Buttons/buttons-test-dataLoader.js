document.addEventListener('DOMContentLoaded', function () {
  fetch('buttons-test-data.json')
    .then((response) => response.json())
    .then((data) => {
      const tagContainer = document.getElementById('tag-buttons');
      const categoryContainer = document.getElementById('category-buttons');

      // Extracting unique tags and categories
      const tags = Array.from(new Set(data.flatMap((item) => item.tags)));
      const categories = Array.from(new Set(data.map((item) => item.category)));

      // Creating tag buttons
      tags.forEach((tag, index) => {
        const buttonId = `btn-check-tag-${index}`;
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'btn-check';
        checkbox.id = buttonId;
        checkbox.autocomplete = 'off';

        let label = document.createElement('label');
        label.className = 'btn btn';
        label.htmlFor = buttonId;
        label.textContent = tag;

        let colDiv = document.createElement('div');
        colDiv.className = 'col-md-auto';
        colDiv.appendChild(checkbox);
        colDiv.appendChild(label);

        tagContainer.appendChild(colDiv);
      });

      // Creating category dropdown buttons
      categories.forEach((category, index) => {
        const dropdownId = `dropdownMenuButton-${index}`;
        let dropdownDiv = document.createElement('div');
        dropdownDiv.className = 'dropdown col-md-auto';

        let button = document.createElement('button');
        button.className = 'btn btn dropdown-toggle';
        button.type = 'button';
        button.id = dropdownId;
        button.dataset.toggle = 'dropdown';
        button.ariaHaspopup = 'true';
        button.ariaExpanded = 'false';
        button.textContent = category;

        let dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu';
        dropdownMenu.setAttribute('aria-labelledby', dropdownId);
        dropdownMenu.style.textAlign = 'left'; // Left align the text in the dropdown

        // Filtering items by category and adding them to the dropdown
        data
          .filter((item) => item.category === category)
          .forEach((item) => {
            let dropdownItem = document.createElement('a');
            dropdownItem.className = 'dropdown-item';
            dropdownItem.href = '#';
            dropdownItem.textContent = item.title;
            dropdownMenu.appendChild(dropdownItem);
          });

        dropdownDiv.appendChild(button);
        dropdownDiv.appendChild(dropdownMenu);

        categoryContainer.appendChild(dropdownDiv);
      });

      // Event listeners for .btn-check buttons and Clear Tags button
      var toggleButtons = document.querySelectorAll('.btn-check');
      var clearTagsButton = document.getElementById('clear-tags');

      clearTagsButton.addEventListener('click', function () {
        toggleButtons.forEach(function (toggleButton) {
          toggleButton.checked = false;
        });
        clearTagsButton.classList.remove('active');
      });

      toggleButtons.forEach(function (toggleButton) {
        toggleButton.addEventListener('change', function () {
          if (Array.from(toggleButtons).some((button) => button.checked)) {
            clearTagsButton.classList.add('active');
          } else {
            clearTagsButton.classList.remove('active');
          }
        });
      });
    })
    .catch((error) => console.error('Error loading JSON data:', error));
});
