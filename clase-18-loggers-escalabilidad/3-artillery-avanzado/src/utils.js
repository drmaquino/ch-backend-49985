import bcrypt from 'bcrypt'

export async function createHash(password) {
    const salts = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salts)
}

export async function passwordValidation(user, password) {
    // return bcrypt.compare(password, user.password)
    return password === user.password
}
