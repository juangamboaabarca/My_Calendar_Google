import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import previewImg from '../../images/appPreview.png'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import { NextSeo } from 'next-seo'  //https://developer.mozilla.org/es/docs/Glossary/SEO

export default function Home() {
  return (
    <>
      <NextSeo
        title="Simplifique su agenda"
        description="Conecte su calendario y agende su tiempo de trabajo, sin que interfiera con su tiempo libre"
      />

      <Container>
        <Hero>
          <Heading size="4xl">Calendarización simple</Heading>
          <Text size="xl">
            Conecte su calendario y agende su tiempo de trabajo, sin que interfiera con su tiempo libre
          </Text>

          <ClaimUsernameForm />
        </Hero>
        <Preview>
          <Image
            src={previewImg}
            height={400}
            quality={100}
            priority
            alt="Calendario en funcionamiento"
          />
        </Preview>
      </Container>
    </>
  )
}
