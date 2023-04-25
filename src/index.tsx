import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
// 18.2.0
// import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css'
import './style/icon.scss'
import './style/common.scss'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
)

// 18.2
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   // <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   // </React.StrictMode>
// )
