export default ({description, trigger, code}) => {
    return `"${trigger}": {
        "prefix": "${trigger}",
        "body": [
            "${code}"
        ],
        "description": "${description}"
    }`
}
