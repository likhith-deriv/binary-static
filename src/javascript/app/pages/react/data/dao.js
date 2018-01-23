import BinarySocket from '../../../base/socket';

const DAO = (() => {
    const getPayoutCurrencies = () => BinarySocket.send({ payout_currencies: 1 });

    const getWebsiteStatus = () => BinarySocket.send({ website_status: 1 });

    const getTicks = (symbol, cb) => BinarySocket.send({ ticks: symbol, subscribe: 1 }, { callback: cb });

    return {
        getPayoutCurrencies,
        getWebsiteStatus,
        getTicks,
    };
})();

module.exports = DAO;
