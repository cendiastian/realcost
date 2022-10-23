import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import Slide from 'react-reveal/Slide'
import banner from '../../assets/Galery/james-william-qMpsMY3q-Qg-unsplash.jpg';
import './style.css'

const Banner = ({ refProduct}) => {
    function showProduct() {
        window.scrollTo({
          top: refProduct.current.offsetTop - 20,
          behavior: "smooth"
        })
      }
    return (
        <div className="banner">
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Slide left>
                        <Typography className="title" variant="h2">
                            This is Where I Know    <span className="caption">The Coffee</span>
                        </Typography>
                        <Button className="shopping-button" onClick={showProduct}>Get Product</Button>
                        </Slide>
                    </Grid>

                    <Grid className="brand" item sm={6}>
                        <Slide right>
                        <img src={banner} alt="banner" />
                        </Slide>
                    </Grid>

                </Grid>
            </Container>
        </div>
    )
}

export default Banner