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
        label.className = 'btn btn'; // Adjust the class to match your existing buttons
        label.htmlFor = buttonId;
        label.textContent = tag;

        let colDiv = document.createElement('div');
        colDiv.className = 'col-md-auto'; // Ensure horizontal alignment
        colDiv.appendChild(checkbox);
        colDiv.appendChild(label);

        tagContainer.appendChild(colDiv);
      });

      // Creating category dropdown buttons
      categories.forEach((category, index) => {
        const dropdownId = `dropdownMenuButton-${index}`;
        let dropdownDiv = document.createElement('div');
        dropdownDiv.className = 'dropdown col-md-auto'; // Ensure horizontal alignment for categories

        let button = document.createElement('button');
        button.className = 'btn btn dropdown-toggle'; // Adjust the class to match your existing buttons
        button.type = 'button';
        button.id = dropdownId;
        button.dataset.toggle = 'dropdown';
        button.ariaHaspopup = 'true';
        button.ariaExpanded = 'false';
        button.textContent = category;

        let dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu';
        dropdownMenu.setAttribute('aria-labelledby', dropdownId);

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
    })
    .catch((error) => console.error('Error loading JSON data:', error));
});
