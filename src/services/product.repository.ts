import { IProductSource } from './product-source';

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
    if (ProductRepository.instance === null) throw new Error('Product source was not defined!'); 
    return ProductRepository.instance;
  }
}