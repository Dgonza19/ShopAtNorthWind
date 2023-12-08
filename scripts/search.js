"use strict";

let searchDropdown = document.getElementById("searchDropdown");
let categoryDropdown = document.getElementById("categoryDropdown");
let productContainer = document.getElementById("productContainer");

window.onload = init;

function init() {
  searchDropdown.onchange = handleSearchDropdownOnChange;

}

function handleSearchDropdownOnChange() {

  clearResults();

  let categoriesList = searchDropdown.value;

  if (categoriesList == "categorySearch") {
    handleCategorySelection();
  }
  else if (categoriesList == "viewAllSearch") {
    getAllProducts();
  }

  categoryDropdown.style.display = (categoriesList === "categorySearch") ? "block" : "none";

  fetch(`http://localhost:8081/api/categories`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network was not ok");
      }
      return response.json();
    })
    .then(data => {

      categoryDropdown.innerHTML = "";

      const defaultOption = new Option("Select one");
      categoryDropdown.appendChild(defaultOption);

      for (let category of data) {
        let option = new Option(category.name, category.categoryId);
        categoryDropdown.appendChild(option);
      }
    })
    .catch(error => console.error("Fetch error:", error));

  categoryDropdown.onchange = () => {
    let categorySelected = categoryDropdown.value;
    if (categorySelected) {
      handleCategorySelection(categorySelected);
    }
  };
}

function handleCategorySelection(category) {

  fetch(`http://localhost:8081/api/products/bycategory/${category}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network was not ok");
      }
      return response.json()
    })
    .then(data => {
      displayResults(data);
    })
    .catch(error => {
      console.error("Fetch category error: ", error);
    });
}

function getAllProducts() {

  // categoryDropdown.style.display = "none"

  fetch(`http://localhost:8081/api/products`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json()
    })
    .then(data => {
      displayResults(data)
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function displayResults(data) {

  clearResults();

  data.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.style = "width: 18rem;";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const productId = document.createElement("h4");
    productId.className = "card-title";
    productId.textContent = "ID: " + product.productId;

    const productName = document.createElement("h4");
    productName.className = "card-title";
    productName.textContent = product.productName;


    const unitPrice = document.createElement("h5");
    unitPrice.className = "card-subtitle mb-2 text-body-secondary";
    unitPrice.textContent = "Price: " + Number(product.unitPrice).toFixed(2);

    const unitsInStock = document.createElement("p");
    unitsInStock.textContent = "Units: " + product.unitsInStock;

    const supplier = document.createElement("p");
    supplier.textContent = "Supplier: " + product.supplier;

    const link = document.createElement("a");
    link.href = `details.html?id=${product.productId}`;
    link.textContent = "Product Details";

    cardBody.appendChild(productId);
    cardBody.appendChild(productName);
    cardBody.appendChild(unitPrice);
    cardBody.appendChild(unitsInStock);
    cardBody.appendChild(supplier);
    cardBody.appendChild(link);

    card.appendChild(cardBody);
    productContainer.appendChild(card);
  });
}

function clearResults() {
  productContainer.innerHTML = "";
}