import { Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Login from './Pages/Authentication/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Authentication/Register';
import PrivateRoute from './routers/PrivateRoute';
import Reviews from './Pages/Reviews';
import Contacts from './Pages/Contacts';
import MakeAppointment from './Pages/MakeAppointment';
import './App.css';
import Dashboard from './Pages/Dashboard';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/login'
					element={
						<PrivateRoute redirectURI='/' forGuests={true}>
							<Login />
						</PrivateRoute>
					}
				/>
				<Route
					path='/register'
					element={
						<PrivateRoute redirectURI='/' forGuests={true}>
							<Register />
						</PrivateRoute>
					}
				/>

				<Route
					path='/profile'
					element={
						<PrivateRoute redirectURI='/'>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route path='/appointment' element={<MakeAppointment />} />
				<Route
					path='/dashboard'
					element={
						<PrivateRoute redirectURI='/'>
							<Dashboard />
						</PrivateRoute>
					}
				/>

				<Route path='/reviews' element={<Reviews />} />
				<Route path='/contact' element={<Contacts />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
