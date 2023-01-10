import './style.css'
import SidBar from '../components/SidBar';
import Nav from '../components/Nav';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from "../services/user.service";
import { Add } from '../Modals/ModalsFormation'

export default function Employee() {

    let [formations, setFormation] = useState([])
    useEffect(() => {
        UserService.getFormation()
            .then((res) => {
                setFormation(res.data.formation)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const [add, setAdd] = useState({ name: '', dateDebut: '', dateFin: '', image: '' })
    const onChange = (e) => {
        const value = e.target.value;
        setAdd({ ...add, [e.target.name]: value })
    }
    const onChangeFile = (e) => {
        const value = e.target.files[0];
        setAdd({ ...add, [e.target.name]: value })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', add.name)
        formData.append('dateDebut', add.dateDebut)
        formData.append('dateFin', add.dateFin)
        formData.append('image', add.image)
        UserService.addFormation(formData)
            .then((res) => {
                console.log(res.data)
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
                            <span className="fs-4 fw-bold">Formation</span>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#add_formation" className="fs-3 fw-bold border-0 bg-body">
                                <i className="bi bi-plus-circle-dotted"></i>
                            </button>
                            <Add onSubmit={onSubmit} onChange={onChange} onChangeFile={onChangeFile} />
                        </div>
                        <table className="table table-sm table-responsive text-center">
                            <thead className="fs-5">
                                <tr>
                                    <th className="col-3">Image</th>
                                    <th className="col-3">Name</th>
                                    <th className="col-3">Date debut</th>
                                    <th className="col-3">Date fin</th>
                                    <th className="col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {formations.map((formation, i) => (
                                    <tr className="item" key={i}>
                                        <td className="col-3"><img className='col-3' src={formation.image} alt={formation.image} /></td>
                                        <td className="col-3">{formation.name}</td>
                                        <td className="col-3">{formation.dateDebut}</td>
                                        <td className="col-3">{formation.dateFin}</td>
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