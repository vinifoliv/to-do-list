import './css/Login.css';

export default function Login({ setLogado }) {
    return (
        <div className="card-login">
            <h1 className="titulo-login">Login</h1>
            
            {/* Nome do usuario */}
            <div className="campo">
                <label>Nome</label> &nbsp;
                <input type="text" id="nome-usuario"/>
            </div>

            {/* Email do usuario */}
            <div className="campo">
                <label>Email</label> &nbsp;
                <input type="text"id="email-usuario"/>
            </div>

            {/* Senha do usuario */}
            <div className="campo">
                <label>Senha</label> &nbsp;
                <input type="password"id="senha-usuario"/>
            </div>

            {/* Botoes */}
            <div className="campo-botoes">
                <button onClick={() => setLogado(true)}>Entrar</button> &nbsp; &nbsp;
                <button>Cadastrar-se</button>
            </div>

        </div>
    );
}