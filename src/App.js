import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom'

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;



const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)
//////////////////////////

const ParamsExample = () => (
  <Router>
    <div>
      <h2>Accounts</h2>
      <ul>
        <li><Link to="/netflix">Netflix</Link></li>
        <li><Link to="/zillow-group">Zillow Group</Link></li>
        <li><Link to="/yahoo">Yahoo</Link></li>
        <li><Link to="/modus-create">Modus Create</Link></li>
      </ul>

      <Route path="/:id" component={Child}/>
    </div>
  </Router>
)

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

/////////
const AuthExample = () => (
  <Router>
    <div>
      <AuthButton/>
      <ul>
        <li><Link to="/public">Public Page</Link></li>
        <li><Link to="/protected">Protected Page</Link></li>
      </ul>
      <Route path="/public" component={Public}/>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/protected" component={Protected}/>
    </div>
  </Router>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}
//////////
const CustomLinkExample = () => (
  <Router>
    <div>
      <OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Homea"/>
      <OldSchoolMenuLink to="/about" label="Abouta"/>
      <hr/>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>
)

const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <div className={match ? 'active' : ''}>
      {match ? '> ' : ''}<Link to={to}>{label}</Link>
    </div>
  )}/>
)

const Homea = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Abouta = () => (
  <div>
    <h2>About</h2>
  </div>
)

/////

const PEEPS = [
  { id: 0, name: 'Michelle', friends: [ 1, 2, 3 ] },
  { id: 1, name: 'Sean', friends: [ 0, 3 ] },
  { id: 2, name: 'Kim', friends: [ 0, 1, 3 ], },
  { id: 3, name: 'David', friends: [ 1, 2 ] }
]

const find = (id) => PEEPS.find(p => p.id == id)

const RecursiveExample = () => (
  <Router>
    <Person match={{ params: { id: 0 }, url: '' }}/>
  </Router>
)

const Person = ({ match }) => {
  const person = find(match.params.id)

  return (
    <div>
      <h3>{person.name}’s Friends</h3>
      <ul>
        {person.friends.map(id => (
          <li key={id}>
            <Link to={`${match.url}/${id}`}>
              {find(id).name}
            </Link>
          </li>
        ))}
      </ul>
      <Route path={`${match.url}/:id`} component={Person}/>
    </div>
  )
}


/////////////
const Main = () => <h2>Main</h2>

const Sandwiches = () => <h2>Sandwiches</h2>

const Tacos = ({ routes }) => (
  <div>
    <h2>Tacos</h2>
    <ul>
      <li><Link to="/tacos/bus">Bus</Link></li>
      <li><Link to="/tacos/cart">Cart</Link></li>
    </ul>

    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ))}
  </div>
)

const Bus = () => <h3>Bus</h3>
const Cart = () => <h3>Cart</h3>

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  { path: '/sandwiches',
    component: Sandwiches
  },
  { path: '/tacos',
    component: Tacos,
    routes: [
      { path: '/tacos/bus',
        component: Bus
      },
      { path: '/tacos/cart',
        component: Cart
      }
    ]
  }
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} routes={route.routes}/>
  )}/>
)

const RouteConfigExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/tacos">Tacos</Link></li>
        <li><Link to="/sandwiches">Sandwiches</Link></li>
      </ul>

      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </div>
  </Router>
)
/////////////////////

// class ModalSwitch extends React.Component {


//   previousLocation = this.props.location

//   componentWillUpdate(nextProps) {
//     const { location } = this.props
//     // set previousLocation if props.location is not modal
//     if (
//       nextProps.history.action !== 'POP' &&
//       (!location.state || !location.state.modal)
//     ) {
//       this.previousLocation = this.props.location
//     }
//   }

//   render() {
//     const { location } = this.props
//     const isModal = !!(
//       location.state &&
//       location.state.modal &&
//       this.previousLocation !== location // not initial render
//     )
//     return (
//       <div>
//         <Switch location={isModal ? this.previousLocation : location}>
//           <Route exact path='/' component={Home}/>
//           <Route path='/gallery' component={Gallery}/>
//           <Route path='/img/:id' component={ImageView}/>
//         </Switch>
//         {isModal ? <Route path='/img/:id' component={Modal} /> : null}
//       </div>
//     )
//   }
// }

// const IMAGES = [
//   { id: 0, title: 'Dark Orchid', color: 'DarkOrchid' },
//   { id: 1, title: 'Lime Green', color: 'LimeGreen' },
//   { id: 2, title: 'Tomato', color: 'Tomato' },
//   { id: 3, title: 'Seven Ate Nine', color: '#789' },
//   { id: 4, title: 'Crimson', color: 'Crimson' }
// ]

// const Thumbnail = ({ color }) =>
//   <div style={{
//     width: 50,
//     height: 50,
//     background: color
//   }}/>

// const Image = ({ color }) =>
//   <div style={{
//     width: '100%',
//     height: 400,
//     background: color
//   }}></div>

// const Home = () => (
//   <div>
//     <Link to='/gallery'>Visit the Gallery</Link>
//     <h2>Featured Images</h2>
//     <ul>
//       <li><Link to='/img/2'>Tomato</Link></li>
//       <li><Link to='/img/4'>Crimson</Link></li>
//     </ul>
//   </div>
// )

// const Gallery = () => (
//   <div>
//     {IMAGES.map(i => (
//       <Link
//         key={i.id}
//         to={{
//           pathname: `/img/${i.id}`,
//           // this is the trick!
//           state: { modal: true }
//         }}
//       >
//         <Thumbnail color={i.color} />
//         <p>{i.title}</p>
//       </Link>
//     ))}
//   </div>
// )

// const ImageView = ({ match }) => {
//   const image = IMAGES[parseInt(match.params.id, 10)]
//   if (!image) {
//     return <div>Image not found</div>
//   }

//   return (
//     <div>
//       <h1>{image.title}</h1>
//       <Image color={image.color} />
//     </div>
//   )
// }

// const Modal = ({ match, history }) => {
//   const image = IMAGES[parseInt(match.params.id, 10)]
//   if (!image) {
//     return null
//   }
//   const back = (e) => {
//     e.stopPropagation()
//     history.goBack()
//   }
//   return (
//     <div
//       onClick={back}
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//         background: 'rgba(0, 0, 0, 0.15)'
//       }}
//     >
//       <div className='modal' style={{
//       position: 'absolute',
//         background: '#fff',
//         top: 25,
//         left: '10%',
//         right: '10%',
//         padding: 15,
//         border: '2px solid #444'
//       }}>
//         <h1>{image.title}</h1>
//         <Image color={image.color} />
//         <button type='button' onClick={back}>
//           Close
//         </button>
//       </div>
//     </div>
//   )
// }

// const ModalGallery = () => (
//   <Router>
//     <Route component={ModalSwitch} />
//   </Router>
// )

// export default ModalGallery


//export default RouteConfigExample

//export default RecursiveExample
//export default CustomLinkExample
//export default AuthExample
export default App
//export default ParamsExample