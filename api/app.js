// Import native 'node.js' modules
import path from "path";

// Import dependencies
import express from "express";
import expressLayouts from "express-ejs-layouts";
import {} from "dotenv/config.js";
import helmet from "helmet";
import flash from "connect-flash";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import MySQLSession from "express-mysql-session";
import cookieParser from "cookie-parser";
import csrf from 'csurf'
import cors from 'cors'



// Import constants from own file 'app-config.js'
import {
  APP_PORT,
  // VIEWS,
  options,
  cookie
} from "./src/config/app-config.js";

let MySQLStore = MySQLSession(session);
let sessionStore = new MySQLStore(options);

const app = express();
var csrfProtection = csrf({ cookie: true })


// Helmet middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  allowedHeaders: [
    'Content-Type',
  ]
}))

// Passport config
import defaultExport from "./src/config/passport.js";
defaultExport(passport);

// Allow "public" folder to serve static files
app.use(express.static('public'));

// Body parser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
  key: cookie.name,
  secret: cookie.secret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());


// Connect flash
app.use(flash());

// Cookie parser
app.use(cookieParser());

// app.use(csrf({cookie: true}));



// Global variables
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Credentials", true);
  // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
  // res.locals._csrf = req.csrfToken();
  // var token = req.csrfToken();
  // res.cookie('XSRF-TOKEN', token);
  // res.locals.csrfToken = token;
  // res.locals.success_msg = req.flash('success_msg');
  // res.locals.error_msg = req.flash('error_msg');
  // res.locals.warning_msg = req.flash('warning_msg');
  // res.locals.error = req.flash('error');
  next();
});



// Set templating engine
app.use(expressLayouts);
app.set('view engine', 'ejs');


// Routes for views in 'views/public'
import { router as router_public } from "./src/routes/public.js";
app.use("/", router_public);

app.get('/', (req, res) => {
  res.send('HEY!')
})

app.listen(APP_PORT, () => {
  console.log(`Server started on port ${APP_PORT}...`);
});
