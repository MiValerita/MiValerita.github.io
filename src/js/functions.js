/**
 * The functions that the program need
 * @module functions 
 */

/**
 * Argentinian Added Value Tax (Impuesto al Valor Agregado)
 * @type {Number}
 */
const iva = 21;

/**
 * Add IVA tax to a specific price
 * @function addIva
 * @param {Number} priceWhitoutIva The original price of the product
 * @returns {Number} The price with the IVA tax
 */
const addIva = (priceWhitoutIva) => priceWhitoutIva + (priceWhitoutIva * iva) / 100;

/**
 * Add the discount that the user entered
 * @function addDiscount
 * @param {Number} price Original price
 * @param {Number} discount Discount persent value
 * @returns The price without the discount persent
 */
const addDiscount = (price, discount) => price - (price * discount) / 100;

/**
 * Alert if the user data is wrong or invalid
 */
const invalid = () => alert("EL DATO INGRESADO NO FUE VALIDO");

/**
 * To check if the user data is OK based on the necesities
 * @param {Array <Number>} array The first value is the number to compare and the next one the max number that can take
 * @returns {Boolean}
 */
const loopChecker = (array) =>
    array[0] % 1 !== 0 || array[0] < 0 || (array[0] > 0 && array[0] > array[1]);

/**
 * Returns the string which we can print with the argentinian price form
 * @param {Number} price The price we need to print
 * @returns {String} The string we can show to the user
 */
const printPriceARG = (price) =>
    "$" + new Intl.NumberFormat("es-AR", {}).format(price);

/**
 * To get the basic information of a product
 * @param {Object} element The obj with the product information that we need to get (brand, name, price)
 * @returns {String} The string with that information
 */
const getRapidInfo = (element) =>
    element.brand + " " + element.name + " " + printPriceARG(element.price);

/**
 * To get the caregory related to the value we have
 * @param {Number} selection The value that reefer to a category
 * @returns {String} The category where the person is placed
 */
const getCategories = (selection) => {
    switch (selection) {
      case 1:
        return "Tarjetas Gráficas";

      case 2:
        return "Procesadores de Escritorio";

      case 3:
        return "Memorias RAM";

      case 4:
        return "Gabinetes de Escritorio";
    }
  };

/**
 * Show the categories of our stock
 * @param {Array<Object>} array The stock
 * @returns {String} String with numerated categories 
 */
const printCategories = (array) => {
    let  mySet = Array.from(new Set(array.map((el) => el.category)))

    return (
      "1. " + mySet.reduce((acc, el, inx) => (acc += `\n${inx + 1}. ${el}`))
    );
  };

/**
 * 
 * @param {Array<Object>} array 
 * @returns {Array<Number>} The slection of the user and the max value that selection can have 
 */
const menuSelection = (array) => {
    const options = printCategories(array);

    return [
      parseFloat(
        prompt(
          "Seleccione una de las categorias: \n" +
            "0. Finalizar compra \n" +
            options
        )
      ),
      options.split("\n").length,
    ];
  };

/**
 * 
 * @param {Array<Object>} array 
 * @param {Number} categoryInx 
 * @returns 
 */
const productsSelector = (array, categoryInx) => {
    const options = array
      .filter((el) => el.category === getCategories(categoryInx))
      .map((el) => getRapidInfo(el));

    const userChoice = parseFloat(
      prompt(
        "Seleccione un articulo indicando su índice o 0 para regresar: \n" +
          options.join("\n")
      )
    );

    return [userChoice, options.length];
  };

/**
 * 
 * @param {Array<Object>} array 
 * @param {Number} categoryInx 
 * @param {Number} productInx 
 * @returns {Number}
 */
const infoPreview = (array, categoryInx, productInx) => {
    let newArray = Object.entries(
      array.filter((el) => el.category === getCategories(categoryInx))[
        productInx - 1
      ]
    ).filter(
      (el) => el[1] !== false && el[0] !== "category" && el[1] !== undefined
    );

    newArray[0][1] = printPriceARG(newArray[0][1]);
    return parseFloat(
      prompt(
        "Pulse: 1.Continuar ///" +
          "/// 0.Regresar \n" +
          newArray.join("\n").split(",").join(": ")
      )
    );
  };

const addToCart = (array, categoryInx, productInx) => {
    return array.filter((el) => el.category === getCategories(categoryInx))[
      productInx - 1
    ];
  };

const getDiscount = (array, discount) => {
    return addDiscount(
      array.reduce((acc, el) => acc + el.price, 0),
      discount
    );
  };

const discountCodesChecker = (array, userSelection) => {
    if (userSelection === "descuento 20") return getDiscount(array, 20);

    else if (userSelection === "descuento 50") return getDiscount(array, 50);

    else if (userSelection === "0") return getDiscount(array, 0);

    else return -1;
  };

const discountCaller = (array) => {
    const userDiscountSelector = prompt(
      "Si quiere utilizar un codigo de descuento introduzcalo \n" +
        "En caso contrario introduzca 0"
    );
    return discountCodesChecker(array, userDiscountSelector);
  };

const printCart = (array, price) => {
    let cart;

    cart = array.map((el) => getRapidInfo(el)).join("\n");

    alert(
      "Su carrito es: \n" +
        cart +
        "\n" +
        "Siendo el TOTAL: " +
        printPriceARG(price)
    );
  };

export {
  addIva,
  invalid,
  loopChecker,
  menuSelection,
  productsSelector,
  infoPreview,
  addToCart,
  discountCaller,
  printCart,
};
