# JOSS.DEV — Portafolio de Josué

Portafolio personal de una sola página para presentar mi perfil como desarrollador Full Stack, proyectos, habilidades, trayectoria y datos de contacto. La interfaz está disponible en español e inglés y combina componentes React con una escena 3D ligera en el hero.

## Tecnologías y lenguajes

- **TypeScript**: tipos para componentes, propiedades y datos de proyectos/experiencia.
- **React 19**: interfaz construida con componentes reutilizables y hooks.
- **Vite**: servidor local de desarrollo y empaquetado para producción.
- **Tailwind CSS 4**: utilidades de estilo responsivas y tokens de color definidos en `src/index.css`.
- **Three.js + React Three Fiber + Drei**: esfera, órbitas, halo, luces, estrellas y partículas del hero.
- **Motion**: entradas y transiciones al aparecer los elementos en pantalla.
- **i18next + react-i18next**: textos traducibles en `src/i18n/locales/es.json` y `en.json`.
- **Lucide React**: iconos de navegación, contacto, tecnologías y línea de tiempo.
- **HTML y CSS**: estructura semántica, accesibilidad, animaciones CSS y diseño adaptable.

El proyecto trata sobre todo de TypeScript, TSX (componentes React con TypeScript), CSS y JSON. No se agrega un backend: el formulario de contacto muestra el estado de interfaz, pero aún requiere conectarse a un servicio para enviar mensajes.

## Qué contiene

- **Hero** con presentación, llamadas a la acción, enlaces sociales, fotografía de perfil y fondo 3D interactivo.
- **Proyectos** desde `src/data/projects.ts`, con tecnologías, descripción, características y enlaces opcionales.
- **Sobre mí**, **habilidades**, **experiencia/educación**, **laboratorio** y **contacto** como secciones independientes.
- **Navbar adaptable**, selector de idioma, soporte para movimiento reducido y estados de foco visibles.
- **Tema visual oscuro** azul petróleo con acentos turquesa, cian y ámbar.

## Estructura del código

```text
src/
├── components/       Elementos reutilizables: navbar, botones, tarjetas e iconos
├── data/             Contenido tipado de proyectos, experiencia, habilidades y redes
├── i18n/             Configuración y traducciones español/inglés
├── sections/         Secciones principales de la página
├── three/            Escena 3D del hero y sus objetos
├── App.tsx           Orden de las secciones y pie de página
└── index.css         Tema, tokens, estilos base, utilidades y accesibilidad
public/
└── josue-profile.webp Fotografía recortada y optimizada para el hero
```

## Empezar en local

Necesitas Node.js y npm instalados. Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Vite mostrará la dirección local en la terminal (normalmente `http://localhost:5173`). Para preparar una versión de producción:

```bash
npm run build
npm run preview
```

Para revisar el estilo estático del código:

```bash
npm run lint
```

## Cómo personalizarlo

- **Colores y tipografía**: cambia los tokens `--color-*` de `src/index.css`. Algunos componentes también tienen clases Tailwind con colores hexadecimales para que sus estados visuales coincidan.
- **Proyectos**: agrega o edita entradas en `src/data/projects.ts` y sus textos en ambos archivos dentro de `src/i18n/locales/`.
- **Experiencia y estudios**: modifica `src/data/experience.ts`; los textos viven bajo `experience.items` en los archivos de idioma.
- **Habilidades**: actualiza `src/data/skills.ts`.
- **Redes**: edita `src/data/socialLinks.tsx`.
- **Fotografía**: reemplaza `public/josue-profile.webp` por una imagen propia optimizada y conserva esa ruta, o cambia `photoUrl` en `src/sections/Hero.tsx`.
- **Escena 3D**: empieza en `src/three/TechOrb.tsx`. `useFrame` anima objetos cada fotograma; `useMemo` conserva geometrías y datos de partículas entre renderizados. `src/three/Scene3D.tsx` monta el `<Canvas>` y provee un fallback cuando WebGL o el movimiento continuo no están disponibles.
- **Secciones**: cada componente en `src/sections/` controla su estructura y comportamiento. `src/App.tsx` determina el orden de aparición.

## Ruta de aprendizaje recomendada

1. Aprende **HTML semántico y CSS**: estructura de página, Flexbox, Grid, media queries y accesibilidad básica.
2. Aprende **JavaScript moderno**: módulos, arrays, objetos, funciones, promesas y eventos.
3. Aprende **TypeScript**: tipos, interfaces, uniones y tipado de propiedades.
4. Aprende **React**: componentes, props, estado, hooks y composición; después estudia enrutamiento si el proyecto crece.
5. Aprende **Tailwind CSS** leyendo las clases del markup y convierte estilos repetidos en componentes/tokens.
6. Aprende **animación de interfaz** con Motion y respeta `prefers-reduced-motion`.
7. Aprende **Three.js** con escenas, cámara, geometría, materiales y luces; luego React Three Fiber y Drei para declararlo desde React.
8. Aprende **Vite, npm, Git y despliegue** para ejecutar, compilar y publicar el sitio.

## Recursos oficiales

- [React: aprender](https://react.dev/learn)
- [TypeScript: Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Vite: guía](https://vite.dev/guide/)
- [Tailwind CSS: documentación](https://tailwindcss.com/docs)
- [Three.js: manual](https://threejs.org/manual/)
- [React Three Fiber: documentación](https://r3f.docs.pmnd.rs/)
- [Motion para React](https://motion.dev/docs/react)
- [i18next: documentación](https://www.i18next.com/)

## Cambios visuales recientes

- Se cambió la paleta verde por tonos azul petróleo y turquesa, con detalles cian y ámbar.
- Se ordenó la línea de tiempo en columnas explícitas: tarjetas alternadas, iconos centrados y contenido alineado con cada lado; en pantallas pequeñas queda en una sola columna legible.
- Se colocó la fotografía de perfil en el hero. El archivo WebP recorta el encuadre original a un cuadrado para que el rostro y el torso queden centrados en el marco circular.
- Se amplió la escena Three.js con órbitas de colores y halo pulsante, manteniendo la escena decorativa detrás del retrato.
- Se quitó del catálogo la ficha independiente “API REST con ASP.NET Core”; las referencias a la API que describen responsabilidades de la residencia se conservan.

## Scripts disponibles

| Comando | Uso |
| --- | --- |
| `npm run dev` | Servidor local con recarga rápida |
| `npm run build` | Comprobación TypeScript y compilación de producción |
| `npm run preview` | Vista local del build de producción |
| `npm run lint` | ESLint sobre el proyecto |
