const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');
const generateSecretkey = require('./generateSecretkey');
const session=require("express-session");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5004'],
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


// const clientID= "502417525504-r1ad88a8n7c38unlter2dfo5n189ivp5.apps.googleusercontent.com",
// const clientSecret= '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';
// app.use(session({
//     secret:"156729873hahgdfy",
//     resave:false,
//     saveUninitialized: false
// }))

const googleSchema=new mongoose.Schema({
    
    name:String,
    email:String,
    image:String,
    googleId: String
},{timestamps:true})
const GoogleLogin = mongoose.model('googleLogin', googleSchema,'googlelogin');

app.use(session({
    secret: generateSecretkey(),
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: "502417525504-r1ad88a8n7c38unlter2dfo5n189ivp5.apps.googleusercontent.com",
    clientSecret: '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',
    // callbackURL:"http://localhost:5004/api/google-login"
    callbackURL: "http://localhost:5004/auth/google/callback"
    // callbackURL:"http://localhost:3000/Dashboard"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user exists in the database
        let user = await GoogleLogin.findOne({ googleId: profile.id });

        if (!user) {
            // Create a new user if not exists
            user = new GoogleLogin({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                image: profile.photos[0].value,
            });
            await user.save();
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    GoogleLogin.findById(id, (err, user) => {
        done(err, user);
    });
});

// Google OAuth login route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/api/google-login-success',
    failureRedirect: '/api/google-login-failure'
}));

// POST endpoint to handle successful Google login
app.post('/api/google-login-success', (req, res) => {
    const { email, name, image } = req.user;
    res.status(200).json({
        msg: 'Login successful',
        email,
        name,
        image
    });
});
// POST endpoint to handle failed Google login
app.post('/api/google-login-failure', (req, res) => {
    res.status(401).json({
        msg: 'Login failed'
    });
});
// POST endpoint to store session data in DB
app.post('/api/google-login', async (req, res) => {
    const { email, name, image } = req.body;

    try {
        let user = await GoogleLogin.findOne({ email });

        if (!user) {
            user = new GoogleLogin({
                email,
                name,
                image
            });
            await user.save();
        }

        res.status(200).json({
            msg: 'Session data stored successfully',
            user
        });
    } catch (error) {
        console.error('Error storing session data:', error);
        res.status(500).json({
            msg: 'Error storing session data'
        });
    }
});
// async (req,res, profile, done) => {
//     try {
//         const { displayName, email, image } = req.user;
//         let user = await googleLogin.findOne({ googleId: profile.displayName});

//         if (!user) {
//             // If the user doesn't exist, create a new user
//             user = new googleLogin({
                
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 image: profile.photos[0].value
               
//             });

//             // Save the new user to the database
//             await user.save();
//         }
//         res.redirect('http://localhost:3000/Dashboard');
//     } catch (error) {
//         console.error('Error during Google OAuth login:', error);
//         res.status(500).json({ message: 'Server error' });
//        return done(error, null);
//     }

// }));

// // Serialize user
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// // Deserialize user
// passport.deserializeUser((id, done) => {
//     googleLogin.findById(id, (err, user) => {
//         done(err, user);
//     });
// });

// // Route for initiating Google OAuth login
// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Route for handling Google OAuth callback
// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
//     (req, res) => {
//         console.log("Google OAuth authentication successful");
//         // Successful authentication, redirect to desired location
//         res.redirect('http://localhost:3000/Dashboard');
//     });


//     app.get("/login/success",async(req,res)=>{

//         if(req.user){
//             res.status(200).json({message:"user Login",user:req.user})
//         }else{
//             res.status(400).json({message:"Not Authorized"})
//         }
//     })
    
//     app.get("/logout",(req,res,next)=>{
//         req.logout(function(err){
//             if(err){return next(err)}
//             res.redirect("http://localhost:3000");
//         })
//     })

    // app.post('/api/signup/google', async (req, res) => {
    //     try {
    //         const { email, name } = req.body;
    
            
    //         let existingUser = await googleLogin.findOne({ email });
    
    //         if (!existingUser) {
                
    //         existingUser = new googleLogin({
    //             googleId: profile.id,
    //             displayName: profile.displayName,
    //             email: profile.emails[0].value,
    //             image: profile.photos[0].value
                    
    //             });
    
                
    //             await existingUser.save();
    
                
    //             res.status(201).json({ message: 'User signed up successfully', user: existingUser });
    //         } else {
    //             console.log("User found in the database");
                
    //             res.status(200).json({ message: 'User already exists', user: existingUser });
    //         }
    //     } catch (error) {
    //         console.error('Error during Google OAuth signup:', error);
           
    //         res.status(500).json({ message: 'Server error' });
    //     }
    // });
 


app.listen(5004, () => {
    console.log("Server on port 5004 connected");
});

