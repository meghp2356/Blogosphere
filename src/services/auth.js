import { Client, Account, ID } from "appwrite";
import config from "../conf/config";


class authServices {
  client;
  account;

  constructor() {
    this.client = new Client()
      .setEndpoint(config.endPoint)
      .setProject(config.projectId);

    this.account = new Account(this.client);
    
  }

  async createACcount({ email, password, username }) {
    try {
      const response = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );
    //   await this.account.createVerification('/Login')
      return response;
    } catch (err) {
      console.log("error from create account ::", err);
      throw err;
    }
  }

  async login({ email, password }) {
    try {

      return await this.account.createEmailSession(email,password)

    } catch (err) {

      console.log("error from login ::", err);
       throw err;
    }
  }

  async logout() {
    try {
      const response = await this.account.deleteSession("current");
      return response;
    } catch (err) {
      console.log("error from logout ::", err);
      return err;
    }
  }

  async getAccount() {
    try {

      return await this.account.get()
      
    } catch (err) {
      console.log("error from getAccount ::");
      throw err;
    }
  }

}

const auth = new authServices();

export default auth;
