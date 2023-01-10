import './style.css'
import SidBar from '../components/SidBar';
import Nav from '../components/Nav';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from "../services/user.service";
import { Add } from '../Modals/ModalsEmployee'

export default function Employee() {

    let [employees, setEmployees] = useState([])
    let [organismes, setOrganismes] = useState([])
    useEffect(() => {
        UserService.getEmployee()
            .then((res) => {
                setEmployees(res.data.employee)
                setOrganismes(res.data.organisme)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const [add, setAdd] = useState({ username: '', email: '', organisme: '' })
    const onChange = (e) => {
        const value = e.target.value;
        setAdd({ ...add, [e.target.name]: value })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        UserService.addEmployee(add)
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
                            <span className="fs-4 fw-bold">Employee</span>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#add_employee" className="fs-3 fw-bold border-0 bg-body">
                                <i className="bi bi-plus-circle-dotted"></i>
                            </button>
                            <Add onSubmit={onSubmit} onChange={onChange} organismes={organismes} value={add} />
                        </div>
                        <table className="table table-sm table-responsive text-center">
                            <thead className="fs-5">
                                <tr>
                                    <th className="col-3">Username</th>
                                    <th className="col-3">Email</th>
                                    <th className="col-2">Organisme</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee, i) => (
                                    <tr className="item" key={i}>
                                        <td className="col-3">{employee.username}</td>
                                        <td className="col-3">{employee.email}</td>
                                        <td className="col-2">{(employee.organisme.length) ? employee.organisme[0].name : '---'}</td>
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