import { IPaginationLinks, IPaginationMeta, ObjectLiteral } from './interfaces';
export declare class Pagination<PaginationObject, T extends ObjectLiteral = IPaginationMeta> {
    /**
     * a list of items to be returned
     */
    readonly items: PaginationObject[];
    /**
     * associated meta information (e.g., counts)
     */
    readonly meta: T;
    /**
     * associated links
     */
    readonly links?: IPaginationLinks;
    constructor(
    /**
     * a list of items to be returned
     */
    items: PaginationObject[], 
    /**
     * associated meta information (e.g., counts)
     */
    meta: T, 
    /**
     * associated links
     */
    links?: IPaginationLinks);
}
