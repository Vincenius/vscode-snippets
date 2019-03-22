import Highlight from 'react-highlight'
import Textarea from 'react-textarea-autosize';
import cn from 'classnames'
import style from './SnippetSelect.scss'

class SnippetSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDetails: false,
            showEdit: false,
        }
    }

    render() {
        const { showDetails, showEdit } = this.state
        const {
            type,
            code,
            trigger,
            description,
            changeCode,
            changeTrigger,
            changeDescription
        } = this.props

        const editClass = cn(style.edit, showEdit ? style.visible : '')
        const editHideClass = cn(style.edit, !showEdit ? style.visible : '')

        return (
            <tbody className={style.container}>
                <tr>
                    <td className={style.useColumn}>
                        <input type="checkbox" defaultChecked />
                    </td>
                    <td className={style.typeColumn}>
                        {type}
                    </td>
                    <td>
                        <span className={editHideClass}>{description}</span>
                        <input className={editClass} value={description} onChange={changeDescription} />
                    </td>
                    <td>
                        <span className={editHideClass}>{trigger}</span>
                        <input className={editClass} value={trigger} onChange={changeTrigger} />
                    </td>
                    <td className={style.previewCodeColumn}>
                        <a onClick={() => { this.setState(prevState => ({ showDetails: !prevState.showDetails }))}}>
                            { showDetails
                                ? 'Hide Code'
                                : 'Show code'
                            }
                        </a>
                    </td>
                    <td className={style.editColumn}>
                        <a onClick={() => { this.setState(prevState => ({ showEdit: !prevState.showEdit }))}}>
                        { showEdit
                                ? 'Submit'
                                : 'Edit'
                            }
                        </a>
                    </td>
                </tr>
                <tr className={cn(style.details, showDetails ? style.visible : '')}>
                    <td colSpan={6}>
                        <Highlight className={cn(editHideClass, 'javascript hljs')}>
                            {code}
                        </Highlight>
                        <div className={editClass}>
                            <Textarea value={code} onChange={changeCode} />
                        </div>
                    </td>
                </tr>
            </tbody>
        )
    }
}

export default SnippetSelect