import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { DataService } from '../../services/DataService';
import { useAuth } from '../../store/AuthProvider';
import DoctorCard from '../DoctorCard/DoctorCard';

Modal.setAppElement('#root');

const DoctorList = () => {
	const [selectedDoctor, setSelectedDoctor] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [doctorData, setDoctorData] = useState(null);
	const { accessToken } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			await DataService.requestAppointment(
				{ ...data, date: new Date(data.date), doctorId: selectedDoctor._id },
				accessToken
			);
			setIsModalOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	const getDoctors = useCallback(async () => {
		try {
			const doctors = await DataService.getDoctorsList(accessToken);
			console.log(doctors);
			setDoctorData(doctors);
		} catch (error) {
			console.log(error);
		}
	}, [accessToken]);

	useEffect(() => {
		getDoctors();
	}, [getDoctors]);

	const modalController = (doctorId) => {
		setIsModalOpen(true);
		if (doctorData) {
			const selectedData = doctorData.find((doctor) => doctor._id === doctorId);
			if (selectedData) {
				setSelectedDoctor(selectedData);
			}
		}
	};

	return (
		<div className='appointments container py-5 mt-5'>
			<h3 className='text-primary text-center my-5'>
				Available Appointments on{' '}
			</h3>
			<div className='row'>
				{doctorData &&
					doctorData.length > 0 &&
					doctorData.map((doctor) => {
						return (
							<DoctorCard
								key={doctor._id}
								id={doctor._id}
								doctor={doctor.details}
								modalController={modalController}
							/>
						);
					})}
			</div>

			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				id='modal-responsive'
				style={{
					overlay: {
						zIndex: 1050,
						backgroundColor: 'rgba(130,125,125,0.75)',
					},
					content: {
						top: '50%',
						left: '50%',
						width: '45%',
						height: 'fit-content',
						transform: 'translate(-50%, -50%)',
					},
				}}
			>
				{selectedDoctor && (
					<div className='px-4'>
						<h4 className='text-primary text-center'>
							{selectedDoctor.category}
						</h4>
						<h5 className='text-center style-color'>{selectedDoctor.name}</h5>
						<p className='text-center text-secondary  small mb-4'>
							On {new Date().toLocaleDateString()}
							<br /> Available Time: 9:00 AM - 11:00 AM
						</p>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='form-group my-4'>
								<input
									type='text'
									{...register('name', { required: true })}
									name='name'
									placeholder='Your Name'
									className='form-control'
								/>
								{errors.name && (
									<span className='text-danger'>Name is required</span>
								)}
							</div>
							<div className='form-group my-4'>
								<input
									type='text'
									{...register('email', { required: true })}
									name='email'
									placeholder='Email'
									className='form-control'
								/>
								{errors.email && (
									<span className='text-danger'>Email is required</span>
								)}
							</div>
							<div className='form-group my-4'>
								<input
									type='date'
									{...register('date', { required: true })}
									name='date'
									className='form-control'
								/>
								{errors.date && (
									<span className='text-danger'>Date is required</span>
								)}
							</div>

							<div className='form-group my-4 row'>
								<div className='col-4'>
									<select
										className='form-control'
										name='gender'
										{...register('gender')}
									>
										<option disabled={true} value='Not set'>
											Select Gender
										</option>
										<option value='Male'>Male</option>
										<option value='Female'>Female</option>
										<option value='Not set'>Other</option>
									</select>
								</div>
								<div className='col-4'>
									<input
										{...register('age')}
										className='form-control'
										name='age'
										placeholder='Your Age'
										type='number'
									/>
								</div>
								<div className='col-4'>
									<input
										{...register('weight')}
										className='form-control'
										name='weight'
										placeholder='Weight'
										type='number'
									/>
								</div>
							</div>
							<div className='form-group my-4'>
								<textarea
									{...register('problem')}
									className='form-control'
									name='problem'
									placeholder='Describe Your Problem... (Ex: headache)'
									type='text'
								/>
							</div>

							<div className='form-group my-4 text-right'>
								<button type='submit' className='btn btn-primary'>
									Send
								</button>
							</div>
						</form>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default DoctorList;
