import './Header.scss';
import Logo from '../../assets/image/logo.png';

export default function Header() {
    return (
        <div className ='header'>
            <a href='/' className='link'>
                <img src={Logo} alt="logo" className='logo'/>
                <span className='text'>Notes</span>
            </a>
        </div>
    )
}