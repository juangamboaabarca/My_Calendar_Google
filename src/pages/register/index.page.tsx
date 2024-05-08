import { api } from '@/src/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormErrors, Header, RegisterContainer } from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário deve ter no mínimo 3 caracteres.' })
    .max(20, { message: 'O usuário deve ter no máximo 20 caracteres.' })
    .regex(/^([a-z\\1-9]+)$/i, {
      message: 'O usuário pode ter apenas letras e números.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        alert(error.response.data.message)
        return
      }

      console.log(error)
    }
  }

  return (
    <>
      <NextSeo title="Creando una cuenta" />
      <RegisterContainer>
        <Header>
          <Heading as="strong">Bienvenido</Heading>
          <Text>
            Necesitamos alguna información para crear su perfil! Posteriormente podrá editarla
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nombre de usuario</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="username"
              {...register('username')}
            />

            {errors.username && (
              <FormErrors size="sm">{errors.username?.message}</FormErrors>
            )}
          </label>
          <label>
            <Text size="sm">Nombre completo</Text>
            <TextInput
              placeholder="Digite su nombre completo"
              {...register('name')}
            />

            {errors.username && (
              <FormErrors size="sm">{errors.name?.message}</FormErrors>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Siguiente paso
            <ArrowRight />
          </Button>
        </Form>
      </RegisterContainer>
    </>
  )
}
