import { _getUsers, _getQuestions } from '../Utils/_DATA'
import { loadUsers } from './users'

import { loadQuestions } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'


export const handleInitialData = () => {
    return async(dispatch) => {
        dispatch(showLoading())
        try {
            const users = await _getUsers()
            const questions = await _getQuestions()
            dispatch(loadUsers(users))
            dispatch(loadQuestions(questions))
            dispatch(hideLoading())
        } catch (e) {

        }
    }
}