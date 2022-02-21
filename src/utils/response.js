export function getPagination(headers) {
  return {
    page: parseInt(headers['x-pagination-page']),
    limit: parseInt(headers['x-pagination-limit']),
    total: parseInt(headers['x-pagination-total'])
  }
}