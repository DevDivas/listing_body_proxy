const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/rooms/:roomId', express.static(path.join(__dirname, '../public')));

//---BOOKINGS---//
app.get('/rooms/:id/bookings', (req, res) => {
  axios.get(`http://ec2-54-172-249-154.compute-1.amazonaws.com/rooms/${req.params.id}/bookings`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/rooms/:id/room', (req, res) => {
  axios.get(`http://ec2-54-172-249-154.compute-1.amazonaws.com/rooms/${req.params.id}/room`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post('/rooms/:id/bookings', (req, res) => {
  axios.post(`http://ec2-54-172-249-154.compute-1.amazonaws.com/rooms/${req.params.id}/bookings`, {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    }).then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
//---/BOOKINGS---//

app.get('/rooms/:roomId/x', (req, res) => {
  const roomId = req.params.roomId;
  axios.get(`http://ec2-18-222-100-246.us-east-2.compute.amazonaws.com/rooms/${roomId}/x`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get('/rooms/:room_id/reviews', (req, res) => {
  axios.get(`http://ec2-18-222-90-155.us-east-2.compute.amazonaws.com/rooms/${req.params.room_id}/reviews`)
    .then((response) => {
      res.status(200).send(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get('/rooms/:roomId/pics', (req, res) => {
  const roomId = Number(req.params.roomId);

  axios.get(`http://ec2-18-206-94-95.compute-1.amazonaws.com/rooms/${roomId}/pics`)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log('proxy get error');
      res.status(500).send();
    });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
