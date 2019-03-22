export default (arr, type) => {
    return arr.map(elem => {
        return {
            ...elem,
            type,
            active: true
        }
    });
}