import './Filtro.css';

export default function Filtro(props) {
    return (
        <ul className="menu">
            <li id="todas" onClick={() => props.onClick('todas')}>Todas as tarefas</li>
            <li id="pendentes" onClick={() => props.onClick('pendentes')}>Pendentes</li>
            <li id="concluidas"onClick={() => props.onClick('concluidas')}>Concluídas</li>
        </ul>
    );
}