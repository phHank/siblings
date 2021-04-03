import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'

import NavigationBar from './Nav'
import Home from './Home'
import ProductDetail from './ProductDetail'
import Search from './Search'
import Categories from './Categories'
import NotFound from './NotFound'
import Footer from './Footer'

const App = () => (
    <Router>
        <NavigationBar />
        <div className="container d-flex flex-column align-items-center" >
            <Switch>
                <Route exact path='/' children={<Home />} />
                <Route exact path='/products/:id' component={ProductDetail}/>
                <Route exact path='/search' component={Search} />
                <Route exact path='/category/:categories' component={Categories} />
                <Route children={<NotFound />} />
            </Switch>
            <Footer />
        </div>
    </Router>
)

export default App