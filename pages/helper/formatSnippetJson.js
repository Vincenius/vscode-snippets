export default (json, type) => {
    const result = []

    for (const key in json) {
        result.push({
            type,
            active: true,
            name: key,
            description: json[key].description,
            trigger: json[key].prefix,
            code: json[key].body,
        })
    }

    return result
}