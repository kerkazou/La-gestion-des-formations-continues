import './style.css'

function Add(props) {
    return (
        <div className="modal fade" id="add_employee" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form className="modal-content" onSubmit={props.onSubmit}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Add Employee</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating text-muted">
                            <input onChange={props.onChange} className="form-control shadow-none" type='text' id='username' name='username' placeholder='Username' />
                            <label htmlFor='username'>Username</label>
                        </div>
                        <div className="form-floating text-muted mt-3">
                            <input onChange={props.onChange} className="form-control shadow-none" type='text' id='email' name='email' placeholder='Email' />
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div className="form-floating text-muted mt-3">
                            <select onChange={props.onChange} value={props.add} className="form-control shadow-none" id='organisme' name='organisme' placeholder='Organisme'>
                            <option value=''>Organisme</option>
                                {props.organismes.map((organisme, i) => (
                                    <option value={organisme.name} key={i}>{organisme.name}</option>
                                ))}
                            </select>
                            <label htmlFor='organisme'>Organisme</label>
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

export {
    Add
}