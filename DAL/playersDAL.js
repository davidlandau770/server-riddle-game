import { supabase } from "../db/supabaseDB.js";

const getPlayersDB = async () => {
    const { data, error } = await supabase.from("players").select("*");
    if (error) {
        return console.log(`getPlayerDB: ${error}`);
    }
    return data;
}

const addPlayerDB = async (obj) => {
    const { data, error } = await supabase.from("players").insert(obj);
    if (error) {
        console.log(`addPlayerDB: `);
        console.log(error);
        return
    }
    return data
}

const updatePlayerDB = async (name, best_time) => {
    const { data, error } = await supabase.from("players").update({ "best_time": best_time }).eq("username", name);
    if (error) {
        console.log(`updatePlayerDB: `);
        console.log(error);
        return
    }
    return data
}

export {
    getPlayersDB,
    addPlayerDB,
    updatePlayerDB
}