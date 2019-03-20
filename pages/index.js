import Head from 'next/head'
import generate from './helper/generate'
import SnippetSelect from './components/SnippetSelect'
import Header from './components/Header'

import global from './global.scss'
import reactSnippets from './snippets/react'
// https://highlightjs.org/download/

class Home extends React.Component {
    constructor() {
        super()
        this.generate = this.generate.bind(this)
        this.updateSnippet = this.updateSnippet.bind(this)
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

    updateSnippet(value, type, index) {
        let newState = Object.assign({}, this.state);
        newState.reactSnippets[index][type] = value;
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
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></link>
                </Head>
                
                <Header />

                <main>
                    {
                        reactSnippets.map((snippet, index) => {
                            return (
                                <SnippetSelect
                                    key={index}
                                    type="React"
                                    description={snippet.description}
                                    trigger={snippet.trigger}
                                    code={snippet.code}
                                    changeCode={ e => this.updateSnippet(e.target.value, 'code', index) }
                                    changeDescription={ e => this.updateSnippet(e.target.value, 'description', index) }
                                    changeTrigger={ e => this.updateSnippet(e.target.value, 'trigger', index) }
                                />
                            )
                        })
                    }
                </main>
                <button onClick={this.generate}>Generate</button>
            </div>
        )
    }
}

export default Home