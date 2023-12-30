import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const SALT_RANDOMS = 8;

const createHash = async (password: string) => {
	const saltGenerated = genSaltSync(SALT_RANDOMS);
	const hash = hashSync(password, saltGenerated);

	return hash;
};

const verifyPassword = async (password: string, hashPassword: string) => {
	const compare = compareSync(password, hashPassword);

	return compare;
};

export const passwordCrypt = { createHash, verifyPassword };
