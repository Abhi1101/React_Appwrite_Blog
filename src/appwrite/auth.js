import conf from "../conf/conf";
import { Client, Account, ID } from 'appwrite';

export class Authservice {
    clint = new Client;
    account;

    constructor() {
        this.clint
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.clint);
    };


    async createAccount({ email, password, name }) {

        try {

            // const user = await this.account.create(ID.unique(),email , password , name );
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            });

            if (userAccount) {
                return this.login({ email, password });
            }
            else {
                return userAccount;
            }

        } catch (error) {
            throw error;
        }


    }

    async login({ email, password }) {

        try {
            return await this.account.createEmailPasswordSession({
                email: email,
                password: password
            })
        }
        catch (error) {
            throw error
        }



    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite service :: getCurrentuser error :: ", error);
        };

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite service :: logout error :: ", error);
        }
    }


}

const authservice = new Authservice();

export default authservice