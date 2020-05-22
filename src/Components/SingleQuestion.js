import React from 'react'
import { connect } from 'react-redux'
import {Card, Image, Segment, Label, Progress, Button, Form, Radio} from "semantic-ui-react";
import {handleAnswerQuestion} from '../Actions/questions'

class SingleQuestion extends React.Component{
    state ={
        selectedOption : null
    }
    handleChange= (e, data) => {
        this.setState({selectedOption : data.value})
    }
    componentDidMount(){
        const { questions} = this.props
        const id  = this.props.match.params.qid
        const question = questions[id]
        if(!question){
            return <div>Error 404: No Question Found</div>
        }
    }
    handleClick = () =>{
        if(!this.state.selectedOption){
            return alert('An Occured...')
        }
        const id =this.props.match.params.qid;
        const answer = this.state.selectedOption
        const {authedUser ,handleAnswerQuestion} = this.props
        handleAnswerQuestion({authedUser, id, answer})   
      
    }
    BeforeAnswering = ()=>{
        const id =this.props.match.params.qid;
        const {questions, users} = this.props

        const question = questions[id]
        if(!question){
            return  
        }
        const user  = users[question.author]
        return(
            <Card key={id} style={{ width: "400px" }}>
            <Card.Content>
              <Image circular floated="right" size="tiny" src={user.avatarURL} />
              <Card.Header>{user.name} asks</Card.Header>
              <div>Would you rather</div>
              <Card.Description>
                <Form>
                  <Form.Field>
                    <Radio
                      label={question.optionOne.text}
                      name="radioGroupVote"
                      value="optionOne"
                      checked={this.state.selectedOption === "optionOne"}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label={question.optionTwo.text}
                      name="radioGroupVote"
                      value="optionTwo"
                      checked={this.state.selectedOption === "optionTwo"}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="black" onClick={this.handleClick}>
                  Submit
                </Button>
              </div>
            </Card.Content>
          </Card>
        )

    }
    questionAfterAnswering = () =>{
        const id =this.props.match.params.qid;
        const {authedUser, users, questions} = this.props
        const question = questions[id]
        if(!question){
            return ;
        }
        const user = users[question.author]

        const isVotedForOne = question.optionOne.votes.includes(authedUser)
        const isVotedForTwo = question.optionTwo.votes.includes(authedUser)
       

        const TotalVotedOptionOne = question.optionOne.votes.length
        const TotalVotedOptionTwo = question.optionTwo.votes.length

        const totalVotes = TotalVotedOptionOne + TotalVotedOptionTwo
        

        const perOptionOne = Math.round((TotalVotedOptionOne/totalVotes) * 100)
        const perOptionTwo = Math.round((TotalVotedOptionTwo/totalVotes ) * 100)

        return(
            <Card key={id} style={{ width: "400px" }}>
            <Card.Content>
              <Image circular floated="right" size="tiny" src={user.avatarURL} />
              <Card.Header>{user.name} asks</Card.Header>
              <div>Would you rather</div>
              <Card.Description>
                <Segment>
                  {isVotedForOne && (
                    <Label as="a" color="red" ribbon="right">
                      Your Vote
                    </Label>
                  )}
                  <p>{question.optionOne.text}</p>
                  <Progress percent={perOptionOne} indicating>
                    {TotalVotedOptionOne} out of {totalVotes} votes
                  </Progress>
                </Segment>
                <Segment>
                  {isVotedForTwo && (
                    <Label color="red" ribbon="right">
                      Your Vote
                    </Label>
                  )}
                  <p>{question.optionTwo.text}</p>
                  <Progress percent={perOptionTwo} indicating>
                    {TotalVotedOptionTwo} out of {totalVotes} votes
                  </Progress>
                </Segment>
              </Card.Description>
            </Card.Content>
          </Card>
        )

    }

    AlreadyAnswered =() =>{
    const {authedUser, questions} = this.props
    const id = this.props.match.params.qid

    const question = questions[id]
    if(!question){
        return null
    }
        return (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser) )
    }



        render(){
             var result;
            if (this.AlreadyAnswered() === true) {
                result = this.questionAfterAnswering();
            } else {
                result = this.BeforeAnswering();
            }
            return <Card.Group centered>{result}</Card.Group>;
        }

}

function mapStateToProps({authedUser, questions , users}){
    return {authedUser, questions, users}
}

export default connect(mapStateToProps, {handleAnswerQuestion})(SingleQuestion)