import * as bcrypt from 'bcrypt'

export const passwordHash = async (password: string): Promise<string> => bcrypt.hash(password, 10)
