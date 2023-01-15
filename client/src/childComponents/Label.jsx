
export default function Label(props) {
    return (
        <label htmlFor={props.htmlFor}>{props.label}</label>
    );
}