// cart = mainContext
// product = The entire complete, as NEW object.
// ie { SKU: product.materialID, description: product.description, quantity }
export const Add = (product, cart = []) => {
  return [...cart.products, { ...product }];
};
export const Update = (product, cart = []) => {
  return [
    ...cart.products.map((p) =>
      p.SKU == product.SKU ? { ...p,...product} : p
    ),
  ];
};
export const Delete = (product, cart = []) => cart.products.filter(p => p.SKU != product.SKU)

export const CalculateTotal = (cart = []) =>{
  let numbers = cart.map(p => parseInt(p.price) * parseInt(p.quantity))
  return numbers.reduce((prev,cur)=> prev+cur,0)
}