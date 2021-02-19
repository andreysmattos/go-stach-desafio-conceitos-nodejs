const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  
  const id = uuid();
  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.status(201).json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;
  let index = repositories.findIndex(repository => repository.id === id);
  if(index === -1) return response.status(400).send(); 

    repositories[index] = {
      ...repositories[index],
      title,
      url,
      techs      
    }
    

    return response.json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  let index = repositories.findIndex(repository => {
    return repository.id === id
  });

  if( index === -1) return response.status(400).send();

  repositories.splice(index, 1);
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
    
  let index = repositories.findIndex(repository => repository.id === id);
  

  if(index === -1 ) return response.status(400).send();

  repositories[index] = {...repositories[index], likes: ++repositories[index].likes};

  return response.status(201).json(repositories[index]);
  
});

module.exports = app;
