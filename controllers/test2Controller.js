// controllers/test2Controller.js
import axios from 'axios';
export function getTest2(req, res) {
    //axios get to jsonplaceholder
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
        console.log("GET /test2 response: 200 OK");
        res.send(response.data);
    })
    .catch(error => {
        console.error("GET /test2 response: 500 Internal Server Error");
        res.status(500 ).send(error);
    });
}
