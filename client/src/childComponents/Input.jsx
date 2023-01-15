
export default function Input(props) {
    return (
        <input onChange={props.onChange} className="form-control shadow-none" type={props.type} id={props.id} name={props.name} value={props.value} placeholder={props.placeholder} />
    );
}