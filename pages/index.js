import Head from 'next/head'
import cn from 'classnames'
import generate from './helper/generate'
import SnippetSelect from './components/SnippetSelect'
import Header from './components/Header'

import './global.scss'
import style from './index.scss'
import {
    htmlSnippets,
    pythonSnippets,
    reactSnippets,
} from './snippets'

class Home extends React.Component {
    constructor() {
        super()
        this.generate = this.generate.bind(this)
        this.updateSnippet = this.updateSnippet.bind(this)
        this.state = {
            snippets: [
                ...htmlSnippets,
                ...pythonSnippets,
                ...reactSnippets,
            ],
            types: [],
            selectedTypes: []
        }
    }

    componentWillMount() {
        const snippets = this.state.snippets
        const types = []
        const map = new Map();
        for (const snippet of snippets) {
            if(!map.has(snippet.type)){
                map.set(snippet.type, true);    // set any value to Map
                types.push({
                    typeName: snippet.type,
                    cssClass: snippet.cssClass
                });
            }
        }

        this.setState({
            types,
            selectedTypes: types.map(t => t.typeName)
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

    updateSnippet(value, type, index) {
        let newState = Object.assign({}, this.state);
        newState.snippets[index][type] = value;
        this.setState(newState);
    }

    generate() {
        const { snippets, selectedTypes } = this.state
        let result = ''
        for (const snippet of snippets) {
            if (
                selectedTypes.includes(snippet.type) &&
                snippet.active
            ) {
                result = `${result} ${generate(snippet)},`
            }
        }
        console.log(result)
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
                    <div className={style.buttonContainer}>
                        {
                            types.map((type, index) => {
                                const { typeName, cssClass } = type
                                return(
                                    <button
                                        key={index}
                                        className={cn(
                                            style.button,
                                            selectedTypes.includes(typeName) ? style.active : '',
                                            style[cssClass]
                                        )}
                                        onClick={() => {
                                            this.toggleType(typeName)
                                        }}
                                    >
                                        {typeName}
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
                        { snippets.map((snippet, index) => {
                            return (
                                selectedTypes.includes(snippet.type)
                                    ? <SnippetSelect
                                        key={index}
                                        type={snippet.type}
                                        description={snippet.description}
                                        trigger={snippet.trigger}
                                        code={snippet.code}
                                        active={snippet.active}
                                        toggleActive={ active => this.updateSnippet(active, 'active', index)  }
                                        changeCode={ e => this.updateSnippet(e.target.value, 'code', index) }
                                        changeDescription={ e => this.updateSnippet(e.target.value, 'description', index) }
                                        changeTrigger={ e => this.updateSnippet(e.target.value, 'trigger', index) }
                                    />
                                    : ''
                            )
                        })}
                    </table>
                </main>
                <button onClick={this.generate}>Generate</button>
            </div>
        )
    }
}

export default Home