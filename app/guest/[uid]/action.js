'use server'
import clientPromise from "../../../mongo/client";


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

export const fetchNhatky = async (username, muavu) => {
	// @ts-ignore
	try {
		const logsRes = await fetch(`http://test.nhanchauthanhdt.vn/api/nhatky/fetch?user=${username}&muavu=${muavu}`);
        nhatkys = await logsRes.json();
		console.log(nhatkys);
		
		return nhatkys
	}
	 catch (e) {
		return null
	}

}