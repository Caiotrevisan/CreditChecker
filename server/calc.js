export const sum = (a, b) => {
    
    const result = parseInt(a) + parseInt(b)

    return result
}

export const sub = (a, b) => {
    
    const result = parseInt(a) - parseInt(b)

    return result
}

export const mult = (a, b) => {

    const result = parseFloat(a) * parseFloat(b)

    return result

}

export const div = (a, b) => {

    if (parseFloat(b) == 0){
        return "Não é possivel dividir por 0!"
    }

    const result = parseFloat(a) / parseFloat(b)

    return result

}