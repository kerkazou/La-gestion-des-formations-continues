import './style.css'
import Input from '../components/Input'
import Label from '../components/Label'
import Button from '../components/Button'
import { useState } from 'react'

export default function Login() {

    const [inputs, setInputs] = useState([
        { type: 'text', id: 'floatingInput', name: 'email', placeholder: 'Email', label: 'Email address' },
        { type: 'password', id: 'floatingPassword', name: 'password', placeholder: '••••••••', label: '••••••••' }
    ])

    const [login, setLogin] = useState({ email: '', password: '' })
    const onChange = (e) => {
        const value = e.target.value
        setLogin({ ...login, [e.target.name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(login)
    }

    return (
        <div className="d-flex justify-content-center align-items-center" id='login'>
            <form onSubmit={onSubmit} className="fw-bold col-lg-4 col-md-6 col-sm-10 col-11 d-flex flex-column justify-content-center align-items-center gap-2 py-5">
                <h3 className='fw-bold'>Login</h3>
                <div className="text-muted h6">Enter your email and password to login</div>
                {inputs.map((input, i) => (
                    <div className="form-floating text-muted col-10" key={i}>
                        <Input type={input.type} onChange={onChange} name={input.name} id={input.id} placeholder={input.placeholder} />
                        <Label htmlFor={input.id} label={input.label} />
                    </div>
                ))}
                <div className="w-50 form-group d-flex justify-content-center position-relative">
                    <Button button='Login' />
                </div>
            </form>
        </div>
    );
}