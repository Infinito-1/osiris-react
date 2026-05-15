import React from "react";
import { useParams } from "react-router-dom";
import { useGetDemandById } from "../../hooks/demands/useGetDemandById";

// Componente para um campo de informação
interface InfoFieldProps {
  label: string;
  value: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
      <p className="text-base font-medium text-gray-800">{label}</p>
      <p className="text-base text-gray-600">{value}</p>
    </div>
  );
};

// interface Projeto {
//   titulo: string;
//   tipo: string;
//   descricao: string;
//   complexidade: string;
//   semestre: string;
//   tecnologiasRecomendadas: string[];
//   empresa: {
//     nome: string;
//     empreendedor: string;
//     email: string;
//   };
// }

interface pageParams extends Record<string, string> {
  id: string;
}

// Componente Principal da Página de Projeto
const Projeto: React.FC = () => {
  //Para puxar os dados inseridos na rota dinâmica, basta usar a hook useParams() para puxar os dados desejados. Neste caso, nós precisamos do id do projeto para
  // que seja possível colocá-la na hook da API
  const params = useParams<pageParams>();

  const [projeto] = useGetDemandById({ id: Number(params.id) });

  // Um exemplo básico de como você pode requisitar a API de maneira "crua" com a API do fetch do Javascript e realizar sua manipulação de maneira granulada.
  // Você pode converter isso em uma hook e utilizar ao redor do projeto de maneira prática também.
  // Percebi que a API não retornou alguns dados que aparentemente são obrigatórios colocá-los aqui e em outras páginas, então eu coloquei placeholders entre o demanda.mapper e em mais algum lugar possivelmente
  // useEffect(() => {
  //   fetch(`http://localhost:4000/demandas/${params.id}`)
  //     .then((res) => {
  //       if (res.ok) return res.json();
  //     })
  //     .then((data) => {
  //       const newDemanda: Projeto = {
  //         titulo: data.demStrNome,
  //         tipo: data.tipo[0].tipStrNome,
  //         descricao: data.demStrDescricao,
  //         complexidade: "Complexidade aqui",
  //         semestre: data.semestre.semStrDescricao,
  //         tecnologiasRecomendadas: [
  //           "React",
  //           "Javascript",
  //           "HTML",
  //           "COLOQUE DADOS AQUI",
  //         ],
  //         empresa: {
  //           nome: data.empreendedor.empStrEmpresa,
  //           empreendedor: "EMPREENDEDOR AQUI",
  //           email: "EMAIL EMPREENDEDOR AQUI",
  //         },
  //       };

  //       setProjeto(newDemanda);
  //     });
  // }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#F1F7EE] py-10 ">
      <header className="w-full py-8 text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          {projeto?.demanda.titulo}
        </h1>
        <p className="text-lg mt-1">
          {projeto?.empreendedor.empresa || "EMPREENDEDOR AQUI"} /{" "}
          {projeto?.tipo[0].nome}
        </p>
      </header>

      <div className="w-11/12 max-w-4xl bg-white border border-gray-300 rounded-lg p-8 shadow-xl">
        {/* Seção de Descrição do Projeto */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Descrição do Projeto
          </h2>
          <p className="text-base text-gray-600 mb-4 leading-relaxed">
            {projeto?.demanda.descricao}
          </p>
          <p className="text-base text-gray-600">
            <span className="font-medium text-gray-800">Complexidade:</span>{" "}
            {projeto?.demanda.complexidade || "COMPLEXIDADE AQUI"}
          </p>
        </section>

        {/* Seção Sobre o Empreendedor */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Sobre o Empreendedor
          </h2>
          <div className="space-y-4">
            <InfoField
              label="Nome:"
              value={projeto?.empreendedor.empresa || "EMPREENDEDOR AQUI"}
            />
            <InfoField label="Empresa:" value={projeto?.empreendedor.empresa} />
            <InfoField label="Email:" value={projeto?.empreendedor.email} />
            <InfoField
              label="Semestre recomendado:"
              value={`A partir do ${projeto?.demanda.semestreRecomendado}º`}
            />
            <InfoField label="Complexidade:" value={projeto?.complexidade} />
            <InfoField
              label="Tecnologias recomendadas:"
              value={projeto?.demanda.tecnologiasRecomendadas.map((tec) => {
                return `${tec}, `;
              })}
            />
          </div>
        </section>

        {/* Seção de Botões */}
        <section className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
          <button className="flex-1 bg-[#782E29] text-white py-3 px-6 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#6d2823] shadow-md">
            Manifestar Interesse
          </button>
          <button className="flex-1 bg-[#5F747F] text-white py-3 px-6 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-[#53656e] shadow-md">
            Entrar em Contato
          </button>
        </section>
      </div>
    </div>
  );
};

export default Projeto;
