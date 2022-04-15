import jwtDecode from "jwt-decode";

export function authHeader(userToken) {
	return {
		headers: {
			Authorization: `Bearer ${userToken}`,
		},
	};
}

export function calculateDelayFromJwt(jwtToken) {
	try {
		const expires_in = jwtDecode(jwtToken)?.exp;
		// before 3 seconds of expiration
		const time = (expires_in - 10) * 1000 - Date.now();
		return isNaN(time) ? null : time;
	} catch (error) {
		return null;
	}
}

export const Role = {
	PATIENT: "patient",
	DOCTOR: "doctor",
};
