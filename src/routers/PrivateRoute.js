import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Preloader from '../components/Preloader/Preloader';
import { useAuth } from '../store/AuthProvider';

function PrivateRoute({
	redirectURI,
	forGuests = false,
	userRole = null,
	children,
}) {
	const location = useLocation();
	const { isAuthenticated, isTokenRefreshing, user } = useAuth();
	let hasPermission = forGuests ? !isAuthenticated : isAuthenticated;
	if (userRole) {
		hasPermission = hasPermission && userRole === user.role;
	}
	if (isTokenRefreshing) {
		return <Preloader />;
	}
	return (
		<div>
			{hasPermission ? (
				children
			) : (
				<Navigate to={redirectURI} state={{ from: location }} replace />
			)}
		</div>
	);
}

export default PrivateRoute;
