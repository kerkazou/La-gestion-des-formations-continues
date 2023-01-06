import './style.css'
import SidBar from '../components/SidBar';
import Nav from '../components/Nav';
import { useState } from 'react';

export default function Statistique() {

    const [cards, setCards] = useState([
        { name: 'Employee', number: 0, icon: 'bi bi-people' },
        { name: 'Organisme', number: 0, icon: 'bi bi-building' },
        { name: 'Formation', number: 0, icon: 'bi bi-briefcase' }
    ])

    return (
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <SidBar />
                <div class="col py-3">
                    <Nav />
                    <div className="container-fluid pb-3">
                        <div class="row d-flex flex-wrap justify-content-center align-items-center py-4">
                            {cards.map((card) => (
                                <div class=" col-xl-4 col-sm-6 mb-xl-0">
                                    <div class="card border-0 shadow-sm mb-3" style={{ 'min-height': '120px', 'border-radius': '16px' }}>
                                        <div class="card-body d-flex justify-content-between p-3">
                                            <div className='d-flex flex-column justify-content-between'>
                                                <h4 class="text-sm mb-0 text-uppercase font-weight-bold">{card.name}</h4>
                                                <h3 class="font-weight-bolder">{card.number}</h3>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center fs-2'>
                                                <div className='d-flex justify-content-center align-items-center text-light' style={{ 'height': '60px', 'width': '60px', 'border-radius': '50%', 'background': '#2874A6' }}>
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