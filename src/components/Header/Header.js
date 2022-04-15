import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import logo from '../../images/logo.png';
import { useAuth } from '../../store/AuthProvider';
const Header = ({ setIsLoading }) => {
	const [isCollapsed, setCollapsed] = useState(null);
	const { isAuthenticated, logout, isTokenRefreshing } = useAuth();

	const handleLogout = async () => {
		try {
			setIsLoading(true);
			await logout();
			setIsLoading(false);
		} catch (error) {
			console.log(error?.response?.data?.error);
		}
	};

	return (
		<nav
			style={{ backgroundColor: 'rgb(36, 41, 73)' }}
			className='slide in show shadow-sm navbar navbar-expand-sm bg-rgb(36, 41, 73) navbar-dark py-3  fixed-top'
		>
			<div className='container'>
				<Link className='navbar-brand' to='/' style={{ color: '#15D1C8' }}>
					<img src={logo} alt='logo' />
					<span className='logo-name'> Doctoory </span>
				</Link>
				<button
					onClick={() => setCollapsed(!isCollapsed ? 'show' : null)}
					className='navbar-toggler d-lg-none'
					type='button'
					data-toggle='collapse'
					data-target='#collapsibleNavId'
					aria-controls='collapsibleNavId'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon' />
				</button>
				<div
					className={`collapse navbar-collapse ${isCollapsed}`}
					style={{ justifyContent: 'space-between' }}
					id='collapsibleNavId'
				>
					<ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
						<li className='nav-item active'>
							<Link className='nav-link' to='/'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/appointment'>
								Make Appointment
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/dashboard'>
								Dashboard
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/reviews'>
								Reviews
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/contact'>
								Contact Us
							</Link>
						</li>
					</ul>
					{!isTokenRefreshing &&
						(isAuthenticated ? (
							<div className='nav-item'>
								<button onClick={handleLogout}>Logout</button>
							</div>
						) : (
							<div className='d-flex flex-end'>
								<Link className='nav-link d-block' to='/login'>
									Login
								</Link>

								<Link className='nav-link d-block' to='/register'>
									Register
								</Link>
							</div>
						))}
				</div>
			</div>
		</nav>
	);
};

export default Header;
