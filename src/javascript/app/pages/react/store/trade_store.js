import { observable, action } from 'mobx';
import DAO from '../data/dao';
import Client from '../../../base/client';
// import getCurrencies from './logic/currency';

export default class TradeStore {
    @action.bound init() {
        this._getCountry();
        this._getTicks();
        // if (!Client.get('currency')) {
        //     getCurrencies().then(currencies => {
        //         this.currencies = currencies;
        //     });
        // }
    }

    _getCountry() {
        DAO.getWebsiteStatus().then(r => {
            this.message = `Your country is: ${r.website_status.clients_country}`;
        });
    };

    _getTicks() {
        DAO.getTicks('frxEURUSD', (r) => {
            this.tick = `${new Date(r.tick.epoch * 1000).toUTCString()}: ${r.tick.quote}`;
        });
    };

    @action.bound handleChange(e) {
        const {name, value} = e.target;
        if (!this.hasOwnProperty(name)) { // eslint-disable-line
            throw new Error(`Invalid Argument: ${name}`);
        }
        this[name] = value;
    }

    @observable basis      = 'stake';
    @observable currency   = Client.get('currency');
    @observable currencies = ['USD', 'AUD', 'GBP', 'BTC'];
    @observable amount     = 5;

    // Duration
    @observable expiry_type   = 'duration';
    @observable duration      = 15;
    @observable duration_unit = 's';
    @observable expiry_date   = null;
    @observable expiry_time   = null;

    // Start Time
    // Barrier
    // Last Digit

    @observable message = '';
    @observable tick = '';
};
