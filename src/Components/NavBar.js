import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class NavBar extends React.Component{
    render(){
        var {authedUser, users} = this.props
        var {name, avatarURL} = users[authedUser]
      
        
        return(
        <div className="ui secondary pointing menu">
          <div className="ui container">
                  <NavLink to="/" exact className="header item" activeClassName="active">Home</NavLink>
                  <NavLink to="/add" exact className="item" activeClassName="active">Add New Question</NavLink>
                  <NavLink to="/leaderboard" exact className="item"activeClassName="active">Leader Board</NavLink>
          <div className="ui right floated item">
            <span style={{ marginRight: "10px" }}>{`Hello, ${name}`}</span>
        <img className="ui avatar image" src={avatarURL}   alt="" />
        </div>
                  <NavLink to="/logout" exact className="item" activeClassName="active">Logout</NavLink>
        </div>
      </div>
        )
    }
}
const mapStateToProps = state => {
    return { authedUser: state.authedUser, users: state.users };
  };
export default connect(mapStateToProps)(NavBar)