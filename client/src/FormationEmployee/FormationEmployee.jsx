import './style.css'
import SidBar from '../components/SidBar';
import Nav from '../components/Nav';
import { useEffect, useState } from 'react';
import UserService from "../services/user.service";
import Generator from '../Generator/Generator';
import { Add } from '../Modals/ModalsFormationEmployee';


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
        UserService.FormationToEmployee(add)
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
                            <span className="fs-4 fw-bold">Formation Employee</span>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#add_formation_employee" className="fs-3 fw-bold border-0 bg-body">
                                <i className="bi bi-plus-circle-dotted"></i>
                            </button>
                            <Add onSubmit={onSubmit} onChange={onChange} employees={employees} formations={formations} />
                        </div>
                        <table className="table table-sm table-responsive text-center">
                            <thead className="fs-5">
                                <tr>
                                    <th className="col-5">formation</th>
                                    <th className="col-5">employee</th>
                                    <th className="col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {formation_employee.map((f_e, i) => (
                                    <tr className="item" key={i}>
                                        <td className="col-5">{f_e.employee[0].username}</td>
                                        <td className="col-5">{f_e.formation[0].name}</td>
                                        <td className="col-2">
                                            <i className="bi bi-trash3"></i>
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