import './style.css'
import SidBar from '../childComponents/SidBar';
import Nav from '../childComponents/Nav';
import { useState, useEffect } from 'react';
import UserService from "../services/user.service";
import Generator from '../Generator/Generator';
import { Add, Edite } from '../Modals/ModalsFormation';

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
                if (!res.data.message) Generator("error", res.data)
                else Generator("success", res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const [edite, setEdite] = useState({ name: '', dateDebut: '', dateFin: '', image: '' })
    const onChangeEdite = (e) => {
        const value = e.target.value;
        setEdite({ ...edite, [e.target.name]: value })
    }
    const onChangeEditeFile = (e) => {
        const value = e.target.files[0];
        setEdite({ ...edite, [e.target.name]: value })
    }
    const onSubmitEdite = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', edite.name)
        formData.append('dateDebut', edite.dateDebut)
        formData.append('dateFin', edite.dateFin)
        formData.append('image', edite.image)
        UserService.updateformation(edite._id, formData)
            .then((res) => {
                if (!res.data.message) Generator("error", res.data)
                else Generator("success", res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onDelete = (id, e) => {
        e.preventDefault();
        UserService.deleteFormation(id)
            .then((res) => {
                if (!res.data.message) Generator("error", res.data)
                else Generator("success", res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
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
                                                <i className="bi bi-pen" type="button" onClick={() => { setEdite(formation) }} data-bs-toggle="modal" data-bs-target="#edite_formation"></i>
                                                <div type='button' onClick={(e) => onDelete(formation._id, e)}>
                                                    {(formation.status)
                                                        ? <i className="bi bi-trash3"></i>
                                                        : <i className="bi bi-arrow-clockwise"></i>
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Edite onSubmit={onSubmitEdite} onChange={onChangeEdite} onChangeFile={onChangeEditeFile} value={edite} />
                    </div>
                </div>
            </div>
        </div>
    );
}