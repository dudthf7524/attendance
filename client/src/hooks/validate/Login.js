export const validateUserId = (user_id) => {
    const regex =
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;

    if (!user_id || user_id.trim() === "") {
        return "아이디를 입력해주세요.";
    }

    if (!regex.test(user_id.trim())) {
        return "아이디는 8~15자의 영문자와 숫자를 포함해야 합니다.";
    }

    return "";
};

export const validateUserPassword = (user_password) => {
    const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,15}$/;

    if (!user_password || user_password.trim() === "") {
        return "비밀번호를 입력해주세요.";
    }

    if (!regex.test(user_password.trim())) {
        return "비밀번호는 8~15자의 영문자, 숫자, 특수문자를 포함해야 합니다.";
    }

    return "";
};

export const validateUserName = (user_name) => {
    const regex =
        /^(?=.{1,10}$)[A-Za-z\uAC00-\uD7A3]+$/;

    if (!user_name || user_name.trim() === "") {
        return "이름을 입력해주세요.";
    }

    if (!regex.test(user_name.trim())) {
        return "이름은 1~10자리의 영문 또는 한글만 포함해야 합니다.";
    }

    return "";
};