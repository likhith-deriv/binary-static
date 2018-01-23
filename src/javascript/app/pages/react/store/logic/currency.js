import DAO from '../../data/dao';
import { isCryptocurrency } from '../../../../common/currency';
import { localize } from '../../../../../_common/localize';

const getCurrencies = () => DAO.getPayoutCurrencies().then(r => {
    const fiat   = [];
    const crypto = [];

    r.payout_currencies.forEach((currency) => {
        (isCryptocurrency(currency) ? crypto : fiat).push(currency);
    });

    return [
        { [localize('Fiat Currency') ]: fiat },
        { [localize('Cryptocurrency')]: crypto },
    ];
});

export default getCurrencies;
