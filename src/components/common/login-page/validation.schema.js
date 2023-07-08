import { object, string} from 'yup';
let loginSchema = object({
    email: string('email is required').required('email is required'),
    password: string('password is required').required('password is required'),
});

export default loginSchema