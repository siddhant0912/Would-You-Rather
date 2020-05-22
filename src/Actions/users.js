export const LOAD_USERS = 'LOAD_USERS'
export const ANSWERED_QUESTIONS = 'ANSWERED_QUESTIONS'
export const ADDED_QUESTIONS = 'ADDED_QUESTIONS'


export function loadUsers(users) {
    return {
        type: LOAD_USERS,
        users
    }
}


export function addedQuestionS({ authedUser, id, }) {
    return {
        type: ADDED_QUESTIONS,
        authedUser,
        id
    }
}

export function AnsweredQuestions({ authedUser, id, answer }) {
    return {
        type: ANSWERED_QUESTIONS,
        answer,
        id,
        authedUser,

    }
}