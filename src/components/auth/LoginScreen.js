import { Link, NavLink } from "react-router-dom"


const LoginScreen = () => {
    return (
        <>
            <h3 className="auth_title">Iniciar Sesión</h3>
            <form>
                <input
                    type="text"
                    placeholder="example@email.com"
                    name="email"
                    className="auth__input"
                    autoComplete="off" />
                <input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    className="auth__input"
                    autoComplete="off" />
                <button type="submit" className="btn btn-primary btn-block">Ingresar</button>


                <div className="auth__social-networks">
                    <p>Iniciar Sesión con un red Social</p>
                    <div className="google-btn" >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
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