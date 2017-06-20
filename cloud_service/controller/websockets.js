const WebSocket = require('ws');
const mongo = require("../model/mongo.js");

const wss = new WebSocket.Server({ port: 8080 });

var telemetry = {};
var count = 0;

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(packet) {

    var data = JSON.parse(packet);

    if(mongo.collection) {

        if(data.name) {
          telemetry[data.name] = data;
        } else

        if(data.family) {
          telemetry[data.family] = data;
        }

        count++;

        if(count > 400) {

          db.collection.insertOne(telemetry, function(err, res) {
            if(err) console.log(err);
          });

        }

        console.log(telemetry);
    }


    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(packet);
      }
    });

  });

});
