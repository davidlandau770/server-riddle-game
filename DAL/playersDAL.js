import { supabase } from "../db/supabaseDB.js";

const getPlayersDB = async () => {
    return (await supabase.from("players").select("*")).data;
}

const addPlayerDB = async (obj) => {
    return await supabase.from("players").insert(obj);
}

const updatePlayerDB = async (name, best_time) => {
    return await supabase.from("players").update({ "best_time": best_time }).eq( "username", name );
}

// פונקציות עזר:

// const 

export {
    getPlayersDB,
    addPlayerDB,
    updatePlayerDB
}