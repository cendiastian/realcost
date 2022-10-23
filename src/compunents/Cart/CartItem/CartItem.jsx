import React from 'react'
import {Typography, Button, Card, CardActions, CardMedia, CardContent} from '@material-ui/core'
import useStyles from './style'
import { Delete } from '@material-ui/icons';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
    const classes = useStyles();

    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1" className={classes.price}>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Delete type="button" className={classes.deleteIcon} onClick={() => onRemoveFromCart(item.id)}/>

            </CardActions>
        </Card>
    )
}

export default CartItem
