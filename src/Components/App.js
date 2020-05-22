import React, { Fragment } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {handleInitialData} from '../Actions/shared'
import {LoadingBar} from 'react-redux-loading'
import Login from './Login';
import NavBar from './NavBar'
import Questions from './Questions';
import AddNewQuestion from './AddNewQuestion';
import SingleQuestion from './SingleQuestion';
import LogOut from './LogOut';
import LeaderBoard from './LeaderBoard';

class App extends React.Component {
  
  state = { currIndex: 0 };
  handlePanelChange = (e, { currIndex }) => {
    this.setState({ currIndex });
  };
   componentDidMount(){
     this.props.dispatch(handleInitialData())
   }
  render(){
    const {authedUser} = this.props
    if(!authedUser){
      
      return (
          <Router>
            <Switch>
                <Route  path="/" component={ Login}/>
            </Switch>
            
          </Router>
      )
    }

    return(
        <Router>
           <Fragment>
           <NavBar/>
           <LoadingBar style={{ zIndex: 1000 }} />
           {this.props.loading === true ? null : <div className="ui main text container" style={{ marginTop: "7em" }}>
             <Switch>
               <Route path="/" exact render= {()=>{ return ( <Questions handlePaneChange={this.handlePanelChange}
                      currIndex={this.state.currIndex}/>)}}/>

                <Route path="/add" render={history => { return (<AddNewQuestion 
                                                                history={history.history}/>
                                                                );}}/>    
                <Route path="/questions/:qid" component={SingleQuestion} />   
                <Route path="/logout" render={(history) => <LogOut history={history.history}/> }/> 
                <Route path="/leaderboard" component ={LeaderBoard}/>                                            

             </Switch>
             </div>
           
           }
          
           </Fragment>
          
       </Router>
      
    )
  }
}
function mapStateToProps ({authedUser}){
  return {
    authedUser,
    loading:authedUser === null}
  
}



export default connect(mapStateToProps)(App);
