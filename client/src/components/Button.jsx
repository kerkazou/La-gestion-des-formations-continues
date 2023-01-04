
export default function Button(props) {
    return (
        <button type='submit' className="btn rounded p-3 px-5 fw-bold position-absolute shadow-sm">{props.button}</button>
    );
}