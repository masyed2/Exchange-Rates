export function convert(amount, from, to, currencies) {
    let convert
    
    if (from == 'EUR') {
        convert = amount * currencies[to];
    } else {
        if (to == 'EUR') {
            convert = amount / currencies[from];
        } else {
            convert = amount / currencies[from];
            convert *= currencies[to];
        }
    }

    return (convert.toFixed(2));
}