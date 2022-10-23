import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { commerce } from '../../../lib/commerce'
import useStyles from './style'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import illustrator from '../../../assets/order-completed.svg'

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({})
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [isFinished, setIsFinished] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const generateToken = async () => {
            try { 
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                console.log(token)
                setCheckoutToken(token)
            } catch(error) {
                if (activeStep !== steps.length) history.push('/');
            }
        };

        generateToken();
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }

    let Confirmation = () => order.customer ? (
        <>
        <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
            <Divider className={classes.divider}/>
            <Typography variant="subtitle2">Order Reference: {order.customer_reference}</Typography>
            <img src={illustrator} alt="illustrator"/>
        </div>
        <br/>
        <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
    </>
    ) : isFinished ? (
        <>
            <div>
                <Typography style={{textAlign: 'center', marginBottom: '20px'}} variant="h5">Thank you for your purchase</Typography>
                <img src={illustrator} alt="illustrator"/>
                <Divider className={classes.divider}/>
            </div>
            <br/>
            <Button component={Link} to="/" style={{margin: 'auto'}} variant="outlined" type="button">Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    )

    if(error) {
        Confirmation = () => (
            <>
                <Typography variant="h5">Error: {error}</Typography>
                <br/>
                <Button component={Link} to="/">Back to Home</Button>
            </>
        )
    }

    const Form = ()=> activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm 
        shippingData={shippingData} 
        checkoutToken={checkoutToken} 
        backStep={backStep}
        nextStep={nextStep}
        onCaptureCheckout={onCaptureCheckout} 
        timeout={timeout}
        />

        return (
        <>
         <CssBaseline>
            <div className={classes.toolbar} /> 
            <div className={classes.toolbar} /> 
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" align="center">Checkout</Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form />}

                    </Paper>
                </main>  
         </CssBaseline>
        </>
    )
}

export default Checkout
