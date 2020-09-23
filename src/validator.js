export const validateEmail = (str) => {
    var filter = /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/;
    return String(str).search (filter) !== -1;
}

export const validatePassword = (str) => {
    if (str.match(/[a-z]/g) && str.match( 
        /[A-Z]/g) && str.match( 
        /[0-9]/g) && str.match( 
        /[^a-zA-Z\d]/g) && str.length >= 8) 
        return true; 
    else 
        return false; 
}