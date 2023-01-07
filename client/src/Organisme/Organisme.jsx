import './style.css'
import SidBar from '../components/SidBar';
import Nav from '../components/Nav';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Employee() {

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
                            <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="fs-3 fw-bold border-0 bg-body"><i class="bi bi-person-plus-fill"></i></button>
                        </div>
                        <table className="table table-sm table-responsive text-center">
                            <thead className="fs-5">
                                <tr>
                                    <th className="col-3">Username</th>
                                    <th className="col-3">Email</th>
                                    <th className="col-2">Organisme</th>
                                    <th className="col-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="item">
                                    <td className="col-3">Username</td>
                                    <td className="col-3">Email</td>
                                    <td className="col-2">organisme</td>
                                    <td className="col-2"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}