import { useState } from 'react';
import React from 'react';
import Preloader from '../components/Preloader/Preloader';
import DoctorList from '../components/DoctorList/DoctorList';
import Layout from '../components/Layout';
const MakeAppointment = () => {
	const [isLoading, setIsLoading] = useState(false);
	if (isLoading) {
		return <Preloader />;
	}
	return (
		<Layout setIsLoading={setIsLoading} banner={true}>
			<DoctorList />
		</Layout>
	);
};

export default MakeAppointment;
