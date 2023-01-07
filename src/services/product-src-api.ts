import { IProductSource } from './model/product-src';
import { DummyApi } from './dummy-api-src';

export class ProductSourceApi {
  private static instance: IProductSource | null = null;

  private constructor() {
    // It has to be private (see singleton)
  }

  static setInstance<Type extends IProductSource>(ctor: { new (): Type }): IProductSource {
    ProductSourceApi.instance = new ctor();
    return ProductSourceApi.instance; 
  };

  static getInstance(): IProductSource {
    if (ProductSourceApi.instance === null) {
      ProductSourceApi.setInstance(DummyApi);
    }; 
    // Because we already set it with setInstance call
    return ProductSourceApi.instance as IProductSource;
  }
}