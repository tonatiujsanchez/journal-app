import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import useForm from "../../hooks/useForm"
import { isEmail } from 'validator'

import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth"
import { removeError, setError } from "../../actions/ui"

const LoginScreen = () => {

    const dispatch = useDispatch()
    const { loading, msgError } = useSelector( state => state.ui )


    const [{ email, password }, handleInputChange ] = useForm({
        email: '',
        password: ''
    })

    useEffect(()=>{
        return( ()=>{
            dispatch( removeError() )
        })
    },[])


    const handleLogin = (e) => {
        e.preventDefault()

        if ( isFormValid() ) {
            dispatch( startLoginEmailPassword( email, password) )
        }

    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() )
    }


    const isFormValid = () => {
        
        if( [ email.trim(), password.trim() ].includes('') ){
            dispatch( setError('Todos los campos on obligatorios') )
            return false
        }

        if( !isEmail( email ) ){
            dispatch( setError('El correo ingresado no es valido') )   
            return false
        }

        dispatch( removeError() )
        return true
    }

    return (
        <>
            <h3 className="auth_title">Iniciar Sesión</h3>
            <form onSubmit={handleLogin}>
                { msgError &&
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                }
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
                <button 
                    type="submit" 
                    className="btn btn-primary btn-block"
                    disabled={ loading } >
                        Ingresar
                </button>


                <div className="auth__social-networks">
                    <p>Iniciar Sesión con un red Social</p>
                    <div className="google-btn"
                         onClick={ handleGoogleLogin } >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text pointer">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link"> Crear una cuenta</Link>
            </form>
        </>
    )
}

export default LoginScreen