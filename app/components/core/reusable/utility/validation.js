// const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const pseudoIsValid = (pseudo) => {
    return pseudo.length >= 4;
};

export const passwordIsValid = (pwd) => {
    if (pwd) {
        if (!/^.*(?=.{8,}).*$/.test(pwd))
            return [false, 'Password must be have at least 8 characters'];
        if (!/^.*(?=.*[a-zA-Z]).*$/.test(pwd))
            return [false, 'Password must have letters'];
        if (!/^.*(?=.*\d).*$/.test(pwd))
            return [false, 'Password must have at least 1 digit'];
        if (!/^.*(?=.*[!#$%&?]).*$/.test(pwd))
            return [false, 'Password must have at least 1 special character'];
        return [true];
    }
    return [false, 'Password field is empty'];
};

export const emailIsValid = (email) => {
    return emailRegex.test(email);
};
