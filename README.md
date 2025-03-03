# Gamer Reviews

**Gamer Review** es una aplicación de análisis de videojuegos que permite a los usuarios explorar y leer reseñas detalladas de videojuegos, así como ver capturas de pantalla. LEsta parte del proyecto corresponde al frontend, desarrollado con Next.js, mientras que el backend es gestionado por Strapi y se encuentra desplegado en otro repositorio y en Railway.

## Características

- **Reseñas de videojuegos:**  Explora reseñas detalladas de videojuegos.
- **Comentarios:** Los usuarios registrados pueden dejar comentarios en las reseñas.
- **Autenticación:** Registro e inicio de sesión de usuarios.
- **Validación de datos:**  La validación de formularios de registro y comentarios es manejada por el backend (Strapi).

## Tecnologías Utilizadas

- **Next.js:** Framework de React para la parte del frontend.
- **Tailwind CSS:** Framework de CSS para el diseño y estilos.
- **Strapi:** CMS de código abierto utilizado para gestionar y publicar las reseñas de videojuegos.
- **RAWG API:** API para obtener información adicional sobre los videojuegos, como capturas de pantalla.

## Estructura del Proyecto

  - **lib/**: Contiene hooks, servicios, y funciones auxiliares.
  - **pages/**: Contiene las páginas de Next.js.
  - **components/**: Componentes reutilizables en toda la aplicación.
  
## Instalación y configuración

### 1. Clona el repositorio

Primero, clona este repositorio en tu máquina local utilizando Git:

```bash
git clone https://github.com/tu-usuario/game-reviews.git
```
### 2. Instala las dependencias
Navega a la carpeta del proyecto clonado y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```
Este comando instalará automáticamente las dependencias tanto para el backend (Strapi) como para el frontend (Next.js).

### 3. Variables de entorno
Crea un archivo .env.local en la raíz del proyecto con la siguiente variable de entorno, donde deberás proporcionar la URL del backend (Strapi) que has desplegado por separado:

```bash
NEXT_PUBLIC_API_URL="https://tu-backend-en-railway.com/api"
NEXT_PUBLIC_RAWG_API_KEY="yourapikey"
```
Configura tu propio JWT_SECRET para mayor seguridad.
Reemplaza yourapikey con tu clave de API de RAWG y ajusta la URL del backend a donde esté desplegado tu servidor de Strapi.

### 4. Compilación y ejecución
Una vez que las dependencias estén instaladas y las variables de entorno configuradas, puedes proceder a construir y ejecutar el proyecto:

4.1 Backend (Strapi)
Para construir y ejecutar el backend de Strapi:
```bash
npm run build:backend
npm run start:backend
```


## Vista Previa
Aquí hay una vista previa de cómo se ve la aplicación:

**Pagina inicial**
![main](https://github.com/user-attachments/assets/2bc0f81c-eea9-43f7-9053-e833f2dc202c)

**Acerca de la pagina**
![about](https://github.com/user-attachments/assets/757027b5-4b75-44ac-b48c-2fe2c2ca459b)

**Pagina con las reseñas** 
![reviews](https://github.com/user-attachments/assets/41b319ae-dbc4-4c96-9a2a-77f925466619)

Reseña del juego
![Persona 5 Royal](https://github.com/user-attachments/assets/c4e5ad31-4ef2-4970-93fa-1c9037b651c9)

**Inicio de sesión**  
![signin](https://github.com/user-attachments/assets/4d22ad45-ffbd-44d2-8683-10efd652643f)

**Registro**  
![signup](https://github.com/user-attachments/assets/b921105b-8448-4790-985d-8c555ed6c79e)

