import {RegisterForm} from "../RegisterForm/registerForm";
import {SignInForm} from "../SignInForm/signInForm";
const Modal = ({closeModal}) => {
    return (
        <div class="modal">
            <div className ='modal_body'>
                <RegisterForm/>
                <SignInForm/>
                <button className='closeModalButton' onClick={() => closeModal()}>X</button>
            </div>

        </div>
    )
}

export default Modal