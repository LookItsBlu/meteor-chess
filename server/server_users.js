export default {
    'addNewUser': (user_id, user_name, user_mail, user_password) => {
        Users.insert({
            userid: parseInt(user_id),
            name: user_name,
            mail: user_mail,
            pass: user_password
        })
    },
    'removeUser': (user_id) => {
        Users.remove({userid: parseInt(user_id)})
    },
    'createGame': () => {

    },
    'joinGame': () => {

    }
}
