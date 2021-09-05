class AdditionalDelivery {
  errorHandler = (err, req, res, next) => {
    return res.status(500).json({ message: err });
  };
  notFound = (req, res) => {
    return res.status(404).json({ message: "NOT_FOUND" });
  };
};
module.exports = AdditionalDelivery;