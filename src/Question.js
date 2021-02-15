import React, {useState, useEffect} from 'react'
import {Card, CardContent, Button, Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles(
    {
        card: {
            background: '#F5F5DC',
            width: '75%',
            height: '220px',
            margin: 'auto',
            marginTop: '80px'
        },
        cardtext: {
            textAlign: 'center'
        },
        startbtnContainer: {
            textAlign: 'center'
        }
    }
)

export default function Question() {

    const [started, setStarted] = useState(false)
    const [advice, setAdvice] = useState('stam')
    const classes = useStyles()

    function getAdvice() {
        axios.get('')
    }

    return (
        <div>
        {started ? 
            <div>
            <Card className={classes.card}>
            <CardContent className={classes.cardtext}>
                <h1>Advice from DB</h1>
                <h1>{advice}</h1>
            </CardContent>
                <Container className={classes.startbtnContainer}>
                <Button variant="outlined" size='large' onClick={() => getAdvice()}>Another One</Button>
            </Container>
            </Card>
            </div>
            : 
            <Card className={classes.card}>
            <CardContent className={classes.cardtext}>
                <h1>Need an Advice?</h1>
                Click on 'START' above
            </CardContent>
                <Container className={classes.startbtnContainer}>
                <Button variant="outlined" size='large' onClick={() => setStarted(true)}>START</Button>
            </Container>
            </Card>
        }
        
        </div>
    )
}