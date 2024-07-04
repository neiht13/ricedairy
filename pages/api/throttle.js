// api/throttle.js

// Biến toàn cục để lưu trữ số lượng yêu cầu gần đây từ mỗi client
import {NextResponse} from "next/server";

const requestCounts = {};

// Hàm kiểm tra xem một client có vượt quá giới hạn yêu cầu không
const isRateLimited = (clientIp) => {
	const maxRequestsPerMinute = 2; // Số lượng yêu cầu tối đa cho phép trong một phút
	const requests = requestCounts[clientIp] || [];
	const now = Date.now();
	const windowStart = now - 60000; // 1 phút trước đó
	const recentRequests = requests.filter((timestamp) => timestamp > windowStart);
	if (recentRequests.length > maxRequestsPerMinute) {
		return true;
	}
	return false;
};

// Middleware để kiểm tra xem yêu cầu có bị giới hạn không
const throttleMiddleware = async (req, res, next) => {
	const clientIp = req?.headers && req?.headers['x-forwarded-for'] || req?.socket?.remoteAddress;
	console.log('clientIp', clientIp)
	if (isRateLimited(clientIp)) {
		res.status(429).json({ error: 'Too many requests' });
	} else {
		// Lưu trữ thời điểm của yêu cầu hiện tại
		if (!requestCounts[clientIp]) {
			requestCounts[clientIp] = [];
		}
		requestCounts[clientIp].push(Date.now());
		NextResponse.next();
	}
};

export default throttleMiddleware;
