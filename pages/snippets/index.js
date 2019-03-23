import formatSnippetJson from '../helper/formatSnippetJson.js'

import pythonJson from './python.json' // https://marketplace.visualstudio.com/items?itemName=ms-python.python
import htmlJson from './html.json' // https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets
import reactJson from './react.json' // https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets

const htmlSnippets = formatSnippetJson(htmlJson, 'HTML', 'html')
const pythonSnippets = formatSnippetJson(pythonJson, 'Python', 'python')
const reactSnippets = formatSnippetJson(reactJson, 'React', 'react')

export {
    htmlSnippets,
    pythonSnippets,
    reactSnippets,
}