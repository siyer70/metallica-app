import io from 'socket.io-client';

export default class EventHandler {
    constructor() {
        this.socket = io('http://localhost:3050');
    }

    listenForConnectionEvents(cb) {
        this.socket.on('connect', function() {
            console.log("Connected to the server");
            cb('connect');
          });

        this.socket.on('disconnect', function() {
            console.log('Disconnected from the server');
            cb('disconnect');
        });
    }

    listenForTradeDataEvents(tradeEventCallback) {
        this.socket.on('trade event', function(data) {
            tradeEventCallback(data);
        });
    }

    listenForMarketDataEvents(marketDataEventCallback, source) {
        this.socket.on('market data event', function(data) {
            marketDataEventCallback(data, source);
        });
    }
} 