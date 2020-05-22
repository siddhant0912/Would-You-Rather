import { LOAD_USERS, ADDED_QUESTIONS, ANSWERED_QUESTIONS } from '../Actions/users'


export default function users(state = {}, action) {
    switch (action.type) {
        case LOAD_USERS:
            return {...state, ...action.users }
        case ADDED_QUESTIONS:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    questions: [...state[action.authedUser].questions, action.id, ]
                }
            }
        case ANSWERED_QUESTIONS:
            return {
                ...state,
                [action.authedUser]: {
                    ...state[action.authedUser],
                    answers: {
                        ...state[action.authedUser].answers,
                        [action.id]: action.answers
                    }
                }
            }
        default:
            return state
    }
}