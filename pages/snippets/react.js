export default [
    {
        scope: "javascript,typescript", // move this?
        description: "Function Component", 
        trigger: "funccomp", 
        code: `function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
}`,
    },
    {
        description: "Class Component", 
        trigger: "classcomp",
        code: `class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>
    }
}`
    }
]

/*
toggle
this.setState(prevState => ({
    check: !prevState.check
}));

bind
this.changeCode = this.changeCode.bind(this)
*/