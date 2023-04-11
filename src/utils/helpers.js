export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',  
    }).format(price / 100)
};

export const getUniqueValues = (array, property) => {
    let values = array.map(item => item[property])
    
    if(property === 'colors') {
        values = values.flat();
    }
    
    const uniqueValues = new Set(values);

    return ["all", ...uniqueValues];
}