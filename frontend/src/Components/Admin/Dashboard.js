import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
import './Dashboard.css';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { getMyPosts, loadUser, } from "../../Actions/User";
import { useAlert } from 'react-alert';
import { getAllOrders } from '../../Actions/Order';

/*
Dashboard()
NAME
    Dashboard
SYNOPSIS
    Dashboard();
DESCRIPTION
    This React component displays the dashboard for the user. It shows the total amount earned,
    the user's products, and orders in a summarized form. It includes links to view more details about products and orders.
    The component uses charts to visualize data.
RETURNS
    Returns a React component that displays the user's dashboard with earnings, products, and orders.
*/


const Dashboard = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const { posts } = useSelector((state) => state.myPosts)
    const { orders } = useSelector((state) => state.allOrders)



    useEffect(() => {


        dispatch(getMyPosts());
        dispatch(getAllOrders())

    }, [dispatch])


    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement,
        PointElement,
        LineElement

    );

    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            }
        ],

    }
    console.log("this is the posts.length in dashbard.js", posts.length);





    return (
        <>
            <div className="dashboard">
                <Sidebar />
                <div className='dashboardContainer'>
                    <Typography component="h1">Dashboard</Typography>

                    <div className="dashboardSummary">
                        <div>
                            <p>
                                Total Amount<br /> {totalAmount}
                            </p>
                        </div>

                        <div className="dashboardSummaryBox2">
                            {((!posts || posts.length === 0) || (!orders || orders.length === 0)) ? (
                                <p>You do not have any orders or products</p>
                            ) : (
                                <>
                                    <Link to="/admin/products">
                                        <p>My Products</p>
                                        <p>{posts && posts.length}</p>
                                    </Link>
                                    <Link to="/admin/orders">
                                        <p>User Orders</p>
                                        <p>{orders && orders.length}</p>
                                    </Link>
                                    <Link to="/orders">
                                        <p>My orders</p>
                                    </Link>
                                </>
                            )}
                        </div>

                    </div>
                    <div className="lineChart">
                        <Line
                            data={lineState}
                        />
                    </div>



                </div>
            </div>
        </>
    )
}

export default Dashboard
