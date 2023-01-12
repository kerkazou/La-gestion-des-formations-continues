import toastr from 'toastr';
import 'toastr/build/toastr.css';

const Generator = (type, message) => {
    if (type === "error") {
        toastr.warning(message, { positionClass: "toast-bottom-left" })
    }
    if (type === "success") {
        toastr.success(message, { positionClass: "toast-bottom-left" })
        setTimeout(() => { window.location.reload(false) }, "800")
    }
};

export default Generator;