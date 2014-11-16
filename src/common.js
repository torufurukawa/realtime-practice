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


function Sango(server, user, pass) {
    this.server = server;
    this.user = user;
    this.pass = pass;

    this.connect = function(clientId, onSuccess, onError) {
        this.client = new Paho.MQTT.Client(this.server, clientId);
        this.client.connect({userName: this.user, password: this.pass,
                             onSuccess:onSuccess, onFailure: onError});

    };

    this.publish = function(topic, data) {
        var message = new Paho.MQTT.Message(data);
        message.destinationName = topic;
        this.client.send(message);
    };

    this.subscribe = function(topic, callback) {
        this.client.onMessageArrived = function(message) {callback(message.payloadString);};
        this.client.subscribe(topic);
    };
};
