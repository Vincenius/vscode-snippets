export default ({description, trigger, code}) => {
    const codeArray = code.split(/\r?\n/)
    const codeString = `"${codeArray.join('",\n\t\t\t"')}"`

    return `"${description}": {
        "prefix": "${trigger}",
        "body": [
            ${codeString}
        ],
        "description": "${description}"
    }`
}
