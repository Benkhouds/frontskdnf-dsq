import { useEffect, useState, useCallback } from 'react';
import { faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../components/Layout';
import { DataService } from '../services/DataService';
import { useAuth } from '../store/AuthProvider';
import { Role } from '../utils/helpers';
import Preloader from '../components/Preloader/Preloader';

const AppointmentStatus = {
	PENDING: 0,
	APPROVED: 1,
	REJECTED: 2,
};

export default function Dashboard() {
	const [appointments, setAppointments] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [appointmentsLoading, setAppointmentsLoading] = useState(true);
	const { user, accessToken } = useAuth();
	const fetchAppointments = useCallback(async () => {
		console.log(user);
		const data = await DataService.getAppointments(user?.role, accessToken);
		setAppointments(data);
	}, [accessToken, user]);

	useEffect(() => {
		try {
			fetchAppointments();
		} catch (error) {
			console.log(error);
		} finally {
			setAppointmentsLoading(false);
		}
	}, [fetchAppointments]);

	const approveAppointment = async (id) => {
		try {
			if (accessToken) {
				await DataService.approveAppointment(id, accessToken);
				const updatedData = appointments.map((appointment) => {
					if (appointment._id === id) {
						appointment.status = AppointmentStatus.APPROVED;
					}
					return appointment;
				});
				setAppointments(updatedData);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const rejectAppointment = async (id) => {
		try {
			if (accessToken) {
				await DataService.rejectAppointment(id, accessToken);
				const updatedData = appointments.map((appointment) => {
					if (appointment._id === id) {
						appointment.status = AppointmentStatus.REJECTED;
					}
					return appointment;
				});
				setAppointments(updatedData);
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (isLoading) {
		return <Preloader />;
	}
	return (
		<Layout setIsLoading={setIsLoading}>
			<div style={{ width: '100%', height: '70vh', marginTop: '8rem' }}>
				<table className='table table-borderless'>
					<thead>
						<tr className='text-center'>
							<th className='text-secondary text-left' scope='col'>
								Name
							</th>
							<th className='text-secondary' scope='col'>
								Date
							</th>

							<th className='text-secondary' scope='col'>
								Status
							</th>
							{user?.role === Role.DOCTOR && (
								<th className='text-secondary' scope='col'>
									Action
								</th>
							)}
						</tr>
					</thead>
					<tbody>
						{appointmentsLoading && <div>Loading Appointments ...</div>}
						{appointments &&
							appointments.length > 0 &&
							appointments.map((ap) => (
								<tr>
									<td>{`${
										ap[user.role === Role.PATIENT ? 'target' : 'requester']
											.firstName
									} ${
										ap[user.role === Role.PATIENT ? 'target' : 'requester']
											.lastName
									}`}</td>
									<td>{new Date(ap.date)?.toLocaleDateString()}</td>

									<td className='text-center'>
										<p
											/* onClick={() => setSelectAppointment(ap)} */
											/* onChange={(e) => handleStatusChange(e.target.value)} */
											className={
												ap.status === AppointmentStatus.REJECTED
													? 'btn btn-danger'
													: ap.status === AppointmentStatus.APPROVED
													? 'btn btn-success'
													: 'btn btn-info'
											}
										>
											<span>
												{
													Object.getOwnPropertyNames(AppointmentStatus)[
														ap.status
													]
												}
											</span>
										</p>

										{user?.role === Role.DOCTOR && (
											<>
												<button
													onClick={() => approveAppointment(ap._id)}
													className='btn ml-1 btn-success text-white'
												>
													<FontAwesomeIcon icon={faPencilAlt} />
													Approve
												</button>
												<button
													onClick={() => rejectAppointment(ap._id)}
													className='btn ml-1 btn-danger text-white'
												>
													<FontAwesomeIcon icon={faPencilAlt} />
													reject
												</button>
											</>
										)}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</Layout>
	);
}
