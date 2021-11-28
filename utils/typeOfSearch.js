export default function typeOfSearch(input){
    let inputLength = input.length 
    let inputFirst = input.charAt(0)
    let inputLast = input.charAt(7)
    if(inputLength == 8 && (inputFirst && inputLast) && (input.indexOf(" ")==-1)) return "SKU"
    return "description"
}