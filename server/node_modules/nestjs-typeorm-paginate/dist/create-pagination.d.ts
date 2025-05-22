import { IPaginationMeta, IPaginationOptionsRoutingLabels, ObjectLiteral } from './interfaces';
import { Pagination } from './pagination';
export declare function createPaginationObject<T, CustomMetaType extends ObjectLiteral = IPaginationMeta>({ items, totalItems, currentPage, limit, route, metaTransformer, routingLabels, }: {
    items: T[];
    totalItems?: number;
    currentPage: number;
    limit: number;
    route?: string;
    metaTransformer?: (meta: IPaginationMeta) => CustomMetaType;
    routingLabels?: IPaginationOptionsRoutingLabels;
}): Pagination<T, CustomMetaType>;
