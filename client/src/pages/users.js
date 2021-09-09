import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import axios from 'axios';

function Users() {
	const [isLoading, setLoading] = useState(true);
	const fetchUsers = async () => {
		axios
			.get('/api/users?skip=0&limit=10')
			.then(function (response) {
				// handle success
				console.log('handle success', response);
			})
			.catch(function (error) {
				// handle error
				console.log('handle error', { error });
				toast.error(error.message);
			})
			.finally(function () {
				// always executed
				setLoading(false);
			});
	};
	useEffect(() => {
		fetchUsers();
	}, []);
	if (isLoading) return <CircularProgress />;
	return (
		<div>
			<h3>Users page</h3>
		</div>
	);
}

export default Users;
