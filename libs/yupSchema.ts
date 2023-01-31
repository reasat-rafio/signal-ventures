import * as yup from 'yup'

export const ContactSchema = yup.object().shape({
    email: yup.string().email('Please enter a correct email').required(),
    name: yup.string().max(40).required(),
    subject: yup.string().max(200).required(),
    message: yup.string().required(),
})
