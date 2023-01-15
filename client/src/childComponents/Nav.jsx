
export default function Nav() {

    const page = document.URL.split('/')[document.URL.split('/').length - 1].replace('-', ' ')

    return (
        <div className="d-flex justify-content-between align-items-center text-light px-3" style={{ 'height': '8vh', 'borderRadius': '16px', 'background': '#2874A6' }}>
            <div>Page/ <span>{(page === '' ? 'Statistique' : page)}</span></div>
            <div className="col-3 d-flex gap-3 justify-content-between align-items-center">
                <div className="input-group flex-nowrap">
                    <span className="input-group-text"><i className="bi bi-search"></i></span>
                    <input type="text" className="form-control shadow-none" placeholder="Search..." />
                </div>
                <i className="bi bi-bell fs-5" type="button"></i>
            </div>
        </div>
    );
}