import * as bcrypt from 'bcrypt'

export const passwordCompare = async (password: string, password2: string): Promise<boolean> => bcrypt.compare(password, password2)

export const passwordHash = async (password: string): Promise<string> => bcrypt.hash(password, 10)
