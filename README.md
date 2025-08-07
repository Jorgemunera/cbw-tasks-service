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

1. Clonar el repositorio:

    git clone https://github.com/Jorgemunera/cbw-tasks-service
    cd tu-repo

2. Crear el archivo `.env` desde el ejemplo:

    cp .env.example .env

3. Construir e iniciar los contenedores:

    docker-compose up --build

> Este comando construye la imagen y levanta 4 servicios:
> - API (`http://localhost:3000`)
> - Worker (procesador de tareas en segundo plano)
> - MongoDB (`localhost:27017`)
> - RabbitMQ (`http://localhost:15672`, user: `admin`, pass: `admin`)

> Nota: la terminal quedará mostrando los logs de todos los servicios.

## 🧪 Uso y flujo funcional

1. Crear una tarea usando el endpoint `POST /tasks`
2. Consultar tareas con `GET /tasks` → estado inicial `pending`
3. Si la tarea tiene un `due_date` próximo o vencido, el proceso automático (cada 2 minutos) notificará por consola.
4. Para procesar una tarea, usar `POST /tasks/{id}/schedule`. Cambia a `in-progress`, y tras 30 segundos pasa a `completed`.
5. Consultar nuevamente la tarea con `GET /tasks` para ver los cambios de estado.
6. Generar reporte con `POST /tasks/report/completed` → tarda 3 minutos y se imprime en consola.
7. Importante: El proceso automático solo notifica. El procesamiento debe hacerse manualmente.

## 📘 Documentación del API

La documentación del API esta muy detallada con Swagger.
Disponible en:

    http://localhost:3000/api-docs

Incluye todos los endpoints, esquemas y ejemplos.

## 🐞 Logs en tiempo real

Para ver los logs por separado:

    docker logs -f app
    docker logs -f worker

## 📬 Contacto

Jorge Munera  
gerjo9211@hotmail.com  
LinkedIn: https://www.linkedin.com/in/jorgemunera/
