// =============================================================================
// SERVICES CONFIGURATION
// src/config/services.ts
// =============================================================================

import type { ImageMetadata } from 'astro';
import type { SvgComponent } from 'astro/types';
import ToothOutline from '@/assets/icons/tooth-outline.svg';
import ToothSparkle from '@/assets/icons/tooth-sparkle.svg';
import ToothImplantCrown from '@/assets/icons/tooth-implant-crown.svg';
import ToothCrown from '@/assets/icons/toothcrown.svg';
import RemovableTooth from '@/assets/icons/removabletooth.svg';
import blanqueamiento from '@/assets/images/blanqueamiento.webp';
import rehabilitacion from '@/assets/images/rehabilitacion.webp';
import protesisRemovibles from '@/assets/images/protesisremovible.webp';
import odontologiaGeneral from '@/assets/images/odontologiageneral.webp';
import odontologiaEstetica from '@/assets/images/estetica.webp';
import Bruxismo from '@/assets/images/bruxismo.webp';
import implanteDental from '@/assets/images/implantedental.webp';
import coronaZirconio from '@/assets/images/corona.webp';
import incrustacionesDentales from '@/assets/images/incrustaciones.webp';
import ToothVeneer from '@/assets/icons/toothveneer.svg';
import ToothBrux from '@/assets/icons/toothbrux.svg';


export interface Service {
  slug: string;
  title: string;
  description: string;
  seoDescription: string;
  image?: ImageMetadata; // imported at the top of this file
  icon?: string;
  benefits?: string[];
}

// Services with their own page (/<slug>/). Source: textos-sitio.md §1 (card copy),
// §2 and §3 (meta descriptions, benefits).
export const services: Service[] = [
  {
    slug: 'blanqueamiento-dental',
    title: 'Blanqueamiento Dental',
    image: blanqueamiento,
    description:
      'Una sonrisa más blanca, sin ansiedad ni sorpresas. Uno de nuestros tratamientos más solicitados.',
    seoDescription:
      'Blanqueamiento dental profesional en Bogotá, Colombia, en un consultorio pensado para tu calma. Resultados visibles, sin dolor y con seguimiento personalizado.',
    benefits: [
      'Sonrisa notablemente más luminosa',
      'Procedimiento no invasivo',
      'Mejora visible en la autoestima',
      'Resultados en pocas sesiones',
    ],
  },
  {
    slug: 'rehabilitacion-oral',
    title: 'Rehabilitación Oral',
    image: rehabilitacion,
    description:
      'La especialidad de la Dra. Viviana: recuperar función y estética a la vez, con un enfoque cálido.',
    seoDescription:
      'Especialista en Rehabilitación Oral en Bogotá. Recupera función y estética dental con tecnología de punta, cero dolor y un enfoque cálido. Agenda tu cita.',
  },
];

// Services with no page of their own: a short card on / with its own anchor
// (e.g. /#implantes). Source: arquitectura-informacion.md §3.
// Title only: the photos speak for themselves, so these cards carry no description.
export interface ServiceCard {
  slug: string; // the anchor id on /
  title: string;
  image?: ImageMetadata; // imported at the top of this file
  icon?: SvgComponent; // badge on the card, imported at the top of this file
}

export const serviceCards: ServiceCard[] = [
  { slug: 'odontologia-general', title: 'Odontología General', image: odontologiaGeneral, icon: ToothOutline },
  { slug: 'odontologia-estetica', title: 'Odontología Estética', image: odontologiaEstetica, icon: ToothSparkle },
  { slug: 'implantes', title: 'Implantes', image: implanteDental, icon: ToothImplantCrown },
  { slug: 'coronas-en-zirconio', title: 'Coronas en Zirconio', image: coronaZirconio, icon: ToothCrown },
  { slug: 'incrustaciones-dentales', title: 'Incrustaciones Dentales', image: incrustacionesDentales, icon: ToothVeneer },
  { slug: 'placas-de-bruxismo', title: 'Placas de Bruxismo', image: Bruxismo, icon: ToothBrux },
  { slug: 'protesis-removibles', title: 'Prótesis Removibles', image: protesisRemovibles, icon: RemovableTooth },
];
