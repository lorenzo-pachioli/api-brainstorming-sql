# Api for Brainstorming

## Endpoints: 

|   Endpoint                  |   Method      |    Description                              |
|-----------------------------|---------------|---------------------------------------------|
| /login                      |	POST          |	Permite abrir una sesión y retorna un JWT.  |
| /projects/:id               |	GET           |	Recupera un Proyecto                        |
| /projects/:id/epics         |	GET           |	Recupera las Épicas de un Proyecto          |
| /epics                      |	GET           |	Recupera un listado de Épicas	              |
| /epics/:id                  |	GET           |	Recupera una Épica	                        |
| /epics/:id/stories          |	GET           |	Recupera las Stories de una Épica	          |
| /stories/                   |	GET           |	Recupera un listado de Stories	            |
| /stories/:id                |	GET           |	Recupera una Story	                        |
| /stories/:id/tasks          |	GET           |	Recupera las tareas de una Story	          |
| /tasks/                     |	GET           |	Recupera un listado de Tareas	              |
| /tasks/:id                  |	GET           |	Recupera una Tarea	                        |
| /tasks                      |	POST          |	Crea una nueva Tarea	                      |
| /tasks/:id                  |	PUT/PATCH     | 	Modifica una Tarea	                      |
| /users                      |	GET           |	Recupera un listado de Users	              |
| /users/:_id                 |	GET           |	Recupera un User (_id es un OID)	          |

___
