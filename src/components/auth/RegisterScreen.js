import { Link } from "react-router-dom"


const RegisterScreen = () => {
    return (
        <>
            <h3 className="auth_title">Crear Cuenta</h3>
            <form>
                <input
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    className="auth__input"
                    autoComplete="off" />
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
                <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    name="password2"
                    className="auth__input"
                    autoComplete="off" />
                <button type="submit" className="btn btn-primary btn-block">Registrarme</button>

                <Link to="/auth/login" className="link mt-5"> Iniciar Sesión</Link>
            </form>
        </>
    )
}

export default RegisterScreen