import './css/Login.css';

export default function Login({ logar }) {
    const DOMAIN = 'http://localhost:9000';

    // Markup --------------------------------------------------------------------------------------------------
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
                <button onClick={login}>Entrar</button> &nbsp; &nbsp;
                <button onClick={cadastrar}>Cadastrar-se</button>
            </div>

        </div>
    );

    // Requisições à API ---------------------------------------------------------------------------------------------------------
    async function login() {
        // Montando o objeto com EMAIL e SENHA
        let email = document.getElementById('email-usuario').value;
        let senha = document.getElementById('senha-usuario').value;

        let usuario = {
            email: email,
            senha: senha
        }

        // Configurando a requisição
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        }

        fetch(DOMAIN + '/login', options)
        .then(async (response) => {
            if (!response.ok) {
                const message = await response.text();
                throw new Error(message);
            }

            alert('Login realizado com sucesso!');
            const tokenJson = await response.json();
            const token = tokenJson.content;
            await logar(token);
        })

        .catch((error) => {
            alert('Erro: ' + error);
        });
    }

    async function cadastrar() {
        // Montando o objeto com NOME, EMAIL e SENHA
        let nome = document.getElementById('nome-usuario').value;
        let email = document.getElementById('email-usuario').value;
        let senha = document.getElementById('senha-usuario').value;

        let usuario = {
            nome: nome,
            email: email,
            senha: senha
        }

        // Configurando a requisição
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        }

        fetch(DOMAIN + '/cadastrar-usuario', options)

        .then(async (response) => {
            if (!response.ok) {
                const message = await response.text();
                throw new Error(message);
            }

            alert(nome + ', você foi cadastrado com sucesso!');
            const tokenJson = await response.json();
            const token = tokenJson.content;
            await logar(token);
        })

        .catch((error) => {
            alert('Erro ao cadastrar usuário : ' + error);
        })
    }
}