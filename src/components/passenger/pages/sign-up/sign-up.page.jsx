import {Box, Button, Container, Flex, FormControl, FormLabel, Input, useToast} from '@chakra-ui/react'
import React, {useState} from "react";
import Card from "../../../common/card/card.component";
import {useDispatch, useSelector} from "react-redux";
import useFormController from "../../../../hooks/useFormController";
import {createDoc, emailAndPasswordAuth, login, signOut} from "../../../../actions/user.actions";
import {useNavigate} from "react-router-dom";
import loginSchema from "../../../common/login-page/validation.schema";
import signUpSchema from "./sign-up.schema";

const SignUp = (getNames) => {
    const [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate();
    let dispatch = useDispatch()
    let {email, displayName, uid} = useSelector((store) => (store.firebase.auth))
    let [valueChangeHandler, setValue, form, setForm] = useFormController({
        email: email, ...getNames(),
        reference_doc_id: uid ? uid : '',
    })
    const toast = useToast()

    function getNames() {
        const [first_name, last_name] = displayName ? displayName?.split(" ") : ['', ''];
        return {first_name: first_name ? first_name : '', last_name: last_name ? last_name : ''}
    }

    const updateHandler = async () => {
        setIsLoading(true)
        let res = await dispatch(createDoc('userProfile', toast, navigate("/user"), form))
        setIsLoading(false)
    }

    const signUpHandler = () => {
        signUpSchema.validate(form, {abortEarly: false}).then(async () => {
            let res = await emailAndPasswordAuth(form.email, form.password, toast)
            let result = res ? await createDoc('userProfile', toast, navigate("/user"), {
                id: res, ...form,
                type: 'passenger'
            }) : null

        }).catch((errors) => {
            for (let error of errors.inner) {
                toast({
                    title: 'Error',
                    description: error?.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })

            }
        })
    }

    const signedButtonMarkup = (
        <Flex justifyContent={'right'} mt={3} columnGap={'20px'} direction={'row'}>
            <Button onClick={() => {
                navigate("/user")
            }} width={'100px'} colorScheme="teal" size="sm">
                Skip
            </Button>
            <Button isLoading={isLoading} onClick={updateHandler} width={'100px'} colorScheme="teal" size="sm">
                Update
            </Button>
        </Flex>
    )
    const notSignedButtonMarkup = (
        <Flex justifyContent={'right'} mt={3} columnGap={'20px'} direction={'row'}>
            <Button isLoading={isLoading} onClick={signUpHandler} width={'100px'} colorScheme="teal" size="sm">
                SignUp
            </Button>
        </Flex>
    )

    return (

        <section className="bg-gray-200 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input value={form?.first_name} onChange={valueChangeHandler} name='first_name'  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required=""/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input onChange={valueChangeHandler} value={form.last_name} name='last_name'   className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required=""/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                                <input onChange={valueChangeHandler} name='mobile_number' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required=""/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input onChange={valueChangeHandler} value={form.email} name='email'  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required=""/>
                            </div>
                            <div>
                                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" onChange={valueChangeHandler} name='password'  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" onChange={valueChangeHandler} name='confirm_password'  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            </div>
                            <button onClick={signUpHandler} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                    </div>
                </div>
            </div>
        </section>
        // <Container display={'flex'} justifyContent={"center"} height={'100vh'} centerContent padding={5} maxW='70%'
        //            backgroundColor={'#c8d8e5'}>
        //     <Card inSideTitle={'Personal Informations'}>
        //         <Flex gap={3} direction={'row'}>
        //             <Box width={'100%'}>
        //                 <FormControl>
        //                     <FormLabel>First Name</FormLabel>
        //                     <Input value={form.first_name} onChange={valueChangeHandler} name='first_name' type='text'/>
        //                 </FormControl>
        //                 <FormControl>
        //                     <FormLabel>Last Name</FormLabel>
        //                     <Input onChange={valueChangeHandler} value={form.last_name} name='last_name' type='text'/>
        //                 </FormControl>
        //                 <FormControl>
        //                     <FormLabel>Email</FormLabel>
        //                     <Input onChange={valueChangeHandler} value={form.email} name='email' type='email'/>
        //                 </FormControl>
        //                 <FormControl>
        //                     <FormLabel>Password</FormLabel>
        //                     <Input onChange={valueChangeHandler} name='password' type='password'/>
        //                 </FormControl>
        //                 <FormControl>
        //                     <FormLabel>Confirm password</FormLabel>
        //                     <Input onChange={valueChangeHandler} name='confirm_password' type='password'/>
        //                 </FormControl>
        //             </Box>
        //             <Box width={'100%'}>
        //                 <FormControl>
        //                     <FormLabel>State</FormLabel>
        //                     <Input onChange={valueChangeHandler} name='state' type='text'/>
        //                 </FormControl>
        //                 <FormControl>
        //                     <FormLabel>City</FormLabel>
        //                     <Input onChange={valueChangeHandler} name='city' type='text'/>
        //                 </FormControl>
        //                 <FormControl>
        //                     <FormLabel>Address</FormLabel>
        //                     <Input onChange={valueChangeHandler} name='address' type='text'/>
        //                 </FormControl>
        //                 <FormControl>
        //                     <FormLabel>Tel: NO</FormLabel>
        //                     <Input onChange={valueChangeHandler} name='mobile_number' type='email'/>
        //                 </FormControl>
        //             </Box>
        //         </Flex>
        //         {uid ? signedButtonMarkup : notSignedButtonMarkup}
        //     </Card>
        // </Container>
    )
}

export default SignUp