async function multiplyArrays(array1, array2) {
    let newArray = [];
    try {
        for (let i = 0; i < array1.length; i++) {
            newArray[i] = array1[i] * array2[i];
        }
        return newArray;
    } catch (error) {
        console.log('Something is wrong in multiplyArrays function: ', error);
    }
    
}

export async function multiplyQuantityPerUnitPrice(quantity, unit_price) {
    try {
        let result = await multiplyArrays(quantity, unit_price);
        return result;
    } catch (error) {
        console.log('Something is wrong in multiplyQuantityPerUnitPrice: ', error);
    }
}

export async function totalOfTheOrder(amounts) {
    try {
        let total = amounts.reduce((prev, current) => { return prev + current });
        return total;   
    } catch (error) {
        console.log('Something is wrong in totalOfTheOrder: ', error);
    }
}