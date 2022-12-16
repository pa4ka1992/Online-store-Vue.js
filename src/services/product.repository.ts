import { IProductSource } from './product-source';
import { DummyApi } from './dummy-api-source';

export class ProductRepository {
  private static instance: IProductSource | null = null;

  private constructor() {
    // It has to be private (see singleton)
  }

  static setInstance<Type extends IProductSource>(ctor: { new (): Type }): IProductSource {
    ProductRepository.instance = new ctor();
    return ProductRepository.instance; 
  };

  static getInstance(): IProductSource {
    if (ProductRepository.instance === null) {
      ProductRepository.setInstance(DummyApi);
    }; 
    // Because we already set it with setInstance call
    return ProductRepository.instance as IProductSource;
  }
}