import { useState } from 'react'

export default function SidBar() {

    const [btn, setBtn] = useState(false)
    const [menus, setMenus] = useState([
        { name: 'Statistique', href: 'Statistique', icon: 'bi bi-house' },
        { name: 'Employee', href: 'Employee', icon: 'bi bi-people' },
        { name: 'Organisme', href: 'Organisme', icon: 'bi bi-building' },
        { name: 'Formation', href: 'Formation', icon: 'bi bi-briefcase' }
    ])

    return (
        <div className={!btn ? 'col-auto col-md-3 col-xl-2 px-sm-2 mx-2' : 'col-auto px-2 mx-2'} style={{ 'background': '#2874A6', 'height': '96vh', 'margin-top': '2vh', 'border-radius': '16px'}}>
            <div className="d-flex flex-column align-items-center px-3 py-2 text-white h-100">
                <div className="w-100 d-flex justify-content-end align-items-center fs-4 d-none d-sm-inline pb-3 me-md-auto text-white" type='button'>
                    {btn
                        ? <i className="bi bi-arrow-bar-right float-end" onClick={e => { setBtn(false) }}></i>
                        : <i className="bi bi-arrow-bar-left float-end" onClick={e => { setBtn(true) }}></i>
                    }
                </div>
                <ul className="nav nav-pills flex-column align-items-center align-items-sm-start position-relative h-100 gap-5 mb-2 py-3">
                    {menus.map((menu) => (
                        <a href={menu.href} className="text-white text-decoration-none">
                            <li className="nav-item d-flex gap-3 align-items-center">
                                <span className="ms-1 h5"><i className={menu.icon}></i></span>
                                <span className={!btn ? 'ms-1 d-none d-sm-inline' : 'd-none'}>{menu.name}</span>
                            </li>
                        </a>
                    ))}
                    <li className="nav-item position-absolute bottom-0 d-flex gap-3 align-items-center">
                        <span className="ms-1 h5"><i className='bi bi-box-arrow-left'></i></span>
                        <span className={!btn ? 'ms-1 d-none d-sm-inline' : 'd-none'}>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}