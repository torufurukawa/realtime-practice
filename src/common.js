var client;

function connect(clientId, onSuccess, onFailure){
    client = new Paho.MQTT.Client(config.sango_server, clientId);
    client.connect({userName: config.sango_user, password: config.sango_pass,
                    onSuccess:onSuccess, onFailure: onFailure});
}

function publish(data){
    var topic = config.sango_user + "/data";
    message = new Paho.MQTT.Message(data);
    message.destinationName = topic;
    client.send(message);
}

// メッセージが到着したら呼び出されるコールバック関数
 function onMessageArrived(message) {
     console.log("onMessageArrived:"+message.payloadString);
 }

function subscribe(callback){
    // コールバック関数を登録します
    client.onMessageArrived = callback;

    var topic = config.sango_user + "/data";
    client.subscribe(topic);
}
