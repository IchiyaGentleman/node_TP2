const { getCollection } = require('./mongodb.js');

async  function  findOne(collectionName, query, options = {}) {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.findOne(query, options);
        return  result;
    }catch (e){
        console.log(`Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`);
        console.log(e);
        throw  e;
    }
}

// Find
async function find(collectionName, query, options = {}) {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.find(query, options).toArray();
        return result;
    }catch (e){
        console.log(`Error executing find function with the following parameters: ${query}`);
        console.log(e);
        throw e;
    }
}

// Insert one
async function insertOne(collectionName, doc) {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.insertOne(doc);
        return result;
    }catch (e){
        console.log(`Error executing insertOne function with the following document: ${doc}`);
        console.log(e);
        throw e;
    }
}

// Insert many
async function insertMany(collectionName, docs) {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.insertMany(docs);
        return result;
    }catch (e){
        console.log(`Error executing insertMany function with the following documents: ${docs}`);
        console.log(e);
        throw e;
    }
}

// Update one
async function updateOne(collectionName, query, update, options = {}) {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.updateOne(query, update, options);
        return result;
    }catch (e){
        console.log(`Error executing updateOne function with the following parameters: ${query}, ${update}`);
        console.log(e);
        throw e;
    }
}

// Update many
async function updateMany(collectionName, query, update, options = {}) {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.updateMany(query, update, options);
        return result;
    }catch (e){
        console.log(`Error executing updateMany function with the following parameters: ${query}, ${update}`);
        console.log(e);
        throw e;
    }
}

// Replace one
async function replace(collectionName, query, replacement, options = {}) {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.replaceOne(query, replacement, options);
        return result;
    }catch(e){
        console.log(`Error executing replace function with the following parameters: ${query}, ${replacement}`);
        console.log(e);
        throw e;
    }
}

// Delete one
async function deleteOne(collectionName, query) {
    try{
        const collection = getCollection(collectionName);
        const result = await collection.deleteOne(query);
        return result;
  }catch(e){
      console.log(`Error executing deleteOne function with the following query: ${query}`);
      console.log(e);
      throw e;
  }
}

// Delete many
async function deleteMany(collectionName, query) {
  try{
      const collection = getCollection(collectionName);
      const result = await collection.deleteMany(query);
      return result;
  }catch(e){
      console.log(`Error executing deleteMany function with the following query: ${query}`);
      console.log(e);
      throw e;
  }
}
