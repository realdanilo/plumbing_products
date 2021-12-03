export const Add = (product, arr =[])=>{
    return [...arr,{product}]
}
export const Update = (product, arr = [])=>{
    return arr.map(p => p.SKU == product.SKU ? {...p} : p)
}