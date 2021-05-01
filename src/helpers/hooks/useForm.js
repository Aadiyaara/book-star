import { useState } from 'react'

export const useForm = initialValues => {
    const [values, setValues] = useState(initialValues)

    return [values, (a, v) => {
        if(a && v && v.target) {
            setValues({
                ...values, 
                [a]: v.target.value
            })
        }
    }]
}