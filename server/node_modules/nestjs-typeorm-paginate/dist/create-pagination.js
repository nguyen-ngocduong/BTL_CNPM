"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginationObject = void 0;
const pagination_1 = require("./pagination");
function createPaginationObject({ items, totalItems, currentPage, limit, route, metaTransformer, routingLabels, }) {
    const totalPages = totalItems !== undefined ? Math.ceil(totalItems / limit) : undefined;
    const hasFirstPage = route;
    const hasPreviousPage = route && currentPage > 1;
    const hasNextPage = route && totalItems !== undefined && currentPage < totalPages;
    const hasLastPage = route && totalItems !== undefined && totalPages > 0;
    const symbol = route && new RegExp(/\?/).test(route) ? '&' : '?';
    const limitLabel = routingLabels && routingLabels.limitLabel
        ? routingLabels.limitLabel
        : 'limit';
    const pageLabel = routingLabels && routingLabels.pageLabel ? routingLabels.pageLabel : 'page';
    const routes = totalItems !== undefined
        ? {
            first: hasFirstPage ? `${route}${symbol}${limitLabel}=${limit}` : '',
            previous: hasPreviousPage
                ? `${route}${symbol}${pageLabel}=${currentPage - 1}&${limitLabel}=${limit}`
                : '',
            next: hasNextPage
                ? `${route}${symbol}${pageLabel}=${currentPage + 1}&${limitLabel}=${limit}`
                : '',
            last: hasLastPage
                ? `${route}${symbol}${pageLabel}=${totalPages}&${limitLabel}=${limit}`
                : '',
        }
        : undefined;
    const meta = {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: currentPage,
    };
    const links = route ? routes : undefined;
    if (metaTransformer)
        return new pagination_1.Pagination(items, metaTransformer(meta), links);
    // @ts-ignore
    return new pagination_1.Pagination(items, meta, links);
}
exports.createPaginationObject = createPaginationObject;
