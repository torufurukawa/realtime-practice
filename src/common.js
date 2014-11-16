function Sango(server, user, pass) {
    this.server = server;
    this.user = user;
    this.pass = pass;

    this.connect = function(clientId, onSuccess, onError) {
        this.client = new Paho.MQTT.Client(this.server, clientId);
        this.client.connect({userName: this.user, password: this.pass,
                             onSuccess:onSuccess, onFailure: onError});

    };

    this.publish = function(topic, data, retained) {
        var message = new Paho.MQTT.Message(data);
        message.destinationName = topic;
        message.retained = retained;
        this.client.send(message);
    };

    this.subscribe = function(topic, callback) {
        this.client.onMessageArrived = function(message) {
            callback(message.payloadString);
        };
        this.client.subscribe(topic);
    };
};
