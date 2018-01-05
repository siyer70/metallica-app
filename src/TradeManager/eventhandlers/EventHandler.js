import io from 'socket.io-client';
import myprocess from './../../common/config';

export default class EventHandler {
    constructor() {
        console.log("Notification server url:", myprocess.env.NOTIFICATION_SERVER_URL);
        this.socket = io(myprocess.env.NOTIFICATION_SERVER_URL);
        this.marketDataEventSubscribers = {};
        this.tradeEventCallback = undefined;
        let thisClass = this;
        this.tickers = {};
        this.tickers['AU'] = {code:"AU",name:"Gold",date:"2017-12-21T13:37:08.605Z",unit:"1 oz",currency:"USD",price:0};
        this.tickers['CU'] = {code:"CU",name:"Copper",date:"2017-12-21T13:37:08.605Z",unit:"1 mt",currency:"USD",price:0};
        this.tickers['ZN'] = {code:"ZN",name:"Zinc",date:"2017-12-21T13:37:08.605Z",unit:"1 mt",currency:"USD",price:0};
        this.tickers['AL'] = {code:"AL",name:"Aluminium",date:"2017-12-21T13:37:08.605Z",unit:"1 ",currency:"USD",price:0};
        this.socket.on('market data event', function(data) {
            let keys = Object.keys(thisClass.marketDataEventSubscribers);
            if(keys.length >0) {
                keys.forEach(key => {
                    let subCB = thisClass.marketDataEventSubscribers[key].callback;
                    let source = thisClass.marketDataEventSubscribers[key].source;
                    subCB(data, source);    
                });
            }
        });        
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
    
    subscribeForMarketDataEvents(name, cb, source) {
        this.marketDataEventSubscribers[name] = {callback: cb, source};
    }

    unsubscribeForMarketDataEvents(name) {
        delete this.marketDataEventSubscribers[name];
    }
} 