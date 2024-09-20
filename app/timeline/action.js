'use server'
import clientPromise from "../../mongo/client";


export const sendContact = async (data) => {
	// @ts-ignore
	try {
        const { db } = await clientPromise;
        const collection = db.collection("contacts");
        let result = await collection.insertOne({...data, createAt: new Date()});
		return result
	}
	 catch (e) {
		return null
	}

}