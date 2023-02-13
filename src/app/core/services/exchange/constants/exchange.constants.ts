export class ExchangeConstants {
  static readonly exchangeUrl = 'https://api.exchangerate.host';
  static readonly ExchangeHistoryDefaultDuration = '7';
  static readonly DefaultDateFormat = 'YYYY-MM-DD';
  static readonly HistoryDateFormat = 'DD/MM/YYYY';
  static readonly HistoryTimeFormat = 'hh:mm';
  static readonly HistoryStorageKey = 'conversionHistory';
  static readonly DefaultHistoryViewType = 'table';
  static readonly exchangeHistoryColumns = ['date', 'exchangeRate'];
  static readonly exchangeStatisticsColumns = ['statistics', 'value'];
  static readonly ConversionHistoryColumns = ['date', 'event', 'actions'];
}
