import formatSnippetJson from '../helper/formatSnippetJson.js'

import htmlSnippets from './html'
import cssSnippets from './css'

import reactJson from './react.json' // https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets

const reactSnippets = formatSnippetJson(reactJson, 'React')

// TODO sort
export {
    reactSnippets,
    cssSnippets,
    htmlSnippets
}

// https://marketplace.visualstudio.com/search?target=VSCode&category=Snippets&sortBy=Downloads
// https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets
// https://github.com/abusaidm/html-snippets
// scss