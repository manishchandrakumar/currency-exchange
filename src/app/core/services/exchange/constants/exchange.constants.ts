export class ExchangeConstants {
  static readonly exchangeUrl = 'https://api.exchangerate.host/';
  static readonly ExchangeHistoryDefaultDuration = '7';
  static readonly DefaultDateFormat = 'YYYY-MM-DD';
  static readonly HisotyDateFormat = 'DD/MM/YYYY';
  static readonly HisotyTimeFormat = 'hh:mm';
  static readonly HisoryStorageKey = 'conversionHistory';
  static readonly exhangeHistoryColumns = ['date', 'exchangeRate'];
  static readonly exhangeStatisticsColumns = ['statistics', 'value'];
}
