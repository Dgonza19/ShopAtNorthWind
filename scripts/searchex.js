"use strict"

let searchDropdown = document.getElementById("searchDropdown");
let categoryDropdownLabel = document.getElementById("categoryDropdownLabel");
let categoryDropdown = document.getElementById("categoryDropdown");
let productContainer = document.getElementById("productContainer");
let viewAllButton;

window.onload = () => {
  searchDropdown.onchange = searchChange;
};

//
function handleSearchDropdown() {

  if (searchDropdown.value === "Search by category") {
    // Show the sub-dropdown if Option 1 is selected
    categoryDropdown.style.display = "block";
    categoryDropdown.style.display = "block";
  } else {
    // Hide the sub-dropdown for other selections
    categoryDropdown.style.display = "none";
    categoryDropdown.style.display = "none";
  }
};

function displayProductsByCategories(categories) {

  categoryDropdown.innerHTML = '';

  let allCategoriesOption = document.createElement("option");
  allCategoriesOption.value = "viewAll";
  allCategoriesOption.textContent = "View All";
  productDcategoryDropdownropdown.appendChild(allCategoriesOption);

  // Add options for each category
  categories.forEach(category => {
      let option = document.createElement("option");
      option.value = category.categoryId;  
      option.textContent = category.name;  
      categoryDropdown.appendChild(option);
  });

}

function searchChange() {
  categoryDropdown.style.display = "block";

  if (searchDropdown.value === "categorySearch") {
      fetch("http://localhost:8081/api/categories")
          .then(response => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response.json();
          })
          .then(data => {
            displayProductsByCategories(data);
          })
          .catch(error => {
              console.error("Fetch error:", error);
          });
  } else if (searchDropdown.value === "viewAll") {
      displayViewAllProducts();
  }
}  

function displayViewAllProducts() {
  fetch("http://localhost:8081/api/products")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}

function displayResults(data) {
  productContainer.innerHTML = "";

  data.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";
      card.style = "width: 18rem;";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = product.name;

      const subtitle = document.createElement("h6");
      subtitle.className = "card-subtitle mb-2 text-body-secondary";
      subtitle.textContent = product.category;

      const description = document.createElement("p");
      description.className = "card-text";
      description.textContent = product.description;

      const detailsLink = createCardLink("See Details", `details.html?id=${product.id}`);
      cardBody.appendChild(title);
      cardBody.appendChild(subtitle);
      cardBody.appendChild(description);
      cardBody.appendChild(detailsLink);

      card.appendChild(cardBody);
      productContainer.appendChild(card);
  });
}

function createCardLink(text, href) {
  const link = document.createElement("a");
  link.className = "card-link";
  link.textContent = text;
  link.href = href;
  return link;
}

////////////////////////

// "use strict";

// let searchDropdown = document.getElementById("searchDropdown");
// let categoryDropdown = document.getElementById("");
// let productDropdown = document.getElementById("productDropdown");
// let productContainer = document.getElementById("productContainer");
// let viewAllButton;

// window.onload = () => {
//     searchDropdown.onchange = searchChange;
//     createViewAllButton(); // Create the "View All" button on page load
// };

// function populateCategoriesDropdown(categories) {
 
//   productDropdown.innerHTML = '';

//   let allCategoriesOption = document.createElement("option");
//   allCategoriesOption.value = "all";
//   allCategoriesOption.textContent = "All Categories";
//   productDropdown.appendChild(allCategoriesOption);

//   // Add options for each category
//   categories.forEach(category => {
//       let option = document.createElement("option");
//       option.value = category.categoryId;  // Assuming 'id' is a property in your category data
//       option.textContent = category.name;  // Assuming 'name' is a property in your category data
//       productDropdown.appendChild(option);
//   });
// }


// function createViewAllButton() {
//     viewAllButton = document.createElement("button");
//     viewAllButton.textContent = "View All";
//     viewAllButton.onclick = viewAllProducts;

//     // Append the button to the select dropdown container or any desired location
//     searchDropdown.parentNode.appendChild(viewAllButton);
// }


// function searchChange() {
//     productDropdown.style.display = "block";

//     if (searchDropdown.value === "categorySearch") {
//         fetch("http://localhost:8081/api/categories")
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 populateCategoriesDropdown(data);
//             })
//             .catch(error => {
//                 console.error("Fetch error:", error);
//             });
//     } else if (searchDropdown.value === "viewAll") {
//         viewAllProducts();
//     }
// }

// function viewAllProducts() {
//     fetch("http://localhost:8081/api/products")
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.json();
//         })
//         .then(data => {
//             displayResults(data);
//         })
//         .catch(error => {
//             console.error("Fetch error:", error);
//         });
// }

// function displayResults(data) {
//     productContainer.innerHTML = "";

//     data.forEach(product => {
//         const card = document.createElement("div");
//         card.className = "card";
//         card.style = "width: 18rem;";

//         const cardBody = document.createElement("div");
//         cardBody.className = "card-body";

//         const title = document.createElement("h5");
//         title.className = "card-title";
//         title.textContent = product.name;

//         const subtitle = document.createElement("h6");
//         subtitle.className = "card-subtitle mb-2 text-body-secondary";
//         subtitle.textContent = product.category;

//         const description = document.createElement("p");
//         description.className = "card-text";
//         description.textContent = product.description;

//         const detailsLink = createCardLink("See Details", `details.html?id=${product.id}`);
//         cardBody.appendChild(title);
//         cardBody.appendChild(subtitle);
//         cardBody.appendChild(description);
//         cardBody.appendChild(detailsLink);

//         card.appendChild(cardBody);
//         productContainer.appendChild(card);
//     });
// }

// function createCardLink(text, href) {
//     const link = document.createElement("a");
//     link.className = "card-link";
//     link.textContent = text;
//     link.href = href;
//     return link;
// }



