import io from 'socket.io-client';
import myprocess from './../../common/config';

export default class EventHandler {
    constructor() {
        console.log("Notification server url:", myprocess.env.NOTIFICATION_SERVER_URL);
        this.socket = io(myprocess.env.NOTIFICATION_SERVER_URL);
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