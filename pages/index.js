import Head from 'next/head'
import generate from './helper/generate'
import SnippetSelect from './components/SnippetSelect'
import Header from './components/Header'

import './global.scss'
import style from './index.scss'
import { reactSnippets, htmlSnippets } from './snippets'
// https://highlightjs.org/download/

class Home extends React.Component {
    constructor() {
        super()
        this.generate = this.generate.bind(this)
        this.updateSnippet = this.updateSnippet.bind(this)
        this.state = {
            snippets: [...reactSnippets, ...htmlSnippets]
        }
    }

    generate() {
        const { snippets } = this.state
        let result = ''
        for (const snippet of snippets) {
            result = `${result} ${generate(snippet)},`
        }
        console.log(result)
    }

    updateSnippet(value, type, index) {
        let newState = Object.assign({}, this.state);
        newState.snippets[index][type] = value;
        this.setState(newState);
    }

    render() {
        const { snippets } = this.state

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
                    <table className={style.table}>
                        <tbody>
                            <tr>
                                <th>Use</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Trigger</th>
                                <th>Preview Code</th>
                                <th>Edit</th>
                            </tr>
                        </tbody>
                        {
                            snippets.map((snippet, index) => {
                                return (
                                    <SnippetSelect
                                        key={index}
                                        type="TODO"
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
                    </table>
                </main>
                <button onClick={this.generate}>Generate</button>
            </div>
        )
    }
}

export default Home