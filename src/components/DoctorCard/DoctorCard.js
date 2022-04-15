import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DoctorCard = ({ id, doctor, modalController }) => {
	const { img, category, label, designation, department, hospital } = doctor;

	return (
		<div className='col-md-4 mb-5'>
			<div className='single-doctor'>
				<img className='img-fluid doctor-image' src={img} alt='doctor' />
				<div className='doctor-description'>
					<p className='doctor-category'>{category}</p>
					<h4 className='doctor-name '>{label}</h4>

					<h6 className='mt-4'>{designation}</h6>
					<h6 className='department'>{department}</h6>
					<h6 className='hospital'>{hospital}</h6>
					<div className='text-center'>
						<button
							className='btn btn-primary button-style mt-3'
							onClick={() => modalController(id)}
						>
							<FontAwesomeIcon icon={faCalendarCheck} className='mr-3' /> Book
							Appointment
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorCard;
