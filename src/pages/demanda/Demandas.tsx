function Demandas() {
  return ( 
    <>
    <div className="container_3">
        <div className="title">Galeria de Demandas</div>
        <div className="search-section">
        <div className="search-bar">
            <input type="text" placeholder="Busque um projeto">
            <i className="fas fa-search"></i>
        </div>
        <div className="search-botton ">
        <button className="btn-cadastrar">Cadastrar projeto</button>
        <button className="btn-cadastrar_2">Formar equipe </button>
        </div>
        </div>
    </div>
    
        <aside className="side-panel">
            <div className="filter-group">
                <h1> Filtros</h1>
            <div className="label">Tipo de Projeto</div>
            <label className="checkbox"><input type="checkbox"> Sistema Web</label>
            <label className="checkbox"><input type="checkbox"> Aplicativo Mobile</label>
            <label className="checkbox"><input type="checkbox"> Landing Page</label>
            <label className="checkbox"><input type="checkbox"> E-commerce</label>
            <div className="label">Área de Negócio</div>
            <form className="d-flex search-bar">
                <input className="form-control me-2" type="search" placeholder="Pesquisar produtos">
            </div>
        
            <div className="filter-group">
            <div className="label">Complexidade</div>
            <label className="checkbox"><input type="radio"> Tipo de Projeto</label>
            <label className="checkbox"><input type="radio"> Básica</label>
            <label className="checkbox"><input type="radio"> Intermediária</label>
            <label className="checkbox"><input type="radio"> Avançada</label>
            </div>
            <div>
            <button className="btn primary" style="width:100%">Aplicar Filtros</button>
            </div>
            </form>
        </aside>
        <h1 className="head">Projetos Disponiveis</h1>
        
        <div className="grid">
            <div className="card-grid">
            <article className="card">
                <div className="left">
                    <h1>Sistema de Gestão para Clínica Veterinária</h1>
                    <div> <h6 className="label"> Amanda Alves</h6>
                    <h6 className="label"> Sistema web</h6></div>
                    <div> <h6 className="label2"> Intermediaria</h6></div>
                    <p>Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados.</p>
                    <button className="btn-cadastrar_3">Manifestar interesse</button>
                    <button className="btn-cadastrar_4">Ver detalhes</button>
                </div>
            </article>
            </div>
        </div>
        <div className="grid">
            <div className="card-grid">
                <article className="card">
                    <div className="left">
                        <h1>Sistema de Gestão para Clínica Veterinária</h1>
                        <div> <h6 className="label"> Amanda Alves</h6>
                        <h6 className="label"> Sistema web</h6></div>
                        <div> <h6 className="label2"> Intermediaria</h6></div>
                        <p>Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados.</p>
                        <button className="btn-cadastrar_3">Manifestar interesse</button>
                        <button className="btn-cadastrar_4">Ver detalhes</button>
                    </div>
                </article>
                </div>
            </div>
            
            <div className="grid">
            <div className="card-grid">
            <article className="card">
                <div className="left">
                    <h1>Sistema de Gestão para Clínica Veterinária</h1>
                    <div> <h6 className="label"> Amanda Alves</h6>
                    <h6 className="label"> Sistema web</h6></div>
                    <div> <h6 className="label2"> Intermediaria</h6></div>
                    <p>Desenvolvimento de sistema web para gestão completa de clínica veterinária, incluindo cadastro de pets, agendamento de consultas, prontuário eletrônico e controle financeiro. Necessário experiência com banco de dados.</p>
                    <button className="btn-cadastrar_3">Manifestar interesse</button>
                    <button className="btn-cadastrar_4">Ver detalhes</button>
                </div>
            </article>
            </div>
        </div>
    </>
    )
}

export default Demandas