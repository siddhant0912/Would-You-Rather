import React from 'react'
import {setAuthedUser} from '../Actions/authedUser'
import { connect } from 'react-redux'

class LogOut extends React.Component{
    componentDidMount(){
        this.props.setAuthedUser(null)
        const {history} = this.props
        history.push('/')
    }
    render(){
        return <div>Logging Out</div>
    }
}

export default connect(null, {setAuthedUser})(LogOut)