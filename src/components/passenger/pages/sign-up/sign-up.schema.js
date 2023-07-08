import { object, string,ref} from 'yup';
let signUpSchema = object({
    first_name: string('first name is required').required('first name is required'),
    last_name: string('last name is required').required('last name is required'),
    email: string('email is required').required('email is required'),
    password: string('password is required').required('password is required'),
    confirm_password: string()
        .oneOf([ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    mobile_number: string('mobile number is required').required('mobile number is required'),
});

export default signUpSchema