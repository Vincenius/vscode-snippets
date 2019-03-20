import style from './Header.scss'

function Header(props) {
    return (
        <header className={style.header}>
            <div className={style.headlines}>
                <h1>VS Code Snippet Generator</h1>
                <h2>Speed up your development!</h2>
            </div>
            <img src="/static/ajax-snippet.gif" />
        </header>
    )
}

export default Header