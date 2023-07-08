import { object, string} from 'yup';
let loginSchema = object({
    username: string('Email is required').required('Email is required'),
    password: string('password is required').required('password is required'),
});

export default loginSchema