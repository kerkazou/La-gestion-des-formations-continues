import './style.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserService from "../../services/user.service";
import { Navigate } from 'react-router-dom'
import { apiLogout } from "../../actions/auth"


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
                    <div className="d-flex flex-wrap justify-content-center gap-3 px-3 py-5">
                        {myformations.length == 0
                            ? "You don't have any formation naw."
                            : myformations.map((myformation, i) => (
                                <div className="card col-lg-3 col-md-5 col-10 position-relative" key={i}>
                                    <img src={myformation.formation[0].image} className="card-img-top" style={{ height: '200px' }} alt="..." />
                                    <div className="card-body">
                                        <h4 className="card-title text-center fw-bold">{myformation.formation[0].name}</h4>
                                        <div className="card-title"><span className='fw-bold'>Date Debut:</span> {myformation.formation[0].dateDebut}</div>
                                        <div className="card-title"><span className='fw-bold'>Date Fin:</span> {myformation.formation[0].dateFin}</div>
                                        <div className='position-absolute top-0 start-0 d-flex justify-content-center text-light py-2 px-3' style={{ transform: 'rotate(-45deg)', marginTop: '10px', marginLeft: '-20px', borderRadius: '16px', background: 'rgb(40, 116, 166)' }}>
                                            {
                                                ((new Date(myformation.formation[0].dateFin).getTime() < new Date().getTime())) ? 'Terminer'
                                                    : ((new Date(myformation.formation[0].dateDebut).getTime() <= new Date().getTime()) && (new Date(myformation.formation[0].dateFin).getTime() >= new Date().getTime())) ? 'En coure'
                                                        : (new Date(myformation.formation[0].dateDebut).getTime() > new Date().getTime()) ? 'En attente'
                                                            : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}