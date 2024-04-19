const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');
const generateSecretkey = require('./generateSecretkey');
const session=require("express-session");
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:5004'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
};
app.use(cors(corsOptions));


const JWT_SECRET = generateSecretkey();
console.log(JWT_SECRET);

const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '3h' });
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token.replace('Bearer ', ''), JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        req.userId = decoded.userId; 
        next();
    });
};

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    mobile:{
        type:Number,
        required:true
    },
    confirmPassword: {
        type: String,
        required: true
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return candidatePassword === this.password;
};

const User = mongoose.model('User', userSchema,'signedupusers');

mongoose.connect('mongodb://localhost:27017/signup',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to database"))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.post('/api/signup', async (req, res) => {
    try {
        const { userName, email, password, confirmPassword, mobile } = req.body;

        if (!userName || !email || !password || !confirmPassword || !mobile) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: 'Passwords do not match' });
        }

        const existingUserByEmail = await User.findOne({ email });
        const existingUserByUsername = await User.findOne({ userName });
        const existingUserByMobile=await User.findOne({mobile});
        if (existingUserByEmail) {
            return res.status(400).json({ msg: 'User already exists with this email' });
        }
        if (existingUserByUsername) {
            return res.status(400).json({ msg: 'User already exists with this username' });
        }
        if (existingUserByMobile) {
            return res.status(400).json({ msg: 'User already exists with this mobile number' });
        }

        const newUser = await User.create({
            userName,
            email,
            password,
            mobile,
            confirmPassword
        });
        const token = generateToken(newUser._id);

        return res.status(201).json({
            msg: "User signed up successfully",
            token,
            user: newUser
        });
    } catch (error) {
        console.error('Error signing up user:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
});


app.post('/api/login',async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }
        
        const token = generateToken(user._id);
        return res.status(200).json({ msg: 'Login successful',token, user:{email:user.email,username:user.userName} });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
});


const cartItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    itemId: {
        type: Number, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const CartItem = mongoose.model('CartItem', cartItemSchema,'cartitems');


app.post('/api/addtocart',verifyToken, async (req, res) => {
    try {
        const token = req.headers.authorization; 

        jwt.verify(token.replace('Bearer ', ''), JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }

            
            const { itemId, name, quantity, price } = req.body;

            
            if (!itemId || !name || !quantity || !price) {
                return res.status(400).json({ msg: 'All fields are required' });
            }

           
            const userId = decoded.userId;

            
            const newCartItem = await CartItem.create({
                user: userId,
                itemId,
                name,
                quantity,
                price
            });

            return res.status(201).json({
                msg: 'Item added to cart successfully',
                cartItem: newCartItem
            });
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
});



app.get('/api/cart-items', async (req, res) => {
    try {
        const token = req.headers.authorization; 
        
        jwt.verify(token.replace('Bearer ', ''), JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }

          
            const userId = decoded.userId;

            
            const cartItems = await CartItem.find({ user: userId });

            return res.status(200).json(cartItems);
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

app.delete('/api/deleteCartItem/:itemId', async (req, res) => {
    try {
        const token = req.headers.authorization; 
        
        jwt.verify(token.replace('Bearer ', ''), JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }

            
            const userId = decoded.userId;
            const itemId = req.params.itemId;

           
            const cartItem = await CartItem.findOneAndDelete({ user: userId, itemId: itemId });

            if (!cartItem) {
                return res.status(404).json({ msg: 'Cart item not found' });
            }

            return res.status(200).json({ msg: 'Cart item deleted successfully' });
        });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).json({ msg: 'Server error' });
    }
});

const GoogleLoginSchema = new mongoose.Schema({
    googleEmail: {
        type: String,
        required: true,
        unique: true
    },
    googleUserName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    googleId: {
        type: String,
        required: true,
        unique: true
    }
});

const GoogleLogin = mongoose.model('GoogleLogin', GoogleLoginSchema);

const clientid = "502417525504-r1ad88a8n7c38unlter2dfo5n189ivp5.apps.googleusercontent.com"
const clientsecret = "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"

app.use(session({
    secret:"14454h5h5hhttgeef48488",
    resave:false,
    saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let existingUser = await GoogleLogin.findOne({ googleId: profile.id });

            if (!existingUser) {
                const newUser = new GoogleLogin({
                    googleEmail: profile.email,
                    googleUserName: profile.displayName,
                    image: profile.picture,
                    googleId: profile.id
                });
                await newUser.save();
                done(null, newUser);
            } else {
                done(null, existingUser);
            }
        } catch (error) {
            console.error('Error storing session data:', error);
            done(error);
        }
    })
);
passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await GoogleLogin.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});


app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/Dashboard",
    failureRedirect:"http://localhost:3000/login",
}))
app.get("/login/sucess",async(req,res)=>{

    if (req.user) {
        const { googleEmail, googleUserName, image, googleId } = req.user;
        res.status(200).json({ message: "user Login", user: req.user });

        // Update localStorage
        localStorage.setItem('googleEmail', googleEmail);
        localStorage.setItem('googleUsername', googleUserName);
        localStorage.setItem('image', image);
        localStorage.setItem('googleId', googleId);
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
});
app.get('/login/failure', (req, res) => {
    res.status(401).json({
        msg: 'Login failed'
    });
});
app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        localStorage.removeItem('googleId');
        localStorage.removeItem('googleEmail');
        localStorage.removeItem('googleUsername');
        localStorage.removeItem('image');
        res.redirect("http://localhost:3000");
    })
})

app.listen(5004, () => {
    console.log("Server on port 5004 connected");
});

