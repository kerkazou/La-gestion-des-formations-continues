
export default function Nav() {
    return (
        <div className="d-flex justify-content-between align-items-center text-light px-3" style={{ 'height': '8vh', 'border-radius': '16px', 'background': '#2874A6' }}>
            <div>Page/....</div>
            <div className="col-3 d-flex gap-3 justify-content-between align-items-center">
                <div class="input-group flex-nowrap">
                    <span class="input-group-text"><i class="bi bi-search"></i></span>
                    <input type="text" class="form-control shadow-none" placeholder="Search..."/>
                </div>
                <i class="bi bi-bell fs-5" type="button"></i>
            </div>
        </div>
    );
}