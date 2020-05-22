import React from  'react'
import {Dropdown ,Button} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {setAuthedUser} from '../Actions/authedUser'

class Login extends React.Component{
    state ={
        selectedUser: null
      }

    handleUserSelection = (event,data) =>{
        this.setState({selectedUser:data.value})
    }  
    handleLogin = (e) =>{
        e.preventDefault()
        if(!this.state.selectedUser){
            return alert('Please Select User to login')
        }
        this.props.setAuthedUser(this.state.selectedUser);
    }
    render(){
        const {users} = this.props
        const availableUsers = Object.keys(users).map(id => ({
          key: id,
          value: id,
          text: users[id].name,
          image: { avatar: true, src: users[id].avatarURL }
        }))

       
        return(
            <div className="ui container">
              <div className="column" style={{ width: "420px", marginTop: "5em" }}>
              <h2 className="ui black image header"style={{ marginLeft: "60px", marginBottom: "30px" }}><div className="content">Log In</div></h2>
              <form className="ui large form">
                <div className="ui raised segment">
                  <div className="field">
                    <Dropdown
                      placeholder="Select a User"
                      fluid
                      selection
                      options={availableUsers}
                      onChange={this.handleUserSelection}
                    />
                  </div>
                  <div className="field">
                </div>
                <div className="ui two buttons">
                    <Button basic color="black" onClick={this.handleLogin}>
                      Log  In
                    </Button>
                </div>
              </div>
              </form>
            </div>
          </div>
        )
    }
}
function mapStateToProps({users}){
    return {users}
  }

export default connect(mapStateToProps, {setAuthedUser}) (Login)