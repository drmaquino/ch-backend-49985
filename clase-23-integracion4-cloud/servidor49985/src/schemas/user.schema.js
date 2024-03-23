export const userSchema = {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  foto: { type: String, required: true },
  rol: { type: String, required: true },
}