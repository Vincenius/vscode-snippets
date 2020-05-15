import formatSnippetJson from '../helper/formatSnippetJson.js'

import angularJson from './angular.json' // https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2
import csharpJson from './csharp.json' // https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp
import dartJson from './dart.json' // https://marketplace.visualstudio.com/items?itemName=Dart-Code.dart-code
import goJson from './go.json' // https://marketplace.visualstudio.com/items?itemName=ms-vscode.Go
import htmlJson from './html.json' // https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets
import javaJson from './java.json' // https://marketplace.visualstudio.com/items?itemName=redhat.java
import javascriptJson from './javascript.json' // https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets
import pythonJson from './python.json' // https://marketplace.visualstudio.com/items?itemName=ms-python.python
import reactJson from './react.json' // https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets
import rubyJson from './ruby.json' // https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby
import sassJson from './sass.json' // https://marketplace.visualstudio.com/items?itemName=robinbentley.sass-indented
import vueJson from './vue.json' // https://marketplace.visualstudio.com/items?itemName=hollowtree.vue-snippets

const angularSnippets = formatSnippetJson(angularJson, 'Angular 7', 'angular')
const csharpSnippets = formatSnippetJson(csharpJson, 'C#', 'csharp')
const dartSnippets = formatSnippetJson(dartJson, 'Dart', 'dart')
const goSnippets = formatSnippetJson(goJson, 'Go', 'go')
const htmlSnippets = formatSnippetJson(htmlJson, 'HTML', 'html')
const javaSnippets = formatSnippetJson(javaJson, 'Java', 'java')
const javascriptSnippets = formatSnippetJson(javascriptJson, 'JavaScript', 'javascript')
const pythonSnippets = formatSnippetJson(pythonJson, 'Python', 'python')
const reactSnippets = formatSnippetJson(reactJson, 'React', 'react')
const rubySnippets = formatSnippetJson(rubyJson, 'Ruby', 'ruby')
const sassSnippets = formatSnippetJson(sassJson, 'Sass', 'sass')
const vueSnippets = formatSnippetJson(vueJson, 'Vue 2', 'vue')

export {
    angularSnippets,
    csharpSnippets,
    dartSnippets,
    goSnippets,
    htmlSnippets,
    javaSnippets,
    javascriptSnippets,
    pythonSnippets,
    reactSnippets,
    rubySnippets,
    sassSnippets,
    vueSnippets
}