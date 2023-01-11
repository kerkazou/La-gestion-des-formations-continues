import './style.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserService from "../services/user.service";
import { Navigate } from 'react-router-dom'
import { apiLogout } from "../actions/auth"


export default function FormationEmployee() {

    let [myformations, setMyFormations] = useState([])
    let state = useSelector((state) => state.auth)
    useEffect(() => {
        UserService.myFormation(state.user.token)
            .then((res) => {
                setMyFormations(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const dispatch = useDispatch();
    const Logout = () => {
        dispatch(apiLogout())
    }

    if (!useSelector((state) => state.auth.isLoggedIn)) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container-fluid">
            <div className="col py-3">
                <div className='d-flex justify-content-center'>
                    <div className="w-50 d-flex justify-content-between align-items-center text-light px-3 fs-6" style={{ 'height': '8vh', 'borderRadius': '16px', 'background': '#2874A6' }}>
                        <div>Logo</div>
                        <div type="button" onClick={Logout}>Logout</div>
                    </div>
                </div>
                <div className="container-fluid pb-3">
                    <div className="d-flex justify-content-center gap-3 px-3 py-5">
                        {myformations.length == 0
                            ? "You don't have any formation naw."
                            : myformations.map((myformation, i) => (
                                <div className="card col-3" key={i}>
                                    <img src={myformation.image} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{myformation.name}</h5>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}