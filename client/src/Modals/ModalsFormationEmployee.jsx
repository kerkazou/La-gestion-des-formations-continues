import './style.css'

function Add(props) {
    return (
        <div className="modal fade" id="add_formation_employee" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form className="modal-content" onSubmit={props.onSubmit}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Formation Emplpyee</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating text-muted">
                            <select onChange={props.onChange} className="form-control shadow-none" id='employee' name='employee' placeholder='Employee'>
                            <option value=''>Employee</option>
                                {props.employees.map((employee, i) => (
                                    <option value={employee._id} key={i}>{employee.username}</option>
                                ))}
                            </select>
                            <label htmlFor='organisme'>Employee</label>
                        </div>
                        <div className="form-floating text-muted mt-3">
                            <select onChange={props.onChange} className="form-control shadow-none" id='formation' name='formation' placeholder='Formation'>
                            <option value=''>Formation</option>
                                {props.formations.map((formation, i) => (
                                    <option value={formation._id} key={i}>{formation.name}</option>
                                ))}
                            </select>
                            <label htmlFor='formation'>Formation</label>
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