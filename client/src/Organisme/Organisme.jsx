import './style.css'
import SidBar from '../components/SidBar';
import Nav from '../components/Nav';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from "../services/user.service";

import ModalsOrganisme from '../Modals/ModalsOrganisme'

export default function Organisme() {

    let [organismes, setOrganismes] = useState([])
    useEffect(() => {
        UserService.getOrganisme()
            .then((res) => {
                setOrganismes(res.data.organisme)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const [add, setAdd] = useState({ name: '' })
    const onChange = (e) => {
        const value = e.target.value
        setAdd({ ...add, [e.target.name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        UserService.addOrganisme(add)
            .then((res) => {
                console.log(res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (!useSelector((state) => state.auth.isLoggedIn)) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <SidBar />
                <div className="col py-3">
                    <Nav />
                    <div className="container-fluid pb-3">
                        <div className="d-flex justify-content-between align-items-center px-3 py-2">
                            <span className="fs-4 fw-bold">Organisme</span>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#add_organisme" className="fs-3 fw-bold border-0 bg-body">
                                <i className="bi bi-plus-circle-dotted"></i>
                            </button>
                            <ModalsOrganisme onSubmit={onSubmit} onChange={onChange} value={add.name} />
                        </div>
                        <table className="table table-sm table-responsive text-center">
                            <thead className="fs-5">
                                <tr>
                                    <th className="col-3">Numero</th>
                                    <th className="col-3">Name</th>
                                    <th className="col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {organismes.map((organisme, i) => (
                                    <tr className="item" key={i}>
                                        <td className="col-3">{organisme._id}</td>
                                        <td className="col-3">{organisme.name}</td>
                                        <td className="col-2">
                                            <div className='d-flex gap-3'>
                                                <i className="bi bi-pen"></i>
                                                <i className="bi bi-trash3"></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}