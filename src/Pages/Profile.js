import { useEffect, useRef, useCallback, useState } from "react";
import Preloader from "../components/Preloader/Preloader";
import { DataService } from "../services/DataService";
import { useAuth } from "../store/AuthProvider";

function Profile() {
	const { accessToken } = useAuth();
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const isMounted = useRef(false);

	const fetchUserData = useCallback(async () => {
		try {
			setIsLoading(true);
			const user = await DataService.getUser(accessToken);
			setUser(user);
		} catch (error) {
			console.log(error?.response?.data?.error);
		} finally {
			setIsLoading(false);
		}
	}, [accessToken, setUser]);

	useEffect(() => {
		if (!isMounted.current) {
			fetchUserData();
			isMounted.current = false;
		}
	}, [fetchUserData]);

	if (isLoading) {
		return <Preloader />;
	}
	return (
		<div>
			<h1>Welcome {user && `${user.firstName} ${user.lastName}`}</h1>
		</div>
	);
}

export default Profile;
