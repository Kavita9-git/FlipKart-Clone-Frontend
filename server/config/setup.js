import AdminJS from 'adminjs';
import AdminJSExpress from "@adminjs/express";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Order from "../models/order.js";
import User from "../models/user.js";
import Transaction from '../models/transaction.js';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { COOKIE_PASSWORD } from "./config.js";
import { dark, light, noSidebar } from "@adminjs/themes";
import { productOptions } from "../models/productoptions.js";
import Banner from '../models/banner.js'  // ✅ correct path


AdminJS.registerAdapter(AdminJSMongoose);

const DEFAULT_ADMIN = {
  email: "kavita@gmail.com",
  password: "12345678"
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

export const buildAdminJS = async (app) => {
  // ✅ Merge and log product options
  const mergedProductOptions = {
    navigation: "Kart",
    ...productOptions,
  };
  console.log("Merged product options:", mergedProductOptions);

  const admin = new AdminJS({
    resources: [
      {
        resource: Product,
        options: mergedProductOptions
      },
      {
        resource: Category,
        options: {
          navigation: "Kart"
        }
      },
      {
        resource: Order,
        options: {
          navigation: "Kart"
        }
      },
      {
        resource: User,
        options: {
          navigation: "Kart"
        }
      },
      {
        resource: Transaction,
        options: {
          navigation: "Kart"
        }
      },
      {
      resource: Banner,                      // ✅ Add Banner here
      options: { 
        navigation: "Kart" 
      }     
    },
    ],

    branding: {
      companyName: "Kart",
      withMadeWithLove: false,
      favicon: "https://static.vecteezy.com/system/resources/thumbnails/016/712/564/small_2x/3d-render-illustration-of-project-management-analysis-result-icon-png.png",
      logo: "https://3.bp.blogspot.com/-p71Wb-_HyfY/WX-xnV1I9YI/AAAAAAAAAGI/9M15g0Usv2Iv8V0LRRUGmY3Y8OliXOY8gCLcBGAs/s1600/Project_logo.png",
    },
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    rootPath: "/admin"
  });

  const MongoDBStore = ConnectMongoDBSession(session);
  const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: COOKIE_PASSWORD
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: COOKIE_PASSWORD,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs"
    }
  );

  app.use(admin.options.rootPath, adminRouter);
};
