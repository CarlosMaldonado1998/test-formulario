
# FORMULARIOS

Este proyecto es una prueba técnica que consiste en la creación de un sistema de formularios, desarrollado con React.js en el frontend, Supabase como base de datos y desplegado en Vercel.

La aplicación permite a los usuarios configurar formularios dinámicos, similares a Google Forms, para la recolección de datos en encuestas o formularios personalizados.


## 1. Demo

El proyecto está desplegado y disponible en la siguiente URL:

🔗 [PROYECTO EN VIVO](https://test-formulario.vercel.app/login)

Credenciales de acceso: 
correo: kardaniel1998@gmail.com
contraseña: admin

## 2. Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/CarlosMaldonado1998/test-formulario.git
cd test-formulario

```

2. Instalar dependencias

```bash
npm install 
```

3. Configurar las variables de entorno

Crea un archivo .env.local en la raíz del proyecto y agrega las credenciales necesarias para la integración con Supabase.

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Ejecutar el proyecto

```bash
npm install 
```

La aplicación estará disponible en http://localhost:3000/.
## 3. Dependencias
Para que el proyecto funcione correctamente, es necesario contar con las siguientes dependencias y configuraciones:

#### 🔑 Cuentas necesarias

1. Supabase:
- Se requiere tener una cuenta en Supabase para la gestión de la base de datos y autenticación.
- Crear un proyecto en Supabase para obtener las credenciales necesarias (URL y API Key).
#### Vercel:
- Para el despliegue automático del proyecto, es necesario tener una cuenta en Vercel.
- Vercel se integra con GitHub y permite el despliegue continuo al hacer push a la rama master del repositorio.




## 4. Estructura Base de Datos

El proyecto utiliza Supabase como base de datos y sigue la siguiente estructura:

📌 Tabla: forms

Almacena la información de los formularios creados.

``` sql
  CREATE TABLE forms (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  status BOOLEAN DEFAULT TRUE, -- TRUE significa activo, FALSE inactivo
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

📌 Tabla: questions_responses

Guarda las preguntas y respuestas asociadas a cada formulario.

``` sql
CREATE TABLE questions_responses (
  id SERIAL PRIMARY KEY,
  form_id INTEGER NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  type INTEGER NOT NULL,
  options JSONB,
  response TEXT,
  selected_option TEXT,
  selected_answers_multiple JSONB,
  status BOOLEAN DEFAULT TRUE, -- TRUE activo, FALSE inactivo
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```
## 5. Despliegue Continuo
El proyecto está configurado con despliegue continuo en Vercel. Esto significa que cada vez que se suben cambios a la rama master, el proyecto se autodespliega automáticamente en el entorno de producción.

###### 🔧 Configuración en Vercel
Se han definido las variables de entorno necesarias en Vercel para garantizar que la aplicación funcione correctamente con Supabase y otras configuraciones esenciales.
Vercel detecta automáticamente los cambios en el repositorio y ejecuta el despliegue sin necesidad de intervención manual.
###### 🌐 URL del Proyecto
El proyecto desplegado está disponible en: [FORMULARIOS](https://test-formulario.vercel.app/login)


## 6. Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando las siguientes tecnologías:

- React.js – Biblioteca para la construcción de interfaces de usuario.
- Next.js – Framework de React que facilita el desarrollo y el renderizado del lado del servidor (SSR).
- Supabase – Plataforma backend que proporciona autenticación, base de datos y almacenamiento.
- Vercel – Plataforma de despliegue para aplicaciones frontend.
- Material UI – Biblioteca de componentes para estilizar la interfaz de usuario con un diseño moderno y accesible.

