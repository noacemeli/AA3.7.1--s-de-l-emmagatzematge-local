window.onload = () => {
  const button = document.querySelector("button");

  // Load existing products from localStorage on page load
  let products = JSON.parse(localStorage.getItem("products")) || [];

  const containers = document.querySelectorAll(".w3-container");
  const container = containers[1];

  // Function to save products to localStorage
  function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
  }

  // Display existing products on page load
  products.forEach((product) => {
    renderProduct(product);
  });

  // Add event listener to the button
  button.addEventListener("click", () => {
    var productInfo = document.querySelectorAll("input");
    var producte = productInfo[0].value;
    var quantitat = productInfo[1].value;
    var marca = productInfo[2].value;

    // Create product object
    const newProduct = {
      producte,
      quantitat,
      marca,
    };

    // Add new product to the array of products
    products.push(newProduct);

    // Save products to localStorage
    saveProducts();

    // Render the new product
    renderProduct(newProduct);
  });

  // Function to render product HTML
  function renderProduct(product) {
    var text = `
      <div class="w3-padding w3-xlarge">
        <span data-quantitat="${product.quantitat}" data-marca="${product.marca}">${product.producte}</span>
        <span class="w3-right">
          <i class="material-icons w3-hover-text-amber" style="cursor: pointer;" onclick="infoProduct(this)">info_outline</i>
          <i class="material-icons w3-hover-text-amber" style="cursor: pointer;" onclick="upProduct(this)">keyboard_arrow_up</i>
          <i class="material-icons w3-hover-text-amber" style="cursor: pointer;" onclick="downProduct(this)">keyboard_arrow_down</i>
          <i class="material-icons w3-hover-text-red" style="cursor: pointer;" onclick="deleteProduct(this)">delete_outline</i>
        </span>
      </div>
    `;

    const divProducte = document.createElement("div");
    divProducte.classList.add("w3-card-4");
    divProducte.classList.add("w3-margin-bottom");
    divProducte.classList.add("w3-hover-teal");
    divProducte.innerHTML = text;

    container.appendChild(divProducte);
  }
};

function infoProduct(info) {
  const attributes = info.parentElement.previousElementSibling;
  var nomProducte = attributes.innerHTML;
  var quantitat = attributes.getAttribute("data-quantitat");
  var marca = attributes.getAttribute("data-marca");

  alert(nomProducte + "\n" + quantitat + " unitats. \nMarca: " + marca);
}

function upProduct(moveUp) {
  var productToMoveUp = moveUp.parentElement.parentElement.parentElement;
  var potentialBrother = productToMoveUp.previousElementSibling;
  if (potentialBrother) {
    potentialBrother.before(productToMoveUp, potentialBrother);
  }
}

function downProduct(moveDown) {
  var productToMoveDown = moveDown.parentElement.parentElement.parentElement;
  var potentialBrother = productToMoveDown.nextElementSibling;
  if (potentialBrother) {
    potentialBrother.after(productToMoveDown);
  }
}

function deleteProduct(deleteProduct) {
  var productToDelete = deleteProduct.parentElement.parentElement.parentElement;
  productToDelete.remove();
}
