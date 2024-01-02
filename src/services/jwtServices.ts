import { sign, verify } from 'jsonwebtoken';

export interface IJWTDataProps {
	id: string
}

const signToken = async (data: IJWTDataProps) => {
	if (!process.env.JWT_SECRET) {
		return 'JWT_SECRET_NOT_FOUND';
	}

	const jwt = sign(data, process.env.JWT_SECRET, {
		expiresIn: '24h'
	});

	return jwt;
};

const verifyToken = async (token: string) => {

	if (!process.env.JWT_SECRET) {
		return 'JWT_SECRET_NOT_FOUND';
	}

	try {
		const decoded = verify(token, process.env.JWT_SECRET);

		if (typeof decoded === 'string') {
			return 'JWT_TOKEN_INVALID';
		}

		return decoded;

	} catch (error) {
		return 'JWT_TOKEN_INVALID';
	}
};

export const jwtServices = { signToken, verifyToken };