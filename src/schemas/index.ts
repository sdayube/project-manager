import * as yup from 'yup';

export const signInFormSchema = yup.object().shape({
  username: yup.string().required('Usuário obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

export const createAccountFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  username: yup
    .string()
    .required('Usuário obrigatório')
    .min(3, 'O nome de usuário deve possuir um mínimo de 3 caracteres')
    .matches(
      /^[a-zA-Z0-9]+$/,
      'O nome de usuário deve possuir apenas letras e números',
    ),

  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'A senha deve possuir um mínimo de 6 caracteres'),
  passwordConfirmation: yup
    .string()
    .required('Confirmação de senha obrigatória'),
});

export const upsertProjectFormSchema = yup.object().shape({
  title: yup.string().required('Título obrigatório'),
  zip_code: yup
    .string()
    .required('CEP obrigatório')
    .min(8, 'CEP inválido')
    .max(8, 'CEP inválido'),
  cost: yup.number().required('Custo obrigatório'),
  deadline: yup
    .date()
    .required('Prazo obrigatório')
    .typeError('Prazo deve ser uma data válida'),
});
