# Desafío para Software Engineers

Nombre postulante: Santiago de Aguirre
Link a la app en producción: https://dev-challenge-kimche.vercel.app/

## Instrucciones

Debes crear un buscador de países consultando el [siguiente grafo](https://countries.trevorblades.com/). Este código contiene una base para seguir con la aplicación en React y ApolloClient. Queda a disposición tuya cualquier cambio, ya sea de estructura, estilo, etc.

Se espera que logres hacer una aplicación parecida a la del siguiente diagrama:

![image1](imgs/1.png)
![image2](imgs/2.png)

La funcionalidad y estructura debe ser igual, pero el diseño y variantes (por ejemplo, cambiar colores de las cosas) queda a tu gusto. **Considerar que el ícono al lado del nombre de cada país es el emoji**.

Además de esto, se espera que hagas deploy de tu app en el servicio que desees (Heroku, Netlify, AWS, Github Pages, etc).

## Consideraciones

- Se espera que uses buenas prácticas como gitflow (pull requests y commits), orden del código, estructura, eficiencia, etc.
- Puedes dejar comentarios de decisiones que tuviste que tomar y del por qué en este repositorio.
- Se va a considerar un buen diseño de UX/UI.

## Hints

Acá van algunas cosas que pueden ser útiles (o no 👀):

- [Gitignore](https://www.toptal.com/developers/gitignore)
- [GraphQL](https://www.howtographql.com/)
- [React](https://es.reactjs.org/)
- [Styled components](https://styled-components.com/docs/basics)
- [ApolloClient](https://www.apollographql.com/docs/react/)
- [Lodash](https://lodash.com/)
- [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Commitlint](https://commitlint.js.org/#/)
- [Eslint](https://eslint.org/)
- [Eslint airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
- [Husky](https://www.npmjs.com/package/husky)

## Respuesta a la pregunta abierta

Pregunta:
"La tabla que contiene la información correspondiente a la asistencia diaria de un niño en un colegio tiene 90 millones de filas. Todas las tablas del sistema existen en la misma BDD en MySQL. La lógica del backend que actualiza la información correspondiente al pasar la asistencia tiene un tiempo de servicio p95 de 10 segundos. El equipo está interesado en bajar este tiempo para mejorar la experiencia del usuario (y porque nos gusta pensar en Kimche como un Ferrari). ¿Qué propondrías para enfrentar el problema? Esta pregunta es abierta, no hay respuestas malas. Puedes proponer arquitectura, tecnologías, diseño, etc."

Respuesta:
Las soluciones a este problema pueden ser diversas. Se podría revisar la estructura misma de la BDD y optimizar las tablas que contienen la información necesaria, ya sea mejorando las queries que necesitamos o viendo la posibilidad de crear tablas más pequeñas por colegio, por ejemplo. 
De todas maneras, al usar una BDD relacional, nos encontramos con el problema de que las tablas crecen verticalmente demasiado y las queries, al revisar esa tabla, se pueden demorar mucho, como es el caso de la asistencia. Por lo mismo, otra posible solución seria en lugar de usar una base de datos relacional como MySQL, podríamos usar una base de datos no relacional como MongoDB. MongoDB se caracteriza por su habilidad de manejar grandes cantidades de datos y su estructura es menos rigida que MySQL. Una de las ventajas de esta tecnología es que divide las BDD muy grandes en BDDs más pequeñas y rápidas, mejorando la velocidad de las queries. 

De todas maneras hay varias preguntas que hacerse al enfrentarse al problema: ¿Queremos mantener la estructura relacional de nuestra BDD? ¿Estamos trabajando con data estática?. Si la respuesta a esas preguntas son no, entonces recomendaría implementar una base de datos no relacional, para mayor eficiencia y rapidez.