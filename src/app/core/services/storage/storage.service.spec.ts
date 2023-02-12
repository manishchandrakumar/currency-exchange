import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    service = new StorageService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setStorage', () => {
    it('should set the data in local storage', () => {
      const key = 'test_key';
      const data = { message: 'hello world' };
      service.setStorage(key, data);
      expect(localStorage.getItem(key)).toEqual(JSON.stringify(data));
    });
  });

  describe('getStorage', () => {
    it('should retrieve the data from local storage', () => {
      const key = 'test_key';
      const data = { message: 'hello world' };
      localStorage.setItem(key, JSON.stringify(data));
      expect(service.getStorage(key)).toEqual(data);
    });
  });
});
