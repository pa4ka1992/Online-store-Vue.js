import { IProductSource } from './product-source';

export class ProductRepository {
  private static instance: IProductSource | null = null;

  private constructor() {
    // It has to be private (see singleton)
  }

  static getInstance(): IProductSource {
    if (ProductRepository.instance === null) {
      throw new Error('Not implemented');
      // ProductRepository.instance = new Type();
    }
    return ProductRepository.instance;
  }
}