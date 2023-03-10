import './style.css'
import SidBar from '../../childComponents/SidBar';
import Nav from '../../childComponents/Nav';
import { useEffect, useState } from 'react';
import UserService from "../../services/user.service";
import Generator from '../../Generator/Generator';
import { Add, Edite } from '../../Modals/ModalsOrganisme';


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
                if (!res.data.message) Generator("error", res.data)
                else Generator("success", res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const [edite, setEdite] = useState({ name: '' })
    const onChangeEdite = (e) => {
        const value = e.target.value;
        setEdite({ ...edite, [e.target.name]: value })
    }
    const onSubmitEdite = (e) => {
        e.preventDefault();
        UserService.updateOrganisme(edite)
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
        UserService.deleteOrganisme(id)
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
                            <span className="fs-4 fw-bold">Organisme</span>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#add_organisme" className="fs-3 fw-bold border-0 bg-body">
                                <i className="bi bi-plus-circle-dotted"></i>
                            </button>
                            <Add onSubmit={onSubmit} onChange={onChange} value={add.name} />
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
                                                <i className="bi bi-pen" onClick={() => { setEdite(organisme) }} type="button" data-bs-toggle="modal" data-bs-target="#edite_organisme"></i>
                                                <div type='button' onClick={(e) => onDelete(organisme._id, e)}>
                                                    {(organisme.status)
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
                        <Edite onSubmit={onSubmitEdite} onChange={onChangeEdite} value={edite.name} />
                    </div>
                </div>
            </div>
        </div>
    );
}