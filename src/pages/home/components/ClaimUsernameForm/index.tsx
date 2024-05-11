import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'   // https://www.kirandev.com/nextjs-api-routes-zod-validation
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormAnnotation } from './styles'
import { useRouter } from 'next/router'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'El usuario debe tener más de tres caracteres.' })
    .max(20, { message: 'El usuario debe tener menos de veinte caracteres' })
    .regex(/^([a-z\\1-9]+)$/i, {
      message: 'Solo se permiten letras y números.',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    await router.push(`/register?username=${username}`)  // p ej. http://localhost:3000/register/?username=Luis
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="username"
          {...register('username')}  // https://oprearocks.medium.com/what-do-the-three-dots-mean-in-javascript-bc5749439c9a 
                                     //para el caso actual, concatena el nombre de usuario incluido en register
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Registrar
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite el nombre de usuario deseado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
