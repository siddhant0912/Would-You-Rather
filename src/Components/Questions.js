import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Image, Label, Menu, Tab } from "semantic-ui-react";


class Questions extends Component{
    cardsperRow = 2
    renderCardsFromQuestions = filarr =>{

    const {questions , users} = this.props
    const cards = Object.keys(questions)
    .filter(filarr).map( id => {
        const question = questions[id]
        const user =  users[question.author]
        return(
            <Card key={id}>
                <Card.Content>
                    <Image circular   floated= "right" size="tiny" src ={user.avatarURL}/>
                        <Card.Header>{user.name} asks</Card.Header>
                        <div>
                            Would You rather {question.optionOne.text} or{" "}
                                             {question.optionTwo.text}?
                        </div>
                </Card.Content>
                <Card.Content extra>
                    <div className="ui two buttons">
                        <Link to ={`/questions/${id}`} style={{ width: "100%" }}>
                            <Button fluid basic color="black">
                                View Poll
                            </Button>
                        </Link>

                    </div>
                </Card.Content>
            </Card>
        )
    })
    return cards.length ? [ cards.length, <Card.Group itemsPerRow ={this.cardsperRow}>{cards}</Card.Group>] : [cards.length]

    }

    render(){
        const {questions,  authedUser, currIndex, handlePaneChange} = this.props
        const [ unansweredQuesCnt, unansweredQuesCont = "All questions have been answered."] = this.renderCardsFromQuestions(
            id =>
              !questions[id].optionOne.votes.includes(authedUser) && !questions[id].optionTwo.votes.includes(authedUser)
          );
      
          const [ answeredQuesCnt, answeredQuesCont = "There are no answered questions available."] = this.renderCardsFromQuestions(
            qid =>
              questions[qid].optionOne.votes.includes(authedUser) || questions[qid].optionTwo.votes.includes(authedUser)
          );

          const panes = [
            {
              menuItem: (
                <Menu.Item key="unanswered-questions">Unanswered Questions<Label  color='red' floating>{unansweredQuesCnt}</Label></Menu.Item>
              ),
              render: () => <Tab.Pane>{unansweredQuesCont}</Tab.Pane>
            },
            {
              menuItem: (
                <Menu.Item key="answered-questions">Answered Questions<Label color='teal' floating>{answeredQuesCnt}</Label></Menu.Item>
              ),
              render: () => <Tab.Pane>{answeredQuesCont}</Tab.Pane>
            }
          ];  
        return(
            <div>
                <div>
                    <Tab panes={panes} activeIndex={currIndex} menu={{ secondary: true, pointing: true }}
                            onTabChange={(e, data) => handlePaneChange(e, data)} />
                </div>

            </div>
        )
    }
}

function SortQuestions(questions){
    const SortedQuestionList = {}
    Object.keys(questions).map( key => questions[key]).sort((a,b) => b.timestamp - a.timestamp).forEach(question => SortedQuestionList[question.id] = question )
    return SortedQuestionList
}

function mapStateToProps({authedUser, questions, users}){
    return { authedUser ,users , questions:SortQuestions(questions)}
}

export default connect(mapStateToProps)( Questions)