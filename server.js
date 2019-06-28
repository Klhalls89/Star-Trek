const express = require('express');
const app = express(); 
app.listen(3000, () => {
 console.log(`App is running on 3000`)
});

app.get('/', function(request, response){
  response.status(200).json('Engage!')
});

