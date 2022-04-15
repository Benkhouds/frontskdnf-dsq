import { useState } from 'react';
import Header from '../components/Header/Header';
import Blogs from '../components/Blogs/Blogs';
import Infos from '../components/Infos/Infos';
import Services from '../components/Services/Services';
import AppointmentBanner from '../components/AppointmentBanner/AppointmentBanner';
import Features from '../components/Features/Features';
import FeaturedService from '../components/FeaturedService/FeaturedService';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Banner from '../components/Banner/Banner';
import Preloader from '../components/Preloader/Preloader';
import { useAuth } from '../store/AuthProvider';

const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	if (isLoading) {
		return <Preloader />;
	}
	return (
		<div>
			<Header setIsLoading={setIsLoading} />
			<Banner />
			<Infos />
			<Services />
			<AppointmentBanner />
			<Features />
			<FeaturedService />
			<Blogs />
			<Contact />
			<Footer />
		</div>
	);
};

export default Home;
