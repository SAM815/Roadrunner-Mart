import { Typography } from '@mui/material'
import React from 'react'
import {LocalShipping, LibraryAddCheck, AccountBalance} from "@mui/icons-material"
import {Stepper, Step, StepLabel} from "@mui/material"
import "./CheckoutSteps.css"

/*
CheckoutSteps()
NAME
    CheckoutSteps
SYNOPSIS
    CheckoutSteps({ activeSteps });
    - activeSteps (number): The current step index to determine the active and completed steps.
DESCRIPTION
    This React component renders a Stepper to show the progression of the checkout process. The Stepper is used to visually indicate the stages of checkout, such as Shipping Details, Confirm Order, and Payment.
    It uses Material-UI's Stepper component to display each step with a label and an associated icon. The style of the step labels changes based on whether the step is active or completed.
RETURNS
    Returns a React component that renders a Stepper with styled steps based on the current active step.
*/

const CheckoutSteps = ({activeSteps}) => {
    const steps = [
        {
            label:<Typography>Shipping Details</Typography>,
            icons: <LocalShipping/>
        },
        {
            label:<Typography>Confirm Order</Typography>,
            icons: <LibraryAddCheck/>

        },
        {
            label:<Typography>Payment</Typography>,
            icons:<AccountBalance/>
        }
    ]

    const stepStyles = {
        boxSizing:"border-box",
    };
  return (
    <>
        <Stepper alternativeLabel activeSteps = {activeSteps} style = {stepStyles}>
            {steps.map((item, index)=> (
                <Step
                    key = {index}
                    active = {activeSteps === index ? true:false}
                    completed = {activeSteps >= index ? true:false}
                >
                    <StepLabel
                        style={{
                            color: activeSteps >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
                        }}
                                icon = {item.icons}>{item.label}</StepLabel>


                </Step>
            ))}

        </Stepper>

    </>
  )
}

export default CheckoutSteps