const User = require('VIFitnessBackend/model/user')

const test = (req,res) => {
    res.json('Test is working')
}

const registerUser = async (req,res) => {
    try{
        const {name,password} = req.body;
        //check if name was entered
        if(!name){
            return res.json({
                error:'Name is required'
            })
        };
        //check if password is good
        if(!password || password.length < 6){
            return res.json({
                error:'Password is required and should be at least 6 characters long'
            })
        };
        //check for duplicate username
        const exist = await User.findOne({name})
        if(exist){
            return res.json({
                error:"Username has been taken"
            })
        }

        const user = await User.create({
            name,
            password
        })

        return res.json(user)
    }catch(error){
        console.log(error)
    }
}

module.exports={
    test,
    registerUser
}