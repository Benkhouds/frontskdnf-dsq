import axios from '../config/http-client';
import { authHeader } from '../utils/helpers';

export class DataService {
	static async getUser(accessToken) {
		const { data } = await axios.get('/me', authHeader(accessToken));
		return data?.data;
	}

	static async getDoctorsList(accessToken) {
		const { data } = await axios.get('/doctors', authHeader(accessToken));
		return data?.data;
	}

	static async getAppointments(role, accessToken) {
		const { data } = await axios.get(
			`/${role}/appointments`,
			authHeader(accessToken)
		);
		console.log(data);
		return data?.data;
	}

	static async requestAppointment(request, accessToken) {
		const { data } = await axios.post(
			'/patient/appointments',
			request,
			authHeader(accessToken)
		);
		return data?.success;
	}

	static async approveAppointment(id, accessToken) {
		const { data } = await axios.post(
			`/doctor/appointments/${id}/approve`,
			{},
			authHeader(accessToken)
		);
		return data?.success;
	}
	static async rejectAppointment(id, accessToken) {
		const { data } = await axios.post(
			`/doctor/appointments/${id}/reject`,
			{},
			authHeader(accessToken)
		);
		return data?.success;
	}
}
