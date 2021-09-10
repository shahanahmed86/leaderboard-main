import { toast } from 'react-toastify';

export function catchError(error) {
	toast.error(error ? error.response.data : 'Something went wrong');
}
