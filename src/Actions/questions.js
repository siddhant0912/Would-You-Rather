import { _saveQuestion, _saveQuestionAnswer } from '../Utils/_DATA'
import { addedQuestionS, AnsweredQuestions } from './users'
import { showLoading, hideLoading } from 'react-redux-loading'

export const LOAD_QUESTIONS = 'LOAD_QUESTIONS'
export const ANSWER_QUESTIONS = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'


export function loadQuestions(questions) {
    return {
        type: LOAD_QUESTIONS,
        questions
    }
}

function answerQuestion({ authedUser, id, answer }) {
    return {
        type: ANSWER_QUESTIONS,
        authedUser,
        id,
        answer
    }

}

export function handleAnswerQuestion({ authedUser, id, answer }) {

    return async(dispatch) => {
        dispatch(showLoading())
        try {
            await _saveQuestionAnswer({ authedUser, id, answer })
            dispatch(answerQuestion({ authedUser, id, answer }))
            dispatch(AnsweredQuestions({ authedUser, id, answer }))
            dispatch(hideLoading())
        } catch (e) {
            alert('Something Went Wrong')
        }
    }
}

function addQuestion({ question }) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion({ optionOne, optionTwo, author }) {
    return async(dispatch) => {
        dispatch(showLoading())
        try {
            const question = await _saveQuestion({ optionOne, optionTwo, author })
            dispatch(addedQuestionS({ authedUser: author, id: question.id }))
            dispatch(addQuestion({ question }))
            dispatch(hideLoading())
        } catch (e) {
            alert('Something went wrong')

        }
    }
}