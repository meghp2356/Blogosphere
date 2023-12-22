import { Client ,Databases, ID , Storage  , Query } from 'appwrite'
import config  from '../conf/config'

class services{

    client
    database
    storage

    constructor(){
        this.client = new Client()
        .setEndpoint(config.endPoint)
        .setProject(config.projectId)

        this.database = new Databases(this.client);
        this.storage = new Storage (this.client);
    }

    async createPost({title,slug,content,image,status,userid}){
        try{
           return await this.database.createDocument(
                config.databaseId,
                config.collectionID,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userid,
                }
            )
        }catch(err){
            console.log('error from createPost::',err)
            throw err
        }
    }

    async getPost(slug){
        try{
            return await this.database.getDocument(
                config.databaseId,
                config.collectionID,
                slug
            )
        }catch(err){
            console.log('error from getPost::',err)
            throw err
        }
    
    }
    
    async listPost(query = [Query.equal('status','active')]){
        try{
            return await this.database.listDocuments(
                config.databaseId,
                config.collectionID,
                query
            )
        }catch(err){
            console.log('error from listPost::',err)
            throw err
        }
    
    }

    async updatePost(slug,{title,content,image,status,userid}){
        try{
            return await this.database.updateDocument(
                config.databaseId,
                config.collectionID,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userid
                }
                
            )
        }catch(err){
            console.log('error from updatePost::',err)
            throw err
        }

    }

    async deletePost(slug){
        try{
            return await this.database.deleteDocument(
                config.databaseId,
                config.collectionID,
                slug
            )
        }catch(err){
            console.log('error from deletePost::',err)
            throw err
        }

    }

    async createFile(file){
        try{
            return await this.storage.createFile(
                config.storageID,
                ID.unique(),
                file
            )
        }catch(err){
            console.log('error from createFile::',err)
            throw err
        }

    
    }

      filePreview(fileId){
        try{
            return this.storage.getFilePreview(
                config.storageID,
                fileId,
            )
        }catch(err){
            console.log('error from filePreview::',err)
            throw err
        }

    
    
    }

    async deleteFile(fileId){
        try{
            return await this.storage.deleteFile(
                config.storageID,
                fileId
            )
        }catch(err){
            console.log('error from deleteFile::',err)
            throw err

        }
    }



}

const service = new services()
export default service
