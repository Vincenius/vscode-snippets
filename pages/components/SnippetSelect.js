import Highlight from 'react-highlight'
import cn from 'classnames'
import style from './SnippetSelect.scss'

class SnippetSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDetails: false,
            showEdit: false,
            type: props.type,
            name: props.name,
            trigger: props.trigger
        }
    }

    render() {
        const {
            type,
            name,
            trigger,
            showDetails,
            showEdit
        } = this.state

        const {
            code,
            changeCode
        } = this.props

        return (
            <div>
                <div>
                    {type} - 
                    {name} - 
                    {trigger} - 
                    <button onClick={() => { this.setState(prevState => ({ showDetails: !prevState.showDetails }))}}>Details</button> - 
                    <input type="checkbox" defaultChecked />
                </div>
                <div className={cn(style.details, showDetails ? style.visible : '')}>
                    <Highlight className='javascript hljs'>
                        {code}
                    </Highlight>
                    <button onClick={() => { this.setState(prevState => ({ showEdit: !prevState.showEdit }))}}>Edit</button>

                    <div className={cn(style.edit, showEdit ? style.visible : '')}>
                        <textarea value={code} onChange={changeCode}></textarea>
                    </div>
                </div>
            </div>
        )
    }
}

export default SnippetSelect