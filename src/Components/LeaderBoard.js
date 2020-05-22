import React from  'react'
import { connect } from 'react-redux'
import { Card, Image, Label, Grid } from "semantic-ui-react";


class LeaderBoard extends React.Component{
    cardsperRow= 3
    render(){
        const{users} = this.props
        var rank = 0
        var Suffix = [ "st" , "nd" , "rd"]
        var color = ["yellow", "grey", "brown"]

        const userscores ={}

        Object.keys(users).forEach(id => {
            const user = users[id]
            const answeredQues =  Object.keys(user.answers).length
            const TotalQues = user.questions.length
            user.score = answeredQues + TotalQues
            userscores[id] = user
        })

        const userScoreSorted ={}
        Object.keys(users).map(id => users[id]).sort((a,b) =>b.score - a.score).forEach(user => userScoreSorted[user.id] =user)
        const userCard = Object.keys(userScoreSorted).map(id =>{
            const user = userScoreSorted[id]
            var label = null
            var colors = color[rank++]
            if(colors){
                label = {
                    as: 'div',
                    corner: 'left',
                    icon : 'trophy',
                    color : colors
                }
            }
            const Answered = Object.keys(user.answers).length 
            const AnsweredPts = Answered * 20
            const Created = user.questions.length
            const CreatedPts = Created * 10
            const score =  AnsweredPts + CreatedPts
            return (
                <Card key={id}>
            <Image  circular   src={user.avatarURL} label={label} />
            <Card.Content>
              <Card.Header>{user.name}</Card.Header>
              <Card.Meta>
                Rank &nbsp;
                <Label size="tiny">
                  {rank}
                  {Suffix.shift() || "th"}
                </Label>
              </Card.Meta>
              <Card.Description>
                <Grid columns={2} divided style={{ fontSize: "1rem" }}>
                  <Grid.Row>
                    <Grid.Column floated="left" width={11}>
                      Answered: {Answered}
                      <br />
                      Created: {Created}
                    </Grid.Column>
                    <Grid.Column floated="right" width={5}>
                      <div>
                        <strong>Score</strong>
                      </div>
                      <Label circular color={colors} size="large">
                        {score}
                      </Label>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Description>
            </Card.Content>
          </Card>
            )
        })

        return(
            <Card.Group itemsPerRow={this.cardsperRow}>{userCard}</Card.Group>
        )
    }
}
function mapStateToProps({users}){
    return {users}
}

export default connect(mapStateToProps)(LeaderBoard)