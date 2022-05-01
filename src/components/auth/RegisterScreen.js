import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import useForm from "../../hooks/useForm"
import { isEmail } from 'validator'

import { removeError, setError } from "../../actions/ui"
import { startRegisterWithEmailPasswordName } from "../../actions/auth"

const RegisterScreen = () => {

    const dispatch = useDispatch()
    const { loading, msgError } = useSelector( state => state.ui )


    const [{ name, email, password, password2 }, handleInputChange ] = useForm({
        name: 'Brandon',
        email: 'brandon@gmail.com',
        password: '123456',
        password2: '123456'
    })

    useEffect(()=>{
        return( ()=>{
            dispatch( removeError() )
        })
    },[])



    const handleRegister = ( e ) => {
        e.preventDefault()


        if( isFormValid() ){
            dispatch( startRegisterWithEmailPasswordName( email, password, name) )
        }

    }

    const isFormValid = () => {
        
        if( [name.trim(), email.trim(), password.trim(), password2.trim()].includes('')  ){

            dispatch( setError('Todos los campos son obligatorios') )
            return false
        }

        if( !isEmail( email ) ){

            dispatch( setError('El correo ingresado no es valido') )
            return false
        }

        if( password !== password2 ){

            dispatch( setError('Las contraseñas no son iguales') )
            return false
        }

        if( password.trim().length < 6 ){
            dispatch( setError('La contraseña debe se tener minimo 6 caracteres') )
            return false
        }

        dispatch( removeError() )
        return true
    }

    return (
        <>
            <h3 className="auth_title">Crear Cuenta</h3>
            <form onSubmit={ handleRegister }>
                { msgError &&
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                }
                <input
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    value={ name }
                    onChange={ handleInputChange }
                    className="auth__input"
                    autoComplete="off" />
                <input
                    type="text"
                    placeholder="example@email.com"
                    name="email"
                    value={ email }
                    onChange={ handleInputChange }
                    className="auth__input"
                    autoComplete="off" />
                <input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={ password }
                    onChange={ handleInputChange }
                    className="auth__input"
                    autoComplete="off" />
                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    name="password2"
                    value={ password2 }
                    onChange={ handleInputChange }
                    className="auth__input"
                    autoComplete="off" />
                <button 
                    type="submit" 
                    className="btn btn-primary btn-block"
                    disabled={ loading } >
                        Registrarme
                </button>

                <Link to="/auth/login" className="link mt-5"> Iniciar Sesión</Link>
            </form>
        </>
    )
}

export default RegisterScreen