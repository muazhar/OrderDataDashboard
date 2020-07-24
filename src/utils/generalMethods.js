/*
    This script contains general methods and functions used along the system.
    These offer some utility and can be individually imported from components.
*/

// Method that makes the first letter of a string uppercase
export const capitalize = string => {
    if (!string || string === '') return '';
    return string.replace(/^./, string.charAt(0).toUpperCase());
};

// Method that takes a float number representing monetary value, and converts it into a string
export const formatFloat = number => {
    if (!number || (typeof number !== 'number' && typeof number !== 'string'))
        return undefined;

    if (typeof number === 'string') number = parseFloat(number);

    return number.toFixed(2).replace(/\./, ',');
};

// Method that converts the date from xTech's API into a more suitable date format
export const formatDate = date => {
    if (typeof date === 'string') return new Date(date).toLocaleDateString();
    else return date.toLocaleDateString();
};

// Method that retrieves the time value from the date from xTech's API
export const formatTime = time => {
    if (typeof time === 'string') return new Date(time).toLocaleTimeString();
    else return time.toLocaleTimeString();
};

// This method gets a phone number and a text message and returns a whatsapp message link
export const generateWhatsappLink = (phone, message) => {
    if (!phone) return undefined;
    const phoneParam = phone.replace(/\(|\)| |-/g, '');
    const messageParam = message ? `&text=${encodeURI(message)}` : '';
    return `https://api.whatsapp.com/send?phone=55${phoneParam}${messageParam}`;
};

// Method that converts the paymento_info string into a viable url
export const paymentInfoToURL = paymentInfo => {
    try {
        const objInfo = JSON.parse(paymentInfo);
        if (objInfo.boletourl) return objInfo.boletourl;
        else if (objInfo.paymenturl) return objInfo.paymenturl;
        else return 'https://www.setordaembalagem.com';
    } catch (error) {
        console.error(error);
        return 'https://www.setordaembalagem.com';
    }
};

// Method that stringifies and array of products
export const productArrayToString = products => {
    let finalString = '';
    products.forEach((product, index) => {
        if (product.name) {
            finalString += product.name;
            if (index < products.length - 2) finalString += ', ';
            else if (index < products.length - 1) finalString += ' e ';
        }
    });

    return finalString;
};
