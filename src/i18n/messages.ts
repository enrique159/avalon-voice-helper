export type SupportedLocale = 'es-419' | 'es-ES';

export const localeOptions: Array<{ value: SupportedLocale; label: string; description: string }> = [
  {
    value: 'es-419',
    label: 'Español latinoamericano',
    description: 'Usa instrucciones con “ustedes”: cierren, abran, levanten.'
  },
  {
    value: 'es-ES',
    label: 'Español castellano',
    description: 'Usa instrucciones con “vosotros”: cerrad, abrid, levantad.'
  }
];

export const messages = {
  'es-419': {
    narration: {
      locale: {
        title: 'Variante de español',
        description: 'Adapta las instrucciones narradas a la forma de hablar del grupo.',
        note: 'La voz disponible depende del dispositivo; el texto se ajusta aunque uses otra voz.'
      },
      mode: {
        title: 'Texto de narración',
        description: 'Elige cómo se nombran los roles durante las instrucciones habladas.',
        simple: 'Sencillo',
        original: 'Original',
        note: 'En modo sencillo, las frases dicen “malos” en lugar de “esbirros de Mordred”.'
      },
      preview: 'Esta es la voz que guiará la preparación de Ávalon.',
      labels: {
        evilRevealWithOberon: '{evilName}, pero no Oberón',
        evilReveal: '{evilName}',
        merlinRevealWithMordred: '{evilName}, pero no Mordred',
        merlinReveal: '{evilName}',
        percivalRevealWithMorgana: 'Merlín y Morgana',
        percivalReveal: 'Merlín'
      },
      terms: {
        evilNameOriginal: 'Esbirros de Mordred',
        evilNameSimple: 'Malos',
        evilGroupOriginal: 'agentes del mal',
        evilGroupSimple: 'jugadores malos',
        otherEvilGroupOriginal: 'todos los demás agentes del mal',
        otherEvilGroupSimple: 'los demás jugadores malos'
      },
      steps: {
        closeEyes: {
          title: 'Todos cierran los ojos',
          text: 'Cierren todos los ojos y cierren el puño, con el brazo estirado delante de ustedes.'
        },
        evilOpen: {
          title: 'El mal se reconoce',
          text: '{evilRevealLabel}, abran los ojos. Miren a su alrededor y asegúrense de reconocer y recordar a {otherEvilGroupLabel}.'
        },
        evilClose: {
          title: 'El mal cierra los ojos',
          text: '{evilCloseLabel}, cierren los ojos. Ahora todo el mundo debería tener los ojos cerrados y el puño cerrado con el brazo estirado.'
        },
        evilThumbs: {
          title: 'Señal para Merlín',
          text: '{merlinRevealLabel}, levanten el pulgar, para que Merlín pueda saber quiénes son.'
        },
        merlinOpen: {
          title: 'Merlín mira',
          text: 'Merlín, abre los ojos y mira quiénes son los {evilGroupLabel}.'
        },
        evilThumbsDown: {
          title: 'El mal oculta la señal',
          text: '{evilCloseLabel}, bajen el pulgar y cierren el puño como antes.'
        },
        merlinClose: {
          title: 'Merlín cierra los ojos',
          text: 'Merlín, cierra los ojos. Ahora todo el mundo debería tener los ojos cerrados y el puño cerrado con el brazo estirado.'
        },
        percivalThumbs: {
          title: 'Señal para Perceval',
          textSingular: '{percivalRevealLabel}, levanta el pulgar, para que Perceval pueda saber quién eres.',
          textPlural: '{percivalRevealLabel}, levanten el pulgar, para que Perceval pueda saber quiénes son.'
        },
        percivalOpen: {
          title: 'Perceval mira',
          textSingular: 'Perceval, abre los ojos para que puedas saber quién es Merlín.',
          textPlural: 'Perceval, abre los ojos para que puedas ver qué jugadores podrían ser Merlín.'
        },
        merlinMorganaDown: {
          title: 'Se oculta la señal',
          textSingular: '{percivalRevealLabel}, baja el pulgar y cierra el puño como antes.',
          textPlural: '{percivalRevealLabel}, bajen el pulgar y cierren el puño como antes.'
        },
        percivalClose: {
          title: 'Perceval cierra los ojos',
          text: 'Perceval, cierra los ojos. Ahora todo el mundo debería tener los ojos cerrados y el puño cerrado con el brazo estirado.'
        },
        everyoneOpen: {
          title: 'Comienza la partida',
          text: 'Abran todos los ojos.'
        }
      }
    }
  },
  'es-ES': {
    narration: {
      locale: {
        title: 'Variante de español',
        description: 'Adapta las instrucciones narradas a la forma de hablar del grupo.',
        note: 'La voz disponible depende del dispositivo; el texto se ajusta aunque uses otra voz.'
      },
      mode: {
        title: 'Texto de narración',
        description: 'Elige cómo se nombran los roles durante las instrucciones habladas.',
        simple: 'Sencillo',
        original: 'Original',
        note: 'En modo sencillo, las frases dicen “malos” en lugar de “esbirros de Mordred”.'
      },
      preview: 'Esta es la voz que guiará la preparación de Ávalon.',
      labels: {
        evilRevealWithOberon: '{evilName}, pero no Oberón',
        evilReveal: '{evilName}',
        merlinRevealWithMordred: '{evilName}, pero no Mordred',
        merlinReveal: '{evilName}',
        percivalRevealWithMorgana: 'Merlín y Morgana',
        percivalReveal: 'Merlín'
      },
      terms: {
        evilNameOriginal: 'Esbirros de Mordred',
        evilNameSimple: 'Malos',
        evilGroupOriginal: 'agentes del mal',
        evilGroupSimple: 'jugadores malos',
        otherEvilGroupOriginal: 'todos los demás agentes del mal',
        otherEvilGroupSimple: 'los demás jugadores malos'
      },
      steps: {
        closeEyes: {
          title: 'Todos cierran los ojos',
          text: 'Cerrad todos los ojos y cerrad el puño, con el brazo estirado delante de vosotros.'
        },
        evilOpen: {
          title: 'El mal se reconoce',
          text: '{evilRevealLabel}, abrid los ojos. Mirad a vuestro alrededor y aseguraos de reconocer y recordar a {otherEvilGroupLabel}.'
        },
        evilClose: {
          title: 'El mal cierra los ojos',
          text: '{evilCloseLabel}, cerrad los ojos. Ahora todo el mundo debería tener los ojos cerrados y el puño cerrado con el brazo estirado.'
        },
        evilThumbs: {
          title: 'Señal para Merlín',
          text: '{merlinRevealLabel}, levantad el pulgar, de modo que Merlín pueda saber quiénes sois.'
        },
        merlinOpen: {
          title: 'Merlín mira',
          text: 'Merlín, abre los ojos y mira quiénes son los {evilGroupLabel}.'
        },
        evilThumbsDown: {
          title: 'El mal oculta la señal',
          text: '{evilCloseLabel}, recoged el pulgar y cerrad el puño como antes.'
        },
        merlinClose: {
          title: 'Merlín cierra los ojos',
          text: 'Merlín, cierra los ojos. Ahora todo el mundo debería tener los ojos cerrados y el puño cerrado con el brazo estirado.'
        },
        percivalThumbs: {
          title: 'Señal para Perceval',
          textSingular: '{percivalRevealLabel}, levanta el pulgar, de modo que Perceval pueda saber quién eres.',
          textPlural: '{percivalRevealLabel}, levantad el pulgar, de modo que Perceval pueda saber quiénes sois.'
        },
        percivalOpen: {
          title: 'Perceval mira',
          textSingular: 'Perceval, abre los ojos para que puedas saber quién es Merlín.',
          textPlural: 'Perceval, abre los ojos para que puedas ver qué jugadores podrían ser Merlín.'
        },
        merlinMorganaDown: {
          title: 'Se oculta la señal',
          textSingular: '{percivalRevealLabel}, recoge el pulgar y cierra el puño como antes.',
          textPlural: '{percivalRevealLabel}, recoged el pulgar y cerrad el puño como antes.'
        },
        percivalClose: {
          title: 'Perceval cierra los ojos',
          text: 'Perceval, cierra los ojos. Ahora todo el mundo debería tener los ojos cerrados y el puño cerrado con el brazo estirado.'
        },
        everyoneOpen: {
          title: 'Comienza la partida',
          text: 'Abrid todos los ojos.'
        }
      }
    }
  }
} as const;
