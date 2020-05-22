const logger = (store) => (next) => (action) => {
    console.group(action.type)
    console.log('The Action', action)
    const res = next(action)
    console.log('The new State is ', store.getState())
    console.groupEnd()
    return res
}

export default logger