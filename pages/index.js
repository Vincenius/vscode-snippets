import Head from 'next/head'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";

import generate from './helper/generate'
import { LanguageButtons, SnippetSelect } from './components'

import './global.scss'
import style from './index.scss'
import {
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
    vueSnippets,
} from './snippets'

const allSnippets = {
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
    vueSnippets,
}
const defaultSelected = ['HTML', 'JavaScript']
const ROW_HEIGHT = 28;

class Home extends React.Component {
    constructor() {
        super()
        this.generate = this.generate.bind(this)
        this.updateSnippet = this.updateSnippet.bind(this)
        this.toggleLanguage = this.toggleLanguage.bind(this)
        this.renderRow = this.renderRow.bind(this)

        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 28
        });

        const languages = []
        for (const snippet in allSnippets) {
            const language = allSnippets[snippet][0].language
            languages[language] = {
                selected: false,
                snippets: snippet,
                cssClass: allSnippets[snippet][0].cssClass
            }
        }

        this.state = {
            languages,
            activeSnippets: []
        }
    }

    componentWillMount() {
        for (const lang of defaultSelected) {
            this.toggleLanguage(lang)
        }
    }

    toggleLanguage(lang) {
        this.setState(prevState => {
            const languages = prevState.languages;
            const activeSnippets = []
            languages[lang].selected = !languages[lang].selected

            Object.keys(languages).map((lang, index) => {
                const { selected } = languages[lang]
                if (selected) {
                    const snippetSelector = languages[lang].snippets
                    activeSnippets.push(...allSnippets[snippetSelector])
                }
            })

            return {
                languages,
                activeSnippets
            };
        });
    }

    renderRow({ index, parent }) {
        const { activeSnippets } = this.state
        return (
            <CellMeasurer 
                key={index}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
            >
                <SnippetSelect
                    key={index}
                    language={activeSnippets[index].language}
                    description={activeSnippets[index].description}
                    trigger={activeSnippets[index].trigger}
                    code={activeSnippets[index].code}
                    active={activeSnippets[index].active}
                    toggleActive={ active => this.updateSnippet(active, 'active', index)  }
                    changeCode={ e => this.updateSnippet(e.target.value, 'code', index) }
                    changeDescription={ e => this.updateSnippet(e.target.value, 'description', index) }
                    changeTrigger={ e => this.updateSnippet(e.target.value, 'trigger', index) }
                />
            </CellMeasurer>
        );
    }

    updateSnippet(value, language, index) {
        let newState = Object.assign({}, this.state);
        newState.activeSnippets[index][language] = value;
        this.setState(newState);
    }

    generate() {
        const { activeSnippets } = this.state
        let result = ''
        for (const snippet of activeSnippets) {
            if (snippet.active) {
                result = `${result} ${generate(snippet)},`
            }
        }
        console.log(result)
    }

    render() {
        const { languages, activeSnippets } = this.state

        return (
            <div>
                <Head>
                    <title>Visual Studio Code - Snippet Generator</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="stylesheet" href="static/highlight.js/styles/vs.css"></link>
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></link>
                </Head>

                <header className={style.header}>
                    <h1>Visual Studio Code - Snippet Generator</h1>
                    <a
                        className={style.github}
                        href="https://github.com/Vincenius/vscode-snippets"
                        target="_blank"
                        rel="noopener"
                    >
                        Github
                    </a>
                </header>

                <main className={style.container}>
                    <h2>Step 1 - Select your languages:</h2>
                    <LanguageButtons 
                        toggleLanguage={this.toggleLanguage} 
                        languages={languages}
                    />

                    <h2>Step 2 - Choose and Customize your Snippets:</h2>
                    <table className={style.table}>
                        {
                            // https://blog.logrocket.com/rendering-large-lists-with-react-virtualized-82741907a6b3
                            // https://github.com/bvaughn/react-virtualized
                        }
                        <tbody>
                            <tr>
                                <th>Use</th>
                                <th>Language</th>
                                <th>Description</th>
                                <th>Trigger</th>
                                <th>Preview Code</th>
                                <th>Edit</th>
                            </tr>
                        </tbody>
                        <AutoSizer>
                            {({ height, width }) => (
                                <List
                                    width={width}
                                    height={height}
                                    rowHeight={this.cache.rowHeight}
                                    rowRenderer={this.renderRow}
                                    rowCount={activeSnippets.length}
                                    overscanRowCount={10} />
                            )}
                        </AutoSizer>

                    </table>

                    <h2>Step 3 - Generate your Snippet File (or just copy?):</h2>
                    <button onClick={this.generate}>Generate</button>

                    <h2>Step 4 - Insert your Snippets into Visual Studio Code</h2>
                    <p>Todo HOW TO DO THIS</p>
                </main>
            </div>
        )
    }
}

export default Home