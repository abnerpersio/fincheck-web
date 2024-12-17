import { endpoints } from '../../infra/api';
import { Category } from '../entities/category';
import { HttpService } from './http-service';

export class CategoriesService {
  private readonly httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  list() {
    return this.httpService.get<Category[]>(endpoints.category.list);
  }
}
