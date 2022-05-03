import { useState } from "react"


const useForm = ( initialState = {} ) =>{

    const [values, setValues] = useState(initialState)

    const handleInputChange = ({ target }) =>{
        const name = target.name;
        const value = target.value;
    
        setValues({
            ...values,
            [name]: value
        })
    }


    const resetForm = ( newFormState = initialState ) =>{
        setValues( newFormState )
    }

    return [ values, handleInputChange, resetForm ]
}

export default useForm