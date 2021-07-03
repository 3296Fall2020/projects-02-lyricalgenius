export function getFromStorage(key){
    if(!key){
        return null;
    }
    try{
        const val = localStorage.getItem(key);
        if(val){
            return JSON.parse(val);
        }
        return null;
    } catch (err){
        return null;
    }
}

export function setInStorage(key, object){
    try{
        localStorage.setItem(key, JSON.stringify(object))
    } catch (err){
        
    }
}