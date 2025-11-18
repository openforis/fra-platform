const regexEmail = /.+@.+/
const validEmail = (props: { email: string }): boolean => regexEmail.test(props.email)

export const RegExps = {
  validEmail,
}
