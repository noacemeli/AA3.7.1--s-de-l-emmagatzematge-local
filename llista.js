window.onload = () => {
  const button = document.querySelector("button");

  const container = document.querySelector(".w3-card-4").parentElement;

  //funcion que se lanza cuando se hace click en el boton para añadir un producto
  button.addEventListener("click", (event) => {
    //valores del producto a añadir
    var productInfo = document.querySelectorAll("input");
    var producte = productInfo[0].value;
    var quantitat = productInfo[1].value;
    var marca = productInfo[2].value;

    // console.log(producte, quantitat, marca);

    //string con la informacion html del div del producto existente cambiando los valores por los del producto nuevo
    var text =
      `
         <div class="w3-padding w3-xlarge">
                              <span data-quantitat="` +
      quantitat +
      `" data-marca="` +
      marca +
      `">` +
      producte +
      `</span>
                              <span class="w3-right">
                                  <i class="material-icons w3-hover-text-amber" style="cursor: hand;" onclick="infoProduct(this)">info_outline</i>
                                  <i class="material-icons w3-hover-text-amber" style="cursor: hand;" onclick="upProduct(this)">keyboard_arrow_up</i>
                                  <i class="material-icons w3-hover-text-amber" style="cursor: hand;" onclick="downProduct(this)">keyboard_arrow_down</i>
                                  <i class="material-icons w3-hover-text-red" style="cursor: hand;" onclick="deleteProduct(this)">delete_outline</i>
                              </span>
                          </div>
                      `;

    //creamos un div al que le añadiremos las mismas clases que el div del producto existente
    const divProducte = document.createElement("div");

    divProducte.classList.add("w3-card-4");
    divProducte.classList.add("w3-margin-bottom");
    divProducte.classList.add("w3-hover-teal");

    //añadimos a este div la informacion HTML con los valores del producto nuevo
    divProducte.innerHTML = text;

    //colocamos este nuevo producto ANTES que el ya existente
    let potentialChild = container.firstChild;
    if (potentialChild) {
      potentialChild.before(divProducte, potentialChild);
    }

    //container.appendChild(divProducte);
  });
};

//funcio per donar la informació d'un producte
function infoProduct(info) {
  const attributes = info.parentElement.previousElementSibling;

  var nomProducte = attributes.innerHTML;
  var quantitat = attributes.attributes[0].value;
  var marca = attributes.attributes[1].value;

  alert(nomProducte + "\n" + quantitat + " unitats. \nMarca: " + marca);

  console.log(nomProducte, marca, quantitat);
}
//2 funcións per moure un producte
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
//funció pero esborrar un producte
function deleteProduct(deleteProduct) {
  var productToDelete = deleteProduct.parentElement.parentElement.parentElement;

  productToDelete.remove();
}
