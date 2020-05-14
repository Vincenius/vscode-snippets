import cn from 'classnames'
import style from './LanguageButtons.scss'

function LanguageButtons(props) {
    return (
        <div className={style.buttonContainer}>
            {
                Object.keys(props.languages).map((lang, index) => {
                    const { cssClass, selected } = props.languages[lang]
                    return(
                        <button
                            key={index}
                            className={cn(
                                style.button,
                                selected ? style.active : '',
                                style[cssClass]
                            )}
                            onClick={() => {
                                props.toggleLanguage(lang)
                            }}
                        >
                            {lang}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default LanguageButtons