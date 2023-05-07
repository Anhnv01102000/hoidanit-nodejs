import registerService from "../service/registerService"

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}

const handleRegister = async (req, res) => {
    try {
        // req.body: email, phone, username, password
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters', // error message
                EC: '1', // error code
                DT: '' // data
            })
        }

        // service: Create user
        let data = await registerService.registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '' // data
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error from server', // error message
            EC: '-1', // error code
            DT: '' // data
        })
    }
}

module.exports = {
    testApi, handleRegister
}