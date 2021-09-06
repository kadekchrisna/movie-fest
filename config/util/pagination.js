const util = {
    defaultPaginate: (baseFilter) => {
        if (baseFilter.limit <= 0) {
            baseFilter.limit = 10
        }

        if (baseFilter.page <= 0) {
            baseFilter.page = 1
        }

        if (baseFilter.page > 0) {
            baseFilter.offset = (baseFilter.page - 1) * baseFilter.limit
        }

        return baseFilter
    },
    paginate: (param) => {
        return {
            meta: {
                limit: param.limit,
                page: param.page,
            },
            data: param.data,
          }
    }
};

module.exports = {
    util,
};
  