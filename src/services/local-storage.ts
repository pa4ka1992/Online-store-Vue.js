const localPrefix = '__online_store';

export class LocalStorageApi {
  private static instance: LocalStorageApi | null = null;

  private constructor() {
    // It has to be private
  }

  static getInstance(): LocalStorageApi {
    if (LocalStorageApi.instance === null) { 
      LocalStorageApi.instance = new LocalStorageApi();
      LocalStorageApi.instance.init(); 
    }
    return LocalStorageApi.instance;
  }

  private loadedData: Record<string, unknown> = {};

  init() {
    this.loadData();
  }

  loadData() {
    const item = window.localStorage.getItem(localPrefix);
    if (item !== null) {
      this.loadedData = JSON.parse(item);
    }
  }

  saveData() {
    window.localStorage.setItem(localPrefix, JSON.stringify(this.loadedData));
  }

  getProperty(name: string) {
    return this.loadedData[name];
  }

  setProperty(name: string, value: unknown) {
    this.loadedData[name] = value;
    this.saveData();
  }
}