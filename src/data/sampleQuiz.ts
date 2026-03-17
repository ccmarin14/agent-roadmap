import type { Quiz } from "../types";

export const sampleLLMQuiz: Quiz = {
  passingScore: 90,
  questions: [
    {
      id: "q1",
      question: "¿Qué es un token en el contexto de LLMs?",
      options: [
        "Una palabra completa",
        "Una unidad de texto de aproximadamente 4 caracteres",
        "Una frase completa",
        "Un párrafo entero"
      ],
      correctIndex: 1
    },
    {
      id: "q2",
      question: "¿Qué es la 'ventana de contexto' en un LLM?",
      options: [
        "La interfaz de chat",
        "La cantidad de texto que el modelo puede 'recordar' en una conversación",
        "El tamaño del archivo de entrada",
        "La memoria del computadora"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "¿Qué efecto tiene aumentar la 'temperatura' de un LLM?",
      options: [
        "El modelo responde más rápido",
        "El modelo se vuelve más determinístico y preciso",
        "El modelo genera respuestas más creativas y diversas",
        "El modelo usa menos memoria"
      ],
      correctIndex: 2
    }
  ]
};

export const sampleAgentsQuiz: Quiz = {
  passingScore: 90,
  questions: [
    {
      id: "q1",
      question: "¿Cuál es la diferencia principal entre un chatbot y un agente?",
      options: [
        "Los chatbots son más rápidos",
        "Los agentes tienen acceso a herramientas para actuar en el sistema",
        "Los chatbots usan IA más avanzada",
        "No hay diferencia significativa"
      ],
      correctIndex: 1
    },
    {
      id: "q2",
      question: "¿Qué es el patrón ReAct en agentes?",
      options: [
        "Un tipo de modelo de lenguaje",
        "Razonar → Actuar → Observar → Repetir",
        "Una herramienta de desarrollo",
        "Un formato de archivo"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "¿Por qué es mejor usar agentes especializados que agentes de propósito general?",
      options: [
        "Son más rápidos",
        "Son más predecibles y fáciles de confiar con herramientas y contexto acotados",
        "Son más baratos",
        "No hay diferencia"
      ],
      correctIndex: 1
    }
  ]
};
