import './style.css'
import SidBar from '../components/SidBar';
import Nav from '../components/Nav';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from "../services/user.service";
import { Add } from '../Modals/ModalsFormationEmployee'


export default function FormationEmployee() {

    let [formation_employee, setFormation_employee] = useState([])
    let [employees, setEmployees] = useState([])
    let [formations, setFormations] = useState([])
    useEffect(() => {
        UserService.getFormationEmployee()
            .then((res) => {
                setFormation_employee(res.data.formation_employee)
                setEmployees(res.data.employee)
                setFormations(res.data.formation)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const [add, setAdd] = useState({ employee: '', formation: '' })
    const onChange = (e) => {
        const value = e.target.value
        setAdd({ ...add, [e.target.name]: value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(add)
        // UserService.addOrganisme(add)
        //     .then((res) => {
        //         console.log(res.data.message)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }

    // const onDelete = (id, e) => {
    //     e.preventDefault();
    //     UserService.deleteOrganisme(id)
    //         .then((res) => {
    //             console.log(res.data.message)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <SidBar />
                <div className="col py-3">
                    <Nav />
                    <div className="container-fluid pb-3">
                        <div className="d-flex justify-content-between align-items-center px-3 py-2">
                            <span className="fs-4 fw-bold">Formation Employee</span>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#add_formation_employee" className="fs-3 fw-bold border-0 bg-body">
                                <i className="bi bi-plus-circle-dotted"></i>
                            </button>
                            <Add onSubmit={onSubmit} onChange={onChange} employees={employees} formations={formations} />
                        </div>
                        <table className="table table-sm table-responsive text-center">
                            <thead className="fs-5">
                                <tr>
                                    <th className="col-3">formation</th>
                                    <th className="col-3">employee</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formation_employee.map((f_e, i) => (
                                    <tr className="item" key={i}>
                                        <td className="col-3">{f_e.employee}</td>
                                        <td className="col-3">{f_e.formation}</td>
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