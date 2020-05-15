import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useVirtual } from 'react-virtual'

import generate from './helper/generate'
import { LanguageButtons, SnippetSelect } from './components'

import './global.scss'
import * as S from './styled'
import {
    htmlSnippets,
    javascriptSnippets,
    reactSnippets,
    sassSnippets,
} from './snippets'

const allSnippets = {
    htmlSnippets,
    javascriptSnippets,
    sassSnippets,
}
const defaultSelected = ['HTML', 'JavaScript']
const ROW_HEIGHT = 28;

// https://github.com/tannerlinsley/react-virtual
const VsCodeSnippets = props => {
    const toggleLanguage = () => {}
    const [languages, setLanguages] = useState([])
    const [active, setActive] = useState([])

    useEffect(() => {
        const newLanguages = {}
        for (const snippet in allSnippets) {
            const language = allSnippets[snippet][0].language
            newLanguages[language] = {
                selected: defaultSelected.includes(language),
                snippets: snippet,
                cssClass: allSnippets[snippet][0].cssClass
            }
        }
        setLanguages(newLanguages)
    }, []);

    const activeSnippets = allSnippets.htmlSnippets
    const parentRef = React.useRef()
    const rowVirtualizer = useVirtual({
        size: activeSnippets.length,
        parentRef,
        estimateSize: React.useCallback(() => 35, []),
    })

    return (
        <div>
            <Head>
                <title>Visual Studio Code - Snippet Generator</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="static/highlight.js/styles/vs.css"></link>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></link>
            </Head>

            <S.Header>
                <h1>Visual Studio Code - Snippet Generator</h1>
                <S.GitHub
                    href="https://github.com/Vincenius/vscode-snippets"
                    target="_blank"
                    rel="noopener"
                >
                    Github
                </S.GitHub>
            </S.Header>

            <S.Container>
                <h2>Step 1 - Select your languages:</h2>
                <LanguageButtons
                    toggleLanguage={toggleLanguage}
                    languages={languages}
                />

                <h2>Step 2 - Choose and Customize your Snippets:</h2>
                <S.Table ref={parentRef}>
                    <S.TableBody totalSize={rowVirtualizer.totalSize}>
                        <tr> {/* TODO fix table head */}
                            <th>Use</th>
                            <th>Language</th>
                            <th>Description</th>
                            <th>Trigger</th>
                            <th>Preview Code</th>
                            <th>Edit</th>
                        </tr>

                        { rowVirtualizer.virtualItems.map(virtualRow => (
                            <S.TableRow
                                key={virtualRow.index}
                                start={virtualRow.start}
                                size={virtualRow.size}
                            >
                                <SnippetSelect
                                    key={virtualRow.index}
                                    language={activeSnippets[virtualRow.index].language}
                                    description={activeSnippets[virtualRow.index].description}
                                    trigger={activeSnippets[virtualRow.index].trigger}
                                    code={activeSnippets[virtualRow.index].code}
                                    active={activeSnippets[virtualRow.index].active}
                                    // TODO fix below
                                    toggleActive={ active => this.updateSnippet(active, 'active', virtualRow.index)  }
                                    changeCode={ e => this.updateSnippet(e.target.value, 'code', virtualRow.index) }
                                    changeDescription={ e => this.updateSnippet(e.target.value, 'description', virtualRow.index) }
                                    changeTrigger={ e => this.updateSnippet(e.target.value, 'trigger', virtualRow.index) }
                                />
                            </S.TableRow>
                        ))}
                    </S.TableBody>
                </S.Table>

                <h2>Step 3 - Generate your Snippet File (or just copy?):</h2>
                <button onClick={generate}>Generate</button>

                <h2>Step 4 - Insert your Snippets into Visual Studio Code</h2>
                <p>Todo HOW TO DO THIS</p>
            </S.Container>
        </div>
    )
}

export default VsCodeSnippets

/*
class VsCodeSnippets extends React.Component {
    renderRow = ({ index, parent }) => {
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

    updateSnippet= (value, language, index) => {
        let newState = Object.assign({}, this.state);
        newState.activeSnippets[index][language] = value;
        this.setState(newState);
    }

    generate = () => {
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

        )
    }
}

export default VsCodeSnippets
*/
