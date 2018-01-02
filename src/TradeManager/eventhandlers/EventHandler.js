import io from 'socket.io-client';
import myprocess from './../../common/config';

export default class EventHandler {
    constructor() {
        console.log("Notification server url:", myprocess.env.NOTIFICATION_SERVER_URL);
        this.socket = io(myprocess.env.NOTIFICATION_SERVER_URL);
        this.marketDataEventCallback = undefined;
        this.tradeEventCallback = undefined;
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

    subscribeForTradeDataEvents(cb, source) {
        this.tradeEventCallback = cb;
        let thisClass = this;
        this.socket.on('trade event', function(data) {
            if(thisClass.tradeEventCallback!==undefined) {
                thisClass.tradeEventCallback(data, source);
            }
        });
    }

    unsubscribeForTradeDataEvents(cb, source) {
        this.tradeEventCallback = undefined;
    }
    
    subscribeForMarketDataEvents(cb, source) {
        this.marketDataEventCallback = cb;
        let thisClass = this;
        this.socket.on('market data event', function(data) {
            if(thisClass.marketDataEventCallback!==undefined) {
                thisClass.marketDataEventCallback(data, source);
            }
        });
    }

    unsubscribeForMarketDataEvents() {
        this.marketDataEventCallback = undefined;
    }
} 