var client;

function connect(clientId, onSuccess, onFailure){
    client = new Paho.MQTT.Client(config.sango_server, clientId);

    // connectします
    client.connect({userName: config.sango_user, password: config.sango_pass,
                    onSuccess:onSuccess, onFailure: onFailure});
}

connect(
  'operator',
  function(data){console.log('success'); console.log(data)},
  function(data){console.log('failure'); console.log(data)}
);
