const pagination = (data, page, pageSize) => {

    const defaultPageSize = 10;
    const startIndex = (page - 1) * (pageSize || defaultPageSize);
    const endIndex = startIndex + pageSize;
    const paginatedData = data?.slice(startIndex, endIndex);

    return paginatedData;
    
};

export default pagination;