import EllipseLight from "../../assets/img/icones/Ellipse light.svg";
import Lightbulb from "../../assets/img/icones/Lightbulb.svg";
import EllipseMortar from "../../assets/img/icones/Ellipse  mortar.svg";
import MortarboardFill from "../../assets/img/icones/MortarboardFill.svg";
import EllipseBook from "../../assets/img/icones/Ellipse book.svg";
import Book from "../../assets/img/icones/Book.svg";
import EllipsePerson from "../../assets/img/icones/Ellipse person.svg";
import PersonVideo from "../../assets/img/icones/PersonVideo3.svg";
import leftArrow from "../../assets/img/icones/seta pra esquerda.svg";
import rightArrow from "../../assets/img/icones/seta pra direita.svg";
import { useState } from "react";

type CardData = {
  id: number;
  title: string;
  subtitle: string;
  items: string[];
  buttonText: string;
  bgEllipse: string;
  image: string;
};

const cardsData: CardData[] = [
  {
    id: 1,
    title: "Sou Empreendedor",
    subtitle: "Tenho uma demanda e preciso de uma solução digital",
    items: [
      "Publique seus projetos na plataforma",
      "Receba propostas de grupos qualificados",
      "Acompanhe o desenvolvimento do projeto",
      "Acesso a estudantes especializados",
    ],
    buttonText: "Cadastrar como Empreendedor",
    bgEllipse: EllipseLight,
    image: Lightbulb,
  },
  {
    id: 2,
    title: "Sou Estudante",
    subtitle: "Quero participar de projetos reais e ganhar experiência",
    items: [
      "Trabalhe em projetos reais do mercado",
      "Ganhe experiência prática",
      "Forme uma rede de contatos",
      "Desenvolva seu portfólio",
    ],
    buttonText: "Cadastrar como Estudante",
    bgEllipse: EllipseMortar,
    image: MortarboardFill,
  },
  {
    id: 3,
    title: "Sou Coordenador",
    subtitle: "Sou coordenador e preciso verificar a demanda",
    items: [
      "Verifique as demandas",
      "Classifique as propostas",
      "Acompanhe o desenvolvimento do projeto",
      "Dê orientações gerais",
    ],
    buttonText: "Cadastrar como Coodenador",
    bgEllipse: EllipseBook,
    image: Book,
  },
  {
    id: 4,
    title: "Sou Professor",
    subtitle: "Preciso acompanhar projetos e orientar alunos",
    items: [
      "Verifique os grupos",
      "Dê orientações",
      "Acompanhe o desenvolvimento dos projetos",
      "Verrique o andamento das atividades",
    ],
    buttonText: "Cadastrar como Professor",
    bgEllipse: EllipsePerson,
    image: PersonVideo,
  },
];

// Componente Card
function Card({ card }: { card: CardData }) {
  return (
    <div className="relative flex-shrink-0 w-[80vw] sm:w-[300px] md:w-[350px] lg:w-[380px] mx-2">
      <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center text-center min-h-[450px]">
        <img
          src={card.bgEllipse}
          alt="ellipse"
          className="absolute -top-8 w-40 h-40 object-contain"
        />
        <img
          src={card.image}
          alt="card"
          className="w-20 h-20 relative z-10 -mt-8"
        />
        <h3 className="mt-4 text-xl font-bold">{card.title}</h3>
        <h5 className="mt-2 text-base text-gray-600">{card.subtitle}</h5>
        <ul className="mt-4 text-left list-disc list-inside space-y-1 w-full px-4 text-base">
          <li>{card.items[0]}</li>
          <li>{card.items[1]}</li>
          <li>{card.items[2]}</li>
          <li>{card.items[3]}</li>
        </ul>
        <button className="mt-auto bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 cursor-pointer">
          {card.buttonText}
        </button>
      </div>
    </div>
  );
}

function CarrosselHome() {
  const [index, setIndex] = useState(0);
  const total = cardsData.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  return (
    <div className="relative w-full max-w-7xl mx-auto py-10 overflow-hidden">
      {/* Setas */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 cursor-pointer"
      >
        <img src={leftArrow} alt="Voltar" className="w-10 h-10" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 cursor-pointer"
      >
        <img src={rightArrow} alt="Avançar" className="w-10 h-10" />
      </button>

      {/* Carrossel */}
      <div className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${index * (380 + 16)}px)`,
        }}
      >
        {/* Duplicação para loop infinito */}
        {[...cardsData, ...cardsData].map((card, i) => (
          <Card key={i} card={card} />
        ))}
      </div>
    </div>
  );
}


export default CarrosselHome