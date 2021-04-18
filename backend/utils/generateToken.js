const jwt = require("jsonwebtoken");

// const generateToken = (id) => {
//   const token = jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
//   return token;
// };
const generateToken = function () {
  // here we set what field will store on jwt for researve data
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

module.export = generateToken;
