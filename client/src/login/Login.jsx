import './style.css'
import Input from '../components/Input'
import Label from '../components/Label'
import Button from '../components/Button'

export default function Login() {
    return (
        <div className="d-flex justify-content-center align-items-center" id='login'>
            <form className="fw-bold col-lg-4 col-md-6 col-sm-10 col-11 d-flex flex-column justify-content-center align-items-center gap-2 py-5">
                <h3 className='fw-bold'>Login</h3>
                <div className="text-muted h6">Enter email and password to login</div>
                <div className="form-floating text-muted col-10">
                    <Input type="text" name='email' id="floatingInput" placeholder="Email" />
                    <Label htmlFor="floatingInput" label="Email address" />
                </div>
                <div className="form-floating text-muted col-10 mt-2">
                    <Input type="password" name='password' id="floatingPassword" placeholder="Password" />
                    <Label htmlFor="floatingPassword" label="Password" />
                </div>
                <div className="w-50 form-group d-flex justify-content-center position-relative">
                    <Button button='Login' />
                </div>
            </form>
        </div>
    );
}