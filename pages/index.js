import Head from 'next/head'
import generate from './helper/generate'
import SnippetSelect from './components/SnippetSelect'

import reactSnippets from './snippets/react'
// https://highlightjs.org/download/

class Home extends React.Component {
    constructor() {
        super()
        this.generate = this.generate.bind(this)
        this.updateCode = this.updateCode.bind(this)
        this.state = {
            reactSnippets
        }
    }

    generate() {
        const { reactSnippets } = this.state
        let result = ''
        for (const snippet of reactSnippets) {
            result = `${result} ${generate(snippet)},`
        }
        console.log(result)
    }

    updateCode(newCode, index) {
        let newState = Object.assign({}, this.state);
        newState.reactSnippets[index].code = newCode;
        this.setState(newState);
    }

    render() {
        const { reactSnippets } = this.state

        return (
            <div>
                <Head>
                    <title>VS Code Snippet Generator</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="stylesheet" href="static/highlight.js/styles/vs.css"></link>
                </Head>
                <h1>VS Code Snippet Generator</h1>
                <div>
                    {
                        reactSnippets.map((snippet, index) => {
                            console.log(snippet.code)
                            return (
                                <SnippetSelect
                                    key={index}
                                    type="React"
                                    name={snippet.description}
                                    trigger={snippet.trigger}
                                    code={snippet.code}
                                    changeCode={ e => this.updateCode(e.target.value, index) }
                                />
                            )
                        })
                    }
                </div>
                <button onClick={this.generate}>Generate</button>
            </div>
        )
    }
}

export default Home