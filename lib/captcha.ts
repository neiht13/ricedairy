// utils/captcha.ts
import jwt from 'jsonwebtoken';

const CAPTCHA_SECRET_KEY = process.env.CAPTCHA_SECRET_KEY || 'your_secret_key_here'; // Thay thế bằng khóa bí mật của bạn

// Hàm tạo câu hỏi CAPTCHA và mã hóa đáp án
export const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1; // Số thứ nhất từ 1 đến 10
  const num2 = Math.floor(Math.random() * 10) + 1; // Số thứ hai từ 1 đến 10
  const operator = ['+', '-'][Math.floor(Math.random() * 2)]; // Chọn phép tính ngẫu nhiên

  let question = '';
  let answer = 0;

  if (operator === '+') {
    question = `${num1} + ${num2} = ?`;
    answer = num1 + num2;
  } else {
    if(num1 > num2) {
      question = `${num1} - ${num2} = ?`;
      answer = num1 - num2;
    } else {
      question = `${num2} - ${num1} = ?`;
      answer = num2 - num1;
    }
  }

  // Tạo token chứa đáp án
  const token = jwt.sign({ answer }, CAPTCHA_SECRET_KEY, { expiresIn: '10m' }); // Token có hiệu lực trong 10 phút

  return { question, token };
};

// Hàm xác minh đáp án CAPTCHA
export const verifyCaptcha = (token: string, userAnswer: number) => {
  try {
    const decoded = jwt.verify(token, CAPTCHA_SECRET_KEY) as { answer: number };
    return decoded.answer === userAnswer;
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return false;
  }
};
