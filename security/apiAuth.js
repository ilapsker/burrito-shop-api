const authenticateKey = (req, res, next) => {
    let apiKey = req.header("x-api-key"); //Add API key to headers

    if (apiKey === process.env.TEST_API_KEY) {
        next();
    }
    else {
        //Reject request if API key doesn't match
        res.status(403).send({message: "Not authorized" });
      }
};

module.exports = { authenticateKey };  