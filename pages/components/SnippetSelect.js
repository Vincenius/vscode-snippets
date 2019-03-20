import Highlight from 'react-highlight'
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

        return (
            <div>
                <div>
                    {type} - 
                    {description} - 
                    {trigger} - 
                    <button onClick={() => { this.setState(prevState => ({ showDetails: !prevState.showDetails }))}}>
                        Details
                    </button> - 
                    <input type="checkbox" defaultChecked />
                </div>
                <div className={cn(style.details, showDetails ? style.visible : '')}>
                    <Highlight className='javascript hljs'>
                        {code}
                    </Highlight>
                    <button onClick={() => { this.setState(prevState => ({ showEdit: !prevState.showEdit }))}}>
                        Edit
                    </button>

                    <div className={cn(style.edit, showEdit ? style.visible : '')}>
                        <input value={trigger} onChange={changeTrigger} />
                        <input value={description} onChange={changeDescription} />
                        <textarea value={code} onChange={changeCode}></textarea>
                    </div>
                </div>
            </div>
        )
    }
}

export default SnippetSelect