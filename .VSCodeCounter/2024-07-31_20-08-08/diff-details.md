# Diff Details

Date : 2024-07-31 20:08:08

Directory d:\\MERN App\\RamaporoadRunners-Mart\\frontend

Total : 92 files,  24076 codes, 860 comments, 827 blanks, all 25763 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [backend/app.js](/backend/app.js) | JavaScript | -21 | -20 | -19 | -60 |
| [backend/config/database.js](/backend/config/database.js) | JavaScript | -7 | -18 | -2 | -27 |
| [backend/controllers/order.js](/backend/controllers/order.js) | JavaScript | -136 | -157 | -43 | -336 |
| [backend/controllers/payment.js](/backend/controllers/payment.js) | JavaScript | -16 | -44 | -8 | -68 |
| [backend/controllers/post.js](/backend/controllers/post.js) | JavaScript | -247 | -164 | -53 | -464 |
| [backend/controllers/user.js](/backend/controllers/user.js) | JavaScript | -444 | -307 | -106 | -857 |
| [backend/middlewares/auth.js](/backend/middlewares/auth.js) | JavaScript | -23 | -24 | -14 | -61 |
| [backend/middlewares/sendEmail.js](/backend/middlewares/sendEmail.js) | JavaScript | -29 | -27 | -12 | -68 |
| [backend/models/Order.js](/backend/models/Order.js) | JavaScript | -104 | -55 | -12 | -171 |
| [backend/models/Post.js](/backend/models/Post.js) | JavaScript | -48 | -47 | -7 | -102 |
| [backend/models/user.js](/backend/models/user.js) | JavaScript | -75 | -55 | -17 | -147 |
| [backend/routes/order.js](/backend/routes/order.js) | JavaScript | -24 | -71 | -11 | -106 |
| [backend/routes/payment.js](/backend/routes/payment.js) | JavaScript | -7 | -34 | -5 | -46 |
| [backend/routes/post.js](/backend/routes/post.js) | JavaScript | -28 | -64 | -8 | -100 |
| [backend/routes/user.js](/backend/routes/user.js) | JavaScript | -36 | -94 | -18 | -148 |
| [backend/server.js](/backend/server.js) | JavaScript | -13 | -13 | -8 | -34 |
| [frontend/README.md](/frontend/README.md) | Markdown | 38 | 0 | 33 | 71 |
| [frontend/package-lock.json](/frontend/package-lock.json) | JSON | 19,499 | 0 | 1 | 19,500 |
| [frontend/package.json](/frontend/package.json) | JSON | 57 | 0 | 1 | 58 |
| [frontend/public/index.html](/frontend/public/index.html) | HTML | 20 | 23 | 1 | 44 |
| [frontend/src/Actions/Cart.js](/frontend/src/Actions/Cart.js) | JavaScript | 30 | 56 | 11 | 97 |
| [frontend/src/Actions/Order.js](/frontend/src/Actions/Order.js) | JavaScript | 118 | 125 | 31 | 274 |
| [frontend/src/Actions/Post.js](/frontend/src/Actions/Post.js) | JavaScript | 142 | 118 | 11 | 271 |
| [frontend/src/Actions/User.js](/frontend/src/Actions/User.js) | JavaScript | 328 | 296 | 41 | 665 |
| [frontend/src/App.css](/frontend/src/App.css) | CSS | 4 | 0 | 1 | 5 |
| [frontend/src/App.js](/frontend/src/App.js) | JavaScript | 132 | 13 | 48 | 193 |
| [frontend/src/Components/Account/Account.css](/frontend/src/Components/Account/Account.css) | CSS | 73 | 11 | 15 | 99 |
| [frontend/src/Components/Account/Account.jsx](/frontend/src/Components/Account/Account.jsx) | JavaScript JSX | 178 | 12 | 48 | 238 |
| [frontend/src/Components/Admin/Dashboard.css](/frontend/src/Components/Admin/Dashboard.css) | CSS | 85 | 11 | 20 | 116 |
| [frontend/src/Components/Admin/Dashboard.js](/frontend/src/Components/Admin/Dashboard.js) | JavaScript | 91 | 13 | 29 | 133 |
| [frontend/src/Components/Admin/OrderList.js](/frontend/src/Components/Admin/OrderList.js) | JavaScript | 114 | 13 | 17 | 144 |
| [frontend/src/Components/Admin/ProcessOrder.css](/frontend/src/Components/Admin/ProcessOrder.css) | CSS | 38 | 11 | 8 | 57 |
| [frontend/src/Components/Admin/ProcessOrder.js](/frontend/src/Components/Admin/ProcessOrder.js) | JavaScript | 178 | 13 | 34 | 225 |
| [frontend/src/Components/Admin/ProductList.css](/frontend/src/Components/Admin/ProductList.css) | CSS | 46 | 11 | 12 | 69 |
| [frontend/src/Components/Admin/ProductList.js](/frontend/src/Components/Admin/ProductList.js) | JavaScript | 73 | 13 | 21 | 107 |
| [frontend/src/Components/Admin/Sidebar.css](/frontend/src/Components/Admin/Sidebar.css) | CSS | 33 | 11 | 13 | 57 |
| [frontend/src/Components/Admin/Sidebar.js](/frontend/src/Components/Admin/Sidebar.js) | JavaScript | 43 | 13 | 15 | 71 |
| [frontend/src/Components/Cart/Cart.css](/frontend/src/Components/Cart/Cart.css) | CSS | 157 | 12 | 37 | 206 |
| [frontend/src/Components/Cart/Cart.js](/frontend/src/Components/Cart/Cart.js) | JavaScript | 87 | 12 | 20 | 119 |
| [frontend/src/Components/Cart/CartItemCart.css](/frontend/src/Components/Cart/CartItemCart.css) | CSS | 50 | 11 | 16 | 77 |
| [frontend/src/Components/Cart/CartItemCart.js](/frontend/src/Components/Cart/CartItemCart.js) | JavaScript | 16 | 14 | 3 | 33 |
| [frontend/src/Components/Cart/CheckoutSteps.css](/frontend/src/Components/Cart/CheckoutSteps.css) | CSS | 11 | 11 | 5 | 27 |
| [frontend/src/Components/Cart/CheckoutSteps.js](/frontend/src/Components/Cart/CheckoutSteps.js) | JavaScript | 44 | 13 | 9 | 66 |
| [frontend/src/Components/Cart/ConfirmOrder.css](/frontend/src/Components/Cart/ConfirmOrder.css) | CSS | 165 | 11 | 40 | 216 |
| [frontend/src/Components/Cart/ConfirmOrder.js](/frontend/src/Components/Cart/ConfirmOrder.js) | JavaScript | 106 | 16 | 14 | 136 |
| [frontend/src/Components/Cart/Payment.css](/frontend/src/Components/Cart/Payment.css) | CSS | 75 | 11 | 15 | 101 |
| [frontend/src/Components/Cart/Payment.js](/frontend/src/Components/Cart/Payment.js) | JavaScript | 123 | 18 | 32 | 173 |
| [frontend/src/Components/Cart/Shipping.css](/frontend/src/Components/Cart/Shipping.css) | CSS | 95 | 12 | 21 | 128 |
| [frontend/src/Components/Cart/Shipping.js](/frontend/src/Components/Cart/Shipping.js) | JavaScript | 122 | 14 | 25 | 161 |
| [frontend/src/Components/Cart/Success.css](/frontend/src/Components/Cart/Success.css) | CSS | 41 | 11 | 11 | 63 |
| [frontend/src/Components/Cart/Success.js](/frontend/src/Components/Cart/Success.js) | JavaScript | 15 | 14 | 4 | 33 |
| [frontend/src/Components/CommentCard/CommentCard.css](/frontend/src/Components/CommentCard/CommentCard.css) | CSS | 26 | 11 | 5 | 42 |
| [frontend/src/Components/CommentCard/CommentCard.jsx](/frontend/src/Components/CommentCard/CommentCard.jsx) | JavaScript JSX | 47 | 24 | 7 | 78 |
| [frontend/src/Components/ForgotPassword/ForgotPassword.css](/frontend/src/Components/ForgotPassword/ForgotPassword.css) | CSS | 40 | 11 | 6 | 57 |
| [frontend/src/Components/ForgotPassword/ForgotPassword.jsx](/frontend/src/Components/ForgotPassword/ForgotPassword.jsx) | JavaScript JSX | 47 | 14 | 9 | 70 |
| [frontend/src/Components/Header/Header.css](/frontend/src/Components/Header/Header.css) | CSS | 67 | 11 | 13 | 91 |
| [frontend/src/Components/Header/Header.jsx](/frontend/src/Components/Header/Header.jsx) | JavaScript JSX | 96 | 16 | 27 | 139 |
| [frontend/src/Components/Home/Home.css](/frontend/src/Components/Home/Home.css) | CSS | 47 | 11 | 10 | 68 |
| [frontend/src/Components/Home/Home.jsx](/frontend/src/Components/Home/Home.jsx) | JavaScript JSX | 81 | 16 | 19 | 116 |
| [frontend/src/Components/Loader/Loader.css](/frontend/src/Components/Loader/Loader.css) | CSS | 23 | 11 | 4 | 38 |
| [frontend/src/Components/Loader/Loader.jsx](/frontend/src/Components/Loader/Loader.jsx) | JavaScript JSX | 10 | 14 | 4 | 28 |
| [frontend/src/Components/Login/Login.css](/frontend/src/Components/Login/Login.css) | CSS | 50 | 11 | 8 | 69 |
| [frontend/src/Components/Login/Login.jsx](/frontend/src/Components/Login/Login.jsx) | JavaScript JSX | 60 | 16 | 13 | 89 |
| [frontend/src/Components/NewPost/NewPost.css](/frontend/src/Components/NewPost/NewPost.css) | CSS | 73 | 11 | 10 | 94 |
| [frontend/src/Components/NewPost/NewPost.jsx](/frontend/src/Components/NewPost/NewPost.jsx) | JavaScript JSX | 79 | 16 | 12 | 107 |
| [frontend/src/Components/NotFound/NotFound.css](/frontend/src/Components/NotFound/NotFound.css) | CSS | 33 | 11 | 6 | 50 |
| [frontend/src/Components/NotFound/NotFound.jsx](/frontend/src/Components/NotFound/NotFound.jsx) | JavaScript JSX | 21 | 16 | 4 | 41 |
| [frontend/src/Components/Order/MyOrder.css](/frontend/src/Components/Order/MyOrder.css) | CSS | 63 | 12 | 17 | 92 |
| [frontend/src/Components/Order/MyOrder.js](/frontend/src/Components/Order/MyOrder.js) | JavaScript | 95 | 18 | 13 | 126 |
| [frontend/src/Components/Order/OrderDetails.css](/frontend/src/Components/Order/OrderDetails.css) | CSS | 88 | 1 | 20 | 109 |
| [frontend/src/Components/Order/OrderDetails.js](/frontend/src/Components/Order/OrderDetails.js) | JavaScript | 113 | 25 | 10 | 148 |
| [frontend/src/Components/Post/Post.css](/frontend/src/Components/Post/Post.css) | CSS | 113 | 24 | 22 | 159 |
| [frontend/src/Components/Post/Post.jsx](/frontend/src/Components/Post/Post.jsx) | JavaScript JSX | 286 | 30 | 52 | 368 |
| [frontend/src/Components/Register/Register.css](/frontend/src/Components/Register/Register.css) | CSS | 70 | 11 | 13 | 94 |
| [frontend/src/Components/Register/Register.jsx](/frontend/src/Components/Register/Register.jsx) | JavaScript JSX | 82 | 15 | 16 | 113 |
| [frontend/src/Components/ResetPassword/ResetPassword.css](/frontend/src/Components/ResetPassword/ResetPassword.css) | CSS | 51 | 0 | 6 | 57 |
| [frontend/src/Components/ResetPassword/ResetPassword.jsx](/frontend/src/Components/ResetPassword/ResetPassword.jsx) | JavaScript JSX | 56 | 14 | 10 | 80 |
| [frontend/src/Components/Search/Search.css](/frontend/src/Components/Search/Search.css) | CSS | 49 | 11 | 8 | 68 |
| [frontend/src/Components/Search/Search.jsx](/frontend/src/Components/Search/Search.jsx) | JavaScript JSX | 46 | 13 | 10 | 69 |
| [frontend/src/Components/UpdatePassword/UpdatePassword.css](/frontend/src/Components/UpdatePassword/UpdatePassword.css) | CSS | 40 | 11 | 7 | 58 |
| [frontend/src/Components/UpdatePassword/UpdatePassword.jsx](/frontend/src/Components/UpdatePassword/UpdatePassword.jsx) | JavaScript JSX | 56 | 13 | 12 | 81 |
| [frontend/src/Components/UpdateProfile/UpdateProfile.css](/frontend/src/Components/UpdateProfile/UpdateProfile.css) | CSS | 60 | 11 | 10 | 81 |
| [frontend/src/Components/UpdateProfile/UpdateProfile.jsx](/frontend/src/Components/UpdateProfile/UpdateProfile.jsx) | JavaScript JSX | 88 | 14 | 21 | 123 |
| [frontend/src/Components/UserProfile/UserProfile.jsx](/frontend/src/Components/UserProfile/UserProfile.jsx) | JavaScript JSX | 185 | 14 | 23 | 222 |
| [frontend/src/Components/User/User.jsx](/frontend/src/Components/User/User.jsx) | JavaScript JSX | 12 | 14 | 3 | 29 |
| [frontend/src/Reducers/Cart.js](/frontend/src/Reducers/Cart.js) | JavaScript | 35 | 32 | 9 | 76 |
| [frontend/src/Reducers/Order.js](/frontend/src/Reducers/Order.js) | JavaScript | 147 | 181 | 23 | 351 |
| [frontend/src/Reducers/Post.js](/frontend/src/Reducers/Post.js) | JavaScript | 174 | 205 | 18 | 397 |
| [frontend/src/Reducers/User.js](/frontend/src/Reducers/User.js) | JavaScript | 123 | 196 | 10 | 329 |
| [frontend/src/index.css](/frontend/src/index.css) | CSS | 12 | 0 | 2 | 14 |
| [frontend/src/index.js](/frontend/src/index.js) | JavaScript | 22 | 13 | 4 | 39 |
| [frontend/src/store.js](/frontend/src/store.js) | JavaScript | 41 | 13 | 11 | 65 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details