window.onload = () => {
  const button = document.querySelector("button");

  // Carregar productes existents des del localStorage en carregar la pàgina
  let products = JSON.parse(localStorage.getItem("products")) || [];

  const containers = document.querySelectorAll(".w3-container");
  const container = containers[1];

  // Funció per desar els productes al localStorage
  function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
  }

  // Mostrar els productes existents en carregar la pàgina
  products.forEach((product) => {
    renderProduct(product);
  });

  // Afegir escoltador d'esdeveniments al botó
  button.addEventListener("click", () => {
    var productInfo = document.querySelectorAll("input");
    var producte = productInfo[0].value;
    var quantitat = productInfo[1].value;
    var marca = productInfo[2].value;

    // Crear objecte de producte
    const newProduct = {
      producte,
      quantitat,
      marca,
    };

    // Afegir nou producte a l'array de productes
    products.push(newProduct);

    // Desar productes al localStorage
    saveProducts();

    // Renderitzar el nou producte
    renderProduct(newProduct);
  });

  // Funció per renderitzar l'HTML del producte
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

// Funció per mostrar la informació d'un producte
function infoProduct(info) {
  const attributes = info.parentElement.previousElementSibling;
  var nomProducte = attributes.innerHTML;
  var quantitat = attributes.getAttribute("data-quantitat");
  var marca = attributes.getAttribute("data-marca");

  alert(nomProducte + "\n" + quantitat + " unitats. \nMarca: " + marca);
}

// Funció per moure un producte cap amunt
function upProduct(moveUp) {
  var productToMoveUp = moveUp.parentElement.parentElement.parentElement;
  var potentialBrother = productToMoveUp.previousElementSibling;
  if (potentialBrother) {
    potentialBrother.before(productToMoveUp, potentialBrother);
  }
}

// Funció per moure un producte cap avall
function downProduct(moveDown) {
  var productToMoveDown = moveDown.parentElement.parentElement.parentElement;
  var potentialBrother = productToMoveDown.nextElementSibling;
  if (potentialBrother) {
    potentialBrother.after(productToMoveDown);
  }
}

// Funció per esborrar un producte
function deleteProduct(deleteProduct) {
  var productToDelete = deleteProduct.parentElement.parentElement.parentElement;
  productToDelete.remove();
}
