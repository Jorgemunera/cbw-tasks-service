# 🧠 Microservicio de Gestión y Programación de Tareas

Microservicio backend desarrollado en Node.js para gestionar tareas, programarlas para ejecución asíncrona con RabbitMQ, y generar reportes automáticos. Incluye documentación Swagger para facilitar pruebas y exploración de endpoints.

## 🚀 Características principales

- CRUD de tareas
- Programación diferida de tareas mediante cola de mensajes (RabbitMQ)
- Notificaciones automáticas por consola de tareas próximas a vencer o vencidas
- Generación de reportes de tareas completadas
- Documentación interactiva con Swagger en ruta `/api-docs`

## 🧰 Tecnologías utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- RabbitMQ
- Docker + Docker Compose
- Joi (validación)
- Swagger (documentación)
- ESLint

## ⚙️ Requisitos previos

### Común para todos los sistemas (Windows, Linux, macOS)

- Docker
- Docker Compose
- Git

### Opcional para correr sin Docker

- Node.js >= 18
- npm

## 📥 Instalación y ejecución del proyecto

Sigue estos pasos para levantar el entorno completo:

1. Clonar el repositorio:

```
git clone https://github.com/Jorgemunera/cbw-tasks-service
cd cbw-tasks-service
```

2. Crear el archivo `.env` desde el ejemplo:

```
cp .env.example .env
```

3. Construir e iniciar los contenedores:

```
docker-compose up --build
```

> Este comando construye la imagen y levanta 4 servicios:
> - API (`http://localhost:3000`)
> - Worker (procesador de tareas en segundo plano)
> - MongoDB (`localhost:27017`)
> - RabbitMQ (`http://localhost:15672`, user: `admin`, pass: `admin`)

> ⚠️ La terminal quedará mostrando los logs de todos los servicios, incluyendo el worker que procesa tareas.

## 🧪 Uso y flujo funcional

Una vez el sistema esté en marcha, te recomendamos probar cada funcionalidad utilizando la documentación Swagger disponible (ver más abajo). Esto te permitirá ejecutar las peticiones fácilmente y observar el comportamiento en tiempo real desde la terminal.

Flujo funcional típico:

1. Crear una tarea usando el endpoint `POST /tasks`
2. Consultar tareas con `GET /tasks` → estado inicial `pending`
3. Si la tarea tiene un `due_date` próximo (en las siguientes 24h) o ya vencido, el proceso automático que corre cada **2 minutos** imprimirá una notificación por consola.
4. Para procesar una tarea, usa `POST /tasks/{id}/schedule`. El estado cambiará a `in-progress`, y tras **30 segundos** pasará a `completed`.
5. Puedes consultar el estado actualizado en cualquier momento con `GET /tasks`
6. Para generar un reporte de tareas completadas, usa `POST /tasks/report/completed`. El resultado se imprimirá en consola luego de **3 minutos**.
7. ⚠️ Importante: El proceso automático **solo notifica** tareas vencidas o próximas a vencer. El encolamiento para procesamiento debe realizarse manualmente mediante el endpoint correspondiente.

## 📘 Documentación del API

Toda la documentación de endpoints, esquemas, validaciones y respuestas está disponible con Swagger en:

```
http://localhost:3000/api-docs
```

Puedes probar directamente cada funcionalidad desde esa interfaz.

## 🐞 Logs en tiempo real

Puedes seguir el comportamiento del sistema desde la terminal donde ejecutaste `docker-compose up --build`. Alternativamente, puedes usar estos comandos para ver los logs por separado:

```
docker logs -f app
docker logs -f worker
```

Estos logs mostrarán el procesamiento de tareas, notificaciones, errores y generación de reportes.

## 📬 Contacto

Jorge Munera  
gerjo9211@hotmail.com  
LinkedIn: https://www.linkedin.com/in/jorgemunera/
