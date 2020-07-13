export const VALIDATION_PATTERN = {
    // eslint-disable-next-line no-useless-escape
    email: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
    password: /^[a-zA-Z0-9$#.@]{8,30}$/,
    mobile: /[3-9]{1}\d{9}/, //First digit should be more than 2
};
