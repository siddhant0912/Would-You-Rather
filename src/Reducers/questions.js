import { LOAD_QUESTIONS, ADD_QUESTION, ANSWER_QUESTIONS } from '../Actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case LOAD_QUESTIONS:
            return {...state, ...action.questions }
        case ANSWER_QUESTIONS:
            const { authedUser, id, answer } = action
            return {
                ...state,
                [id]: {
                    ...state[id],
                    [answer]: {
                        ...state[id][answer],
                        votes: [...state[id][answer].votes, authedUser]
                    }
                }
            }

        case ADD_QUESTION:
            const { question } = action
            return {
                ...state,
                [question.id]: question
            }
        default:
            return state
    }
}