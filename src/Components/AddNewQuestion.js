import React from 'react'
import { Button, Card, Form, Image, Input } from "semantic-ui-react"
import { connect } from "react-redux"
import {handleAddQuestion} from  '../Actions/questions'


class AddNewQuestion extends React.Component{
    state ={
        optionOne :  "",
        optionTwo : ""
    }
    handleChange = (e, data)=> {
        this.setState({[data.id] : data.value })
    }
    handleOnClick = async() =>{
        const {optionOne , optionTwo} = this.state
        const {authedUser: author, history} = this.props
        if(!optionOne || !optionTwo){
            return alert('Please Enter Something')
        }
        await this.props.handleAddQuestion({
            optionOne,
            optionTwo,
            author
        })
        history.push('/')
    }
    render(){
        const {authedUser, users} = this.props
        const user = users[authedUser]
        return(
        <div>
        <Card.Group centered>
          <Card style={{ width: "400px" }}>
            <Card.Content>
              <Image  floated="right" size="tiny" src={user.avatarURL}  circular/>
              <Card.Header>{user.name} asks</Card.Header>
              <div>Would you rather</div>
              <Card.Description>
                <Form>
                  <Form.Field>
                    <Input
                      id="optionOne"
                      placeholder="Enter Option One Text Here"
                      value={this.state.optionOne}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      id="optionTwo"
                      placeholder="Enter Option One Text Here"
                      value={this.state.optionTwo}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="black" onClick={this.handleOnClick}>
                  Add 
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
        </div>
        )
    }
   
}

function mapStateToProps({authedUser , users}){
    return {authedUser, users}
}

export default  connect(mapStateToProps, {handleAddQuestion}) (AddNewQuestion)