// =============================================================================
// FAQS CONFIGURATION
// src/config/faqs.ts
// =============================================================================

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

// Source: textos-sitio.md, verbatim. category = the slug of the page that shows it
// ('inicio' for /). The one change from the brief: the home "¿Dónde queda...?" answer
// uses "Cra 15" instead of "Carrera 15", for the single NAP form (brief §1).
export const faqs: FAQItem[] = [
  // Inicio — textos-sitio.md §1
  {
    category: 'inicio',
    question: '¿Qué diferencia a la Dra. Viviana de otros consultorios en Bogotá?',
    answer:
      'Su enfoque de Odontología de Calma Activa: aromaterapia, música relajante, audífonos de cancelación de ruido y anestesia digital, junto a más de 12 años de experiencia clínica.',
  },
  {
    category: 'inicio',
    question: '¿Atienden con EPS o seguros dentales?',
    answer:
      'No. El consultorio es de atención particular. Aceptamos pagos con tarjeta débito, crédito, datáfono o código QR.',
  },
  {
    category: 'inicio',
    question: '¿Dónde queda el consultorio?',
    answer: 'En la Cra 15 # 104-30, Consultorio 302, zona de Chicó, al norte de Bogotá.',
  },
  {
    category: 'inicio',
    question: '¿Cómo agendo una cita?',
    answer: 'Por WhatsApp al 302 544 5760, indicando el servicio de tu interés.',
  },

  // Blanqueamiento Dental — textos-sitio.md §2
  {
    category: 'blanqueamiento-dental',
    question: '¿Es doloroso el blanqueamiento dental?',
    answer:
      'En la mayoría de los casos no genera dolor; algunos pacientes sienten sensibilidad temporal, que manejamos con productos específicos y, si es necesario, anestesia digital.',
  },
  {
    category: 'blanqueamiento-dental',
    question: '¿Cuánto dura el efecto de un blanqueamiento dental?',
    answer:
      'Entre 1 y 3 años, dependiendo de hábitos como el café, el vino o el cigarrillo, y de los cuidados posteriores.',
  },
  {
    category: 'blanqueamiento-dental',
    question: '¿Cuánto cuesta un blanqueamiento dental en Bogotá?',
    answer:
      'El valor varía según el tipo de blanqueamiento y el estado de tu esmalte. Lo definimos con precisión en tu valoración inicial.',
  },
  {
    category: 'blanqueamiento-dental',
    question: '¿Quiénes pueden hacerse un blanqueamiento dental?',
    answer:
      'La mayoría de personas con buena salud oral son candidatas; en la valoración revisamos encías y esmalte antes de recomendar el tratamiento adecuado.',
  },

  // Rehabilitación Oral — textos-sitio.md §3
  {
    category: 'rehabilitacion-oral',
    question: '¿Qué es la rehabilitación oral?',
    answer:
      'Es la especialidad que recupera la función, la estética y la salud de la boca combinando coronas, prótesis, implantes o placas de bruxismo según el diagnóstico de cada paciente.',
  },
  {
    category: 'rehabilitacion-oral',
    question: '¿Cuándo debo consultar a un especialista?',
    answer:
      'Cuando notas desgaste dental, dolor en la mandíbula, pérdida de piezas, o cuando tu odontólogo general te refiere para un tratamiento más integral.',
  },
  {
    category: 'rehabilitacion-oral',
    question: '¿Cuánto dura un tratamiento de rehabilitación oral?',
    answer:
      'Depende de la complejidad del caso: desde unas pocas semanas hasta varios meses. En la valoración inicial definimos un plan de tiempos claro.',
  },

  // Contacto — textos-sitio.md §4
  {
    category: 'contacto',
    question: '¿Aceptan tarjeta de crédito o débito?',
    answer:
      'Sí, con datáfono, débito, crédito o código QR. No manejamos convenios con EPS ni seguros dentales.',
  },
  {
    category: 'contacto',
    question: '¿Necesito una valoración antes de iniciar un tratamiento?',
    answer:
      'Sí, toda primera cita incluye una valoración para diagnosticar tu caso y definir el plan de tratamiento antes de empezar.',
  },
];
