import './style.css'
import SidBar from '../components/SidBar';
import Nav from '../components/Nav';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from "../services/user.service";

export default function Statistique() {

    const [cards, setCards] = useState([])
    useEffect(() => {
        UserService.getStatistique()
            .then((res) => {
                setCards([
                    { name: 'Employee', number: res.data.employee, icon: 'bi bi-people' },
                    { name: 'Organisme', number: res.data.organisme, icon: 'bi bi-building' },
                    { name: 'Formation', number: res.data.formation, icon: 'bi bi-briefcase' }
                ])
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <SidBar />
                <div className="col py-3">
                    <Nav />
                    <div className="container-fluid pb-3">
                        <div className="row d-flex flex-wrap justify-content-center align-items-center py-4">
                            {cards.map((card, i) => (
                                <div className=" col-xl-4 col-sm-6 mb-xl-0" key={i}>
                                    <div className="card border-0 shadow-sm mb-3" style={{ 'minHeight': '120px', 'borderRadius': '16px' }}>
                                        <div className="card-body d-flex justify-content-between p-3">
                                            <div className='d-flex flex-column justify-content-between'>
                                                <h4 className="text-sm mb-0 text-uppercase font-weight-bold">{card.name}</h4>
                                                <h3 className="font-weight-bolder">{card.number}</h3>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center fs-2'>
                                                <div className='d-flex justify-content-center align-items-center text-light' style={{ 'height': '60px', 'width': '60px', 'borderRadius': '50%', 'background': '#2874A6' }}>
                                                    <i className={card.icon}></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}