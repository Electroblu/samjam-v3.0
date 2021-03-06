import {Button, Icon, Image, Segment, Header} from 'semantic-ui-react'
import Link from 'next/link'
import { useFetchUser } from '../utils/user'
import Dashboard from '../components/Dashboard/Dashboard'
import Router from 'next/router'

function Home() {

  const {user, loading} = useFetchUser()

  if (user) {
    return <>
      <h1>Welcome Back {user.name}</h1>
      <Dashboard/>
    </>
  }

  if(!user) {
    return <>
    <Header as="h1" textAlign='center'>
      Welcome to Samjam!
    </Header>
    <Segment raised center>
      <Image src='https://res.cloudinary.com/aurix/image/upload/v1602761835/Samjam_logo_light_lvk9jc.svg' centered size='large'/>
      <br/>
        <Link href='api/login'>
          <Button icon color="blue" size='massive' circular fluid aria-label="login">
              Login
          </Button>
        </Link>
    </Segment>

    </>
  }
}

export default Home