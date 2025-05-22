import { Repository, FindManyOptions, SelectQueryBuilder, ObjectLiteral, FindOptionsWhere } from 'typeorm';
import { Pagination } from './pagination';
import { IPaginationMeta, IPaginationOptions } from './interfaces';
export declare function paginate<T, CustomMetaType = IPaginationMeta>(repository: Repository<T>, options: IPaginationOptions<CustomMetaType>, searchOptions?: FindOptionsWhere<T> | FindManyOptions<T>): Promise<Pagination<T, CustomMetaType>>;
export declare function paginate<T, CustomMetaType = IPaginationMeta>(queryBuilder: SelectQueryBuilder<T>, options: IPaginationOptions<CustomMetaType>): Promise<Pagination<T, CustomMetaType>>;
export declare function paginateRaw<T, CustomMetaType extends ObjectLiteral = IPaginationMeta>(queryBuilder: SelectQueryBuilder<T>, options: IPaginationOptions<CustomMetaType>): Promise<Pagination<T, CustomMetaType>>;
export declare function paginateRawAndEntities<T, CustomMetaType = IPaginationMeta>(queryBuilder: SelectQueryBuilder<T>, options: IPaginationOptions<CustomMetaType>): Promise<[Pagination<T, CustomMetaType>, Partial<T>[]]>;
