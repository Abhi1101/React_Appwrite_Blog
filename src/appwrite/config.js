import conf from "../conf/conf";
import { Client, ID, Storage, TablesDB, Query, Databases } from 'appwrite';
import authservice from "./auth";


export class Service {
    clint = new Client;
    databases;  
    tablesDB;
    bucket;

    constructor() {
        this.clint
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.clint);     
        this.tablesDB = new TablesDB(this.clint);

        this.bucket = new Storage(this.clint);
    };

    async createPost({ slug,title,  content, featuredImage, status, userId }) {

        try {
            // return await conf.tablesDB.createRow(
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );

        }
        catch (error) {
            console.log("appwrite config :: createpost error :: ", error);

        }

    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            // return await this.tablesDB.updateRow(
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch (error) {
            console.log("appwrite config :: updatePost error :: ", error);
        }

    }

    async deletePost(slug) {
        try {
            // await this.tablesDB.deleteRow(
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            )
            return true
        }
        catch (error) {
            console.log("appwrite config :: deletePost error :: ", error);
            return false;
        }

    }

    async getPost(slug) {
        try {
            // return await this.tablesDB.getRow(
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                slug
            )

        } catch (error) {
            console.log("appwrite config :: getPost error :: ", error);
            return false
        }

    }

    async getPosts(quaries = [Query.equal("status", "active")]) {
        try {

            // return await this.tablesDB.listRows(
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTableId,
                quaries
            )

        } catch (error) {
            console.log("appwrite config :: getPosts error :: ", error);
            return false
        }

    }

    // FILE UPLOAD SERVICES 

    async uploadFile(file) {
        try {

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch (error) {
            console.log("appwrite config :: uploadFile error :: ", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }
        catch (error) {
            console.log("appwrite config :: uploadFile error :: ", error);
            return false
        }
    }

    getFilePreview(fileId) {
       return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )

    }




}

const service = new Service();

export default service;
