import React from "react";
import services from "../../MockData/services";
import Service from "./Service";

const Services = () => {
	return (
		<section className='services mb-5 pt-0'>
			<div className='container'>
				<div className='section-header text-center'>
					<h5 className='text-uppercase text-primary'>Our services</h5>
					<h1 className='style-color'>Service We Provide</h1>
				</div>
				<div className='row mt-5 pt-3'>
					{services.map((service, i) => (
						<Service key={i} service={service} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
