import React from 'react';
import { Role } from '../utils/helpers';
import PrivateRoute from './PrivateRoute';

function RequirePermission({ role = Role.PATIENT }) {
	return <PrivateRoute redirectURI='/' userRole={role} />;
}

export default RequirePermission;
