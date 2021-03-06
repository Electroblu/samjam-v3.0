import {Segment, Icon, Header, Button} from 'semantic-ui-react'
import Link from 'next/link'
import { useFetchUser } from '../utils/user'
import Router from 'next/router'


function Certificates() {

    const {user, loading} = useFetchUser()

    if (!user && !loading) {
        Router.push('/')
    }

    return (
        <>
            <Link href="/certificates/rsa">
                <Button 
                    fluid
                    textalign="center"
                    size="massive"
                    color="blue"
                    aria-label="RSA"
                >
                <Icon name="glass martini"/>
                RSA
                </Button>
            </Link>
            <br/>
            <Link href="/certificates/firstaid">
                <Button 
                    fluid
                    textalign="center"
                    size="massive"
                    color="green"
                    aria-label="First Aid"
                >
                <Icon name="medkit"/>
                First Aid
                </Button>
            </Link>
            <br/>
            <Link href="/certificates/firewarden">
                <Button 
                    fluid
                    textalign="center"
                    size="massive"
                    color="red"
                    aria-label="Fire Warden"
                >
                <Icon name="fire extinguisher"/>
                Fire Warden
                </Button>
            </Link>
            <br/>
            <Link href="/certificates/foodsaftey">
                <Button 
                    fluid
                    textalign="center"
                    size="massive"
                    color="yellow"
                    aria-label="Food Saftey"
                >
                <Icon name="utensils"/>
                Food Saftey
                </Button>
            </Link>
            <br/>
            <Link href="/certificates/wwcc">
                <Button
                    fluid 
                    textalign="center"
                    size="massive"
                    color="teal"
                    aria-label="WWCC"
                >
                <Icon name="child"/>
                WWCC
                </Button>
            </Link>
        </>
    )
}

export default Certificates