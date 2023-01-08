import './style.css'

export default function Add(props) {
    return (
        <div className="modal fade" id="add_organisme" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form className="modal-content" onSubmit={props.onSubmit}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Add Organisme</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating text-muted">
                            <input onChange={props.onChange} value={props.value} className="form-control shadow-none" type='text' id='name' name='name' placeholder='Name' />
                            <label htmlFor='name'>Name</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
}