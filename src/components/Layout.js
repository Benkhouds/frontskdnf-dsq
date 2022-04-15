import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import React from 'react';
import Banner from '../components/Banner/Banner';
export default function Layout({
	setIsLoading = null,
	banner = false,
	children,
}) {
	return (
		<div className={banner && 'heder-content'}>
			<Header setIsLoading={setIsLoading} />

			{banner && <Banner />}

			{children}
			<Footer />
		</div>
	);
}
