export default (json, language, cssClass) => {
    const result = []

    for (const key in json) {
        result.push({
            language,
            cssClass,
            active: true,
            name: key,
            description: json[key].description,
            trigger: json[key].prefix,
            code: formatToString(json[key].body),
        })
    }

    return result
}

function formatToString(body) {
    const stringBody = typeof body === 'object'
        ? body.join('\n')
        : body
    return stringBody
}