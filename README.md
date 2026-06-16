# Avalon Voz

Asistente web narrado para preparar partidas de **La Resistencia: Ávalon** desde un dispositivo móvil.

Avalon Voz existe para resolver un problema muy concreto: en Ávalon, la fase inicial de ojos cerrados suele depender de una persona leyendo instrucciones con precisión. Si el narrador se equivoca, usa términos confusos o acelera demasiado, la partida puede empezar con dudas o información mal revelada. Esta app convierte esa preparación en un flujo guiado, configurable y narrado por voz.

## Qué hace

- Configura partidas de 5 a 10 jugadores.
- Calcula automáticamente la distribución de bien/mal.
- Permite añadir roles opcionales: Perceval, Mordred, Morgana y Oberón.
- Muestra Merlín y Asesino como roles obligatorios informativos.
- Genera el guion de revelación inicial según los roles elegidos.
- Narra el guion usando la síntesis de voz del dispositivo.
- Permite elegir voz, velocidad y tiempo de pausa entre instrucciones.
- Reproduce un sonido de cronómetro entre instrucciones.
- Soporta texto original y texto sencillo para jugadores nuevos.
- Incluye variante de español castellano y español latinoamericano.
- Funciona como PWA instalable, orientada a uso móvil.

## Por qué existe

Ávalon es un juego social, pero su preparación tiene una parte mecánica delicada:

- Los jugadores del mal deben reconocerse.
- Merlín debe recibir información sin revelar su identidad.
- Perceval puede necesitar una fase extra.
- Mordred, Morgana y Oberón cambian detalles importantes del guion.

La app ayuda a que esa parte sea consistente, clara y repetible. También baja la barrera para grupos nuevos usando el modo sencillo, donde las instrucciones dicen “malos” en lugar de “esbirros de Mordred”.

## Stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS v4
- vue-i18n
- vite-plugin-pwa
- Web Speech API
- HTMLAudioElement para el sonido de espera

## Requisitos

- Node.js 22 o superior recomendado.
- npm 11 o superior recomendado.
- Un navegador moderno con soporte de `speechSynthesis` para narración por voz.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La app se sirve por defecto en:

```text
http://localhost:5173/
```

## Build

```bash
npm run build
```

El build genera la app en `dist/`, incluyendo manifest, service worker y assets para PWA.

## Preview de producción

```bash
npm run preview
```

## Estructura del proyecto

```text
src/
  components/              Componentes de UI por sección
  composables/              Lógica reutilizable de narración
  data/                     Reglas, roles y generación de guion
  i18n/                     Locales y configuración de traducciones
  App.vue                   Composición principal de la SPA
  main.ts                   Registro de Vue, i18n y PWA

public/
  characters/               Imágenes de roles
  cronometro.mp3            Sonido de espera entre instrucciones
  pwa-icon.svg              Icono de la PWA

Documents/
  Avalon.pdf                Reglamento de referencia
```

## PWA y actualizaciones

Avalon Voz está configurada como PWA con actualización automática:

- registra service worker al cargar;
- revisa actualizaciones al abrir;
- revisa de nuevo cuando la app vuelve a primer plano;
- activa el service worker nuevo con `skipWaiting`;
- toma control con `clientsClaim`;
- recarga cuando hay una versión nueva lista.

La versión visible de la app se toma desde `package.json` y se muestra al final de la interfaz.

## Localización

La narración usa `vue-i18n` y actualmente incluye:

- `es-ES`: español castellano.
- `es-419`: español latinoamericano.

La estructura está preparada para agregar más idiomas o variantes sin reescribir la lógica de reglas. El generador de guion recibe una función `t(...)` y compone las instrucciones a partir de claves traducibles.

## Modos de narración

### Original

Mantiene el tono del reglamento, usando términos como “Esbirros de Mordred”.

### Sencillo

Pensado para jugadores nuevos. Cambia referencias complejas por términos más directos, por ejemplo:

```text
Malos, abran los ojos.
```

## Voz y audio

La narración usa la Web Speech API del navegador. Esto permite usar voces del dispositivo sin backend ni servicios externos.

El sonido entre instrucciones usa `public/cronometro.mp3`. Si el navegador bloquea o falla al reproducir ese audio, la app captura el error y la narración continúa.

## Roles incluidos

Obligatorios:

- Merlín
- Asesino

Opcionales:

- Perceval
- Mordred
- Morgana
- Oberón

Cada rol tiene una card visual con imagen, alineación y descripción.

## Notas sobre compatibilidad

La calidad y disponibilidad de voces depende del sistema operativo y navegador. En móvil, algunas voces pueden aparecer después de unos segundos o tras la primera interacción del usuario.

Algunos navegadores restringen reproducción automática de audio. Por eso el sonido de espera se inicia dentro del flujo de interacción del usuario y está diseñado para fallar de forma segura.

## Roadmap posible

- Añadir más idiomas.
- Añadir perfiles de narración por grupo.
- Permitir editar el guion manualmente.
- Exportar configuraciones de partida.
- Añadir guía rápida para resolución de gestas.
- Añadir modo oscuro/claro si se necesita para accesibilidad.
- Añadir tests unitarios para combinaciones de roles y generación de guion.

## Créditos

Proyecto creado como herramienta fan-made para facilitar partidas de **La Resistencia: Ávalon**.

Ávalon y sus nombres de personajes pertenecen a sus respectivos titulares. Este proyecto no pretende reemplazar el reglamento oficial ni distribuir contenido comercial del juego.
