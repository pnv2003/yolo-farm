export const IRRIGATION = 'Tưới tiêu';
export const WATER_PUMP = 'Máy bơm nước';
export const ON = 'Đang hoạt động';
export const OFF = 'Đã tắt';
export const SOIL_MOISTURE = 'Độ ẩm đất';
export const MODE = 'Chế độ';
export const AUTOMATIC = 'Tự động';
export const SCHEDULED = 'Xếp lịch';
export const MANUAL = 'Thủ công';
export const DEVICE = 'Thiết bị';
export const METRIC = 'Thông số';
export const SETTINGS = 'Cài đặt';
export const SCHEDULE = 'Lịch biểu';
export const ALLOWED_RANGE = 'Phạm vi';
export const MODE_AUTOMATIC_DESCRIPTION = "Thiết bị được kích hoạt khi điều kiện môi trường vượt quá phạm vi cho phép.";
export const MODE_SCHEDULED_DESCRIPTION = "Thiết bị có thể được kích hoạt theo lịch biểu được xác định sẵn.";
export const MODE_MANUAL_DESCRIPTION = "Thiết bị được bật tắt thủ công thông qua ứng dụng.";
export const SOIL_MOISTURE_RANGE_DESCRIPTION = "Tùy chỉnh phạm vi giá trị để nhận được cảnh báo khi giá trị vượt quá giới hạn, và có thể kích hoạt thiết bị tương ứng để điều chỉnh nếu sử dụng chế độ tự động.";
export const CANCEL = "Hủy bỏ";
export const CONFIRM = "Xác nhận";
export const SAVE = "Lưu";
//
export const LIGHT_INTENSITY = 'Cường độ ánh sáng';
export const TEMPERATURE = 'Nhiệt độ';
export const AIR_HUMIDITY = 'Độ ẩm không khí';
//
export const LIGHT_CONTROL = 'điều chỉnh ánh sáng';
export const TEMP_CONTROL = 'điều chỉnh nhiệt độ';
export const AIR_HUMI_CONTROL = 'điều chỉnh độ ẩm kk';
export const FAN = 'Quạt mini';
//
export const SOIL_MOISTURE_UNIT = "%";
export const TEMP_UNIT = String.fromCharCode(176) + "C";
export const LIGHT_INTENSITY_UNIT = "lux";
export const AIR_HUMIDITY_UNIT = "%";

//
export function modeConfirm(task, mode) {
    return "Bạn có chắc chắn muốn thay đổi chế độ " + task + " thành " + mode + "?";
}