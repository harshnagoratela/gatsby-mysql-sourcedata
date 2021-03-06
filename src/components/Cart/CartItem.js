import React, { useContext } from 'react';
import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from './icons'
import { Home } from "@styled-icons/material"
import { formatNumber } from './utils';
import styled from '@emotion/styled';
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const CartItemWrapper = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  padding: 0.5rem 0 0.5rem 0;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const CartElementSmall = styled.div`
    padding: .5rem;
    flex: 0 0 12.5%;
    max-width: 12.5%;
    @media (max-width: 600px) {
        flex: 0 0 99%;
        max-width: 99%;
    }
`;
const CartElementMedium = styled.div`
    padding: .5rem;
    flex: 0 0 25%;
    max-width: 25%;
    @media (max-width: 600px) {
        flex: 0 0 99%;
        max-width: 99%;
    }
`;
const CartElementBig = styled.div`
    padding: .5rem;
    flex: 0 0 52%;
    max-width: 50%;
    @media (max-width: 600px) {
        flex: 0 0 99%;
        max-width: 99%;
    }
`;
const ProductName = styled.h5`
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: .25rem;
`;
const Price = styled.p`
    font-size: .875rem;
    font-weight: 200;
    margin-bottom: .25rem;
    margin-top: 0;
`;
const Quantity = styled.p`
    margin-bottom: 0;
`;
const ButtonsWrapper = styled.span`
    .btn {
        cursor: pointer;
        font-size: 10px;
        margin-right: .5rem;
        margin-bottom: .25rem;
        text-align: center;
        vertical-align: middle;
        color: #fff;
        background-color: #1a1a1a;
        border-color: #1a1a1a;
    }
    .btn-alt {
        background-color: #d9534f;
        border-color: #d9534f;
    }
`;
const StyledDialog = styled(Dialog)`
@media (max-width: 600px) {
  width: 90vw;
}
.dialogTitle {
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
}

.shopname {
    display: none;
}

.dialogImageDescription {
  display : flex;
  img {
    max-height: 300px;
    max-width: 50%;
    margin-right: 3%;
  }
  span {
    padding-left: 2rem;
  }

  @media (max-width: 600px) {
    display : block;
    img {
      max-width : 100%;
    }
    span {
      padding-left: 0rem;
    }
  }
}
`;

const CartItem = ({ product }) => {

    const [showDialog, setShowDialog] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState("");
    const openDialog = (product) => {
        setDialogContent(populateDialogContent(product))
        setShowDialog(true);
    }
    const closeDialog = () => setShowDialog(false);

    const populateDialogContent = (product) => {
        return (
            <>
                <div className="dialogImageDescription">
                    {product.photo &&
                        <img src={product.photo} />
                    }
                    <div>
                        <h3>{product.name}</h3>
                        <p><i><a href={`/shops/${product.emprezzoID}/`}>{product.shopName || product.name}</a> ${product.price}</i></p>
                        <p>{product.description && product.description.substring(0, 220)}</p>
                    </div>
                </div>
                <br />
                <div>
                    <a href={product.productURL} target="_blank" className="button">Shop at {product.shopName}</a>
                </div>
                <br />
            </>
        );
    }

    return (
        <>
            <CartItemWrapper>
                <CartElementSmall>
                    <a href="javascript:" onClick={() => openDialog(product)}>
                        <img
                            alt={product.name}
                            style={{ margin: "0 auto", maxHeight: "50px" }}
                            src={product.photo} className="img-fluid d-block" />
                    </a>
                </CartElementSmall>
                <CartElementBig>
                    <ProductName><a href="javascript:" onClick={() => openDialog(product)}>{product.name}</a></ProductName>
                    <Price>Price: {formatNumber(product.price)} </Price>
                </CartElementBig>
                {/* <CartElementSmall>
                    <Quantity>Qty: {product.quantity}</Quantity>
                </CartElementSmall> */}
                {/* <CartElementMedium>
                    <ButtonsWrapper>
                        <button className="btn" onClick={() => increase(product)}>
                            <PlusCircleIcon width={"20px"} />
                        </button>
                        {product.quantity > 1 &&
                            <button className="btn btn-alt" onClick={() => decrease(product)}>
                                <MinusCircleIcon width={"20px"} />
                            </button>
                        }

                        {product.quantity === 1 &&
                            <button className="btn btn-alt" onClick={() => removeProduct(product)}>
                                <TrashIcon width={"20px"} />
                            </button>
                        }
                        {product.productURL &&
                            <a className="button" href={product.productURL} style={{ padding: "0.5em 0.75em" }}>
                                <Home width={"24px"} />
                            </a>
                        }
                    </ButtonsWrapper>
                </CartElementMedium> */}
            </CartItemWrapper>
            <StyledDialog isOpen={showDialog} onDismiss={closeDialog}>
                <button className="close-button" onClick={closeDialog} style={{ float: "right", cursor: "pointer" }}>
                    <span aria-hidden>X</span>
                </button>
                {dialogContent}
            </StyledDialog>
        </>
    );
}

export default CartItem;
