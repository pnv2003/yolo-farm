export function invalidRange(min, max) {

    str = "Giá trị cần nhập ";

    // if (min === -Infinity && max === Infinity) {
    //     throw new Error("[-8, 8]?")
    // } else 
    if (min === -Infinity) {
        str += "không được lớn hơn " + max;
    } else if (max === Infinity) {
        str += "không được nhỏ hơn " + min;
    } else {
        str += "phải nằm trong khoảng " + min + " - " + max;
    }

    return str;
}
export function minMaxError() {
    return "Giá trị nhỏ nhất không thể lớn hơn giá trị lớn nhất";
}
export function requiredField() {
    return "Không thể bỏ trống"
}