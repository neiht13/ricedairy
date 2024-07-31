import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
  origin: '*', // Bạn có thể thay đổi thành domain cụ thể để bảo mật hơn
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Helper method to wait for middleware to execute before continuing
// And to throw an error when an error happens in middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
export { runMiddleware };
