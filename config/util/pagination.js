const util = {
    defaultPaginate: (baseFilter) => {
        if (baseFilter.Limit <= 0) {
            baseFilter.Limit = 10
        }

        if (baseFilter.Page > 0) {
            baseFilter.offset = (baseFilter.Page - 1) * baseFilter.Limit
        }

        return baseFilter
    }
};
module.exports = util;
  