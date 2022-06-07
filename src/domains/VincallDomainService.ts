import {
  IEntityRepository,
  createEntityRepository,
  EntityId,
  QueryParam
} from "@comm100/framework/Infrastructure/EntityRepository";
import { Base } from "@comm100/framework/Domain/Base";
import { Entity } from "@comm100/framework/Domain/Bo/Entity";
import { apiDomain } from "../config";
import { sendHttpRequest } from "@comm100/framework/Infrastructure/Network";

export interface IVincallDomainService<T> {
  get(id?: EntityId): Promise<T>;
  getList(params?: QueryParam): Promise<T[]>;
  enable(id?: EntityId): Promise<T>;
  disable(id?: EntityId): Promise<T>;
  reOrder(ids: EntityId[]): Promise<T>;
  delete(id: EntityId): Promise<void>;
  update(data: any): Promise<any>;
  getPageList(params: QueryParam): Promise<any>;
}

export interface VincallDomainServiceProps {
  url: string;
  token?: string;
}

export class VincallDomainService<T extends Entity> extends Base
  implements IVincallDomainService<T> {
  private vincallRepo: IEntityRepository<T>;
  url: string;

  constructor({ url, token }: VincallDomainServiceProps) {
    super();
    this.url = `${apiDomain}${url}`;
    this.token = token;
    this.vincallRepo = createEntityRepository({
      url: this.url,
      token
    });
    this.vincallRepo.getUrl = this.getUrl.bind(this);
  }
  async getPageList(params: QueryParam): Promise<any> {
    return (await sendHttpRequest({
      url: this.url,
      method: "GET",
      params,
      auth: this.token
    })).data;
  }

  get(id?: EntityId) {
    return this.vincallRepo.get(id);
  }

  update(data: any) {
    return this.vincallRepo.update(undefined, data);
  }

  getList(params?: QueryParam) {
    return this.vincallRepo.getList(params);
  }

  delete(id: EntityId): Promise<void> {
    return this.vincallRepo.delete(id);
  }

  private getUrl(id?: EntityId) {
    let apiUrl = this.url;
    if (id) {
      apiUrl = `${apiUrl}/${id}`;
    }
    return apiUrl;
  }

  enable(id?: EntityId): Promise<T> {
    return this.vincallRepo.execute(`${this.getUrl(id)}:enable`, {});
  }

  disable(id?: EntityId): Promise<T> {
    return this.vincallRepo.execute(`${this.getUrl(id)}:disable`, {});
  }

  reOrder(ids: EntityId[]): Promise<T> {
    const url = `${this.url}:reorder`;
    return this.vincallRepo.execute(url, ids);
  }
}
