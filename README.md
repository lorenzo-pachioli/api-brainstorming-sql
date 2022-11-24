# Api for Brainstorming

## Endpoints: 

|   Endpoint                  |   Method      |    Description                              |
|-----------------------------|---------------|---------------------------------------------|
| /login                      |	POST          |	Permite abrir una sesión y retorna un JWT.  |
| /projects                   |	POST          |	Permite crear un Projecto                   |
| /projects                   |	GET           |	Recupera todos los Projectos                |
| /projects/:id               |	GET           |	Recupera un Proyecto                        |
| /projects/:id               |	DELETE        |	Borra un Proyecto                           |
| /projects/:id/epics         |	GET           |	Recupera las Épicas de un Proyecto          |
| /epics                      |	POST          |	Permite crear una Épica	                    |
| /epics                      |	GET           |	Recupera un listado de Épicas	              |
| /epics/:id                  |	GET           |	Recupera una Épica	                        |
| /epics/:id                  |	DELETE        |	Borra una Épica	                            |
| /epics/:id/stories          |	GET           |	Recupera las Stories de una Épica	          |
| /stories                    |	POST          |	Permite crear una Story	                    |
| /stories                    |	GET           |	Recupera un listado de Stories	            |
| /stories/:id                |	GET           |	Recupera una Story	                        |
| /stories/:id                |	DELETE        |	Borra una Story	                            |
| /stories/:id/tasks          |	GET           |	Recupera las tareas de una Story	          |
| /tasks                      |	POST          |	Crea una nueva Tarea	                      |
| /tasks                      |	GET           |	Recupera un listado de Tareas	              |
| /tasks/:id                  |	GET           |	Recupera una Tarea	                        |
| /tasks/:id                  |	PUT           | Modifica una Tarea	                        |
| /tasks/:id                  |	DELETE        | Borra una Tarea	                            |
| /users                      |	POST          |	Permite crear un user	                      |
| /users                      |	PUT           |	Permite modificar un user	                  |
| /users                      |	GET           |	Recupera un listado de Users	              |
| /users/:_id                 |	GET           |	Recupera un User (_id es un OID)	          |
| /users/:_id                 |	DELETE        |	Borra un User (_id es un OID)	              |

___

## Status codes:

|   Code                      |    Description                              |
|-----------------------------|---------------------------------------------|
| 200                         |	Response ok                                 |
| 400                         |	Bad request (incorrect input info)          |
| 401                         |	Unauthorized (invalid token)                |
| 500                         |	Internal server error                       |

___
