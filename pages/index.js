import Head from 'next/head'
import cn from 'classnames'
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
            snippets: [
                ...reactSnippets,
                ...htmlSnippets
            ],
            types: [],
            selectedTypes: []
        }
    }

    componentWillMount() {
        const types = [...new Set(this.state.snippets.map(s => s.type))]
        this.setState({
            types,
            selectedTypes: types
        })
    }

    toggleType(type) {
        this.setState(prevState => {
            const selectedTypes = prevState.selectedTypes.includes(type)
                ? prevState.selectedTypes.filter(t => t !== type)
                : [ ...prevState.selectedTypes, type ]

            return {
                selectedTypes,
            };
        });
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
        const { snippets, types, selectedTypes } = this.state

        return (
            <div>
                <Head>
                    <title>VS Code Snippet Generator</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="stylesheet" href="static/highlight.js/styles/vs.css"></link>
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></link>
                </Head>

                <Header />

                <main className={style.container}>
                    <div>
                        {
                            types.map((type, index) => {
                                return(
                                    <button 
                                        key={index}
                                        className={cn(
                                            selectedTypes.includes(type) ? style.active : '', 
                                            style[type.toLowerCase()]
                                        )}
                                        onClick={() => { 
                                            this.toggleType(type)
                                        }}
                                    >
                                        {type}
                                    </button>
                                )
                            })
                        }
                    </div>
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
                                    selectedTypes.includes(snippet.type)
                                        ? <SnippetSelect
                                            key={index}
                                            type={snippet.type}
                                            description={snippet.description}
                                            trigger={snippet.trigger}
                                            code={snippet.code}
                                            changeCode={ e => this.updateSnippet(e.target.value, 'code', index) }
                                            changeDescription={ e => this.updateSnippet(e.target.value, 'description', index) }
                                            changeTrigger={ e => this.updateSnippet(e.target.value, 'trigger', index) }
                                        />
                                        : ''
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