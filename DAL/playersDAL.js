import { supabase } from "../db/supabaseDB.js";

const getPlayersDB = async () => {
    return (await supabase.from("players").select("*")).data;
}

const addPlayerDB = async (obj) => {
    return await supabase.from("players").insert(obj);
}

const updatePlayerDB = async (id, obj) => {
    return await supabase.from("players").update(obj).eq( "id", id );
}

export {
    getPlayersDB,
    addPlayerDB,
    updatePlayerDB
}