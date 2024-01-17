// dataLoader.js
let data; // Ensure data is defined in the scope

fetch('src/data/data.json')
  .then((response) => response.json())
  .then((fetchedData) => {
    data = fetchedData; // Update the global `data`
    console.log(data); // Check the structure of the loaded data
    initializePage(data);
    addCategoryButtons(data);
    addTagButtons(data);
    addEventListeners();
  })
  .catch((error) => console.error('Error loading JSON data:', error));
