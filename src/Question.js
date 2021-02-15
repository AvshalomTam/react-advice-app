import React, {useState, useEffect} from 'react'
import {Card, CardContent, Button, Container} from '@material-ui/core'
import {darken, makeStyles} from '@material-ui/core/styles';
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
            textAlign: 'center',
            color: darken('#DEB887', '1%')
        },
        startbtnContainer: {
            color: darken('#DEB887', '50%'),
            textAlign: 'center',
            position: 'fixed',
            bottom: '130px',
            right: '0'

        }
    }
)

export default function Question() {

    const [started, setStarted] = useState(false)
    const [advice, setAdvice] = useState('')
    const classes = useStyles()

    useEffect(() => {
        getAdvice()
    }, [])

    // this function converts all html chars inside the questions to normal string
    function decodeString(str) {
        const textArea = document.createElement('textarea')
        textArea.innerHTML = str
        return textArea.value
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getAdvice() {
        const adviceNumber = getRandomInt(1, 217).toString()
        const url = `https://api.adviceslip.com/advice/${adviceNumber}`
        axios
        .get(url)
        .then((res) => {
            const {data} = res
            let dataAsStr = data.toString()
            let newStringData = dataAsStr += '}' 
            const newJSONdata = JSON.parse(newStringData)
            const {slip} = newJSONdata
            let fixedString = decodeString(slip.advice)
            // fix API Problems
            if (slip.id === 146) {
                fixedString = 'Trust Yourself!' 
            }
            if (slip.id === 203) {
                fixedString = 'Listen to your heart' 
            }
            setAdvice(fixedString)
        })
    }

    return (
        <div>
        {started ? 
            <div>
            <Card className={classes.card}>
            <CardContent className={classes.cardtext}>
                <h2>{advice}</h2>
            </CardContent>
                <Container className={classes.startbtnContainer}>
                <Button
                variant="outlined" 
                size='large' 
                onClick={() => getAdvice()}>Another One
                </Button>
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
                <Button 
                variant="outlined" 
                size='large' 
                onClick={() => setStarted(true)}>START</Button>
            </Container>
            </Card>
        }
        
        </div>
    )
}