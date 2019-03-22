import snippetMapper from '../helper/snippetMapper'

export default snippetMapper([
    {
        description: "HTML - Defines the document type",
        trigger: "doctype",
        code: `<!DOCTYPE>
$1`,
    }
], 'HTML')