import {useState} from "react";

const useFormController = (defaultValues) => {
    const [form, setForm] = useState(defaultValues ? {...defaultValues} : {})

    const valueChangeHandler = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }
    const setValue = (event) => {
        let {name, value} = event.target
        setForm({...form, [name]: value})
    }
    return [valueChangeHandler, setValue, form, setForm]
}

export default useFormController