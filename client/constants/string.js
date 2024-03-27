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
export const MODE_AUTOMATIC_DESCRIPTION = "Thiết bị được kích hoạt khi độ ẩm đất vượt quá phạm vi cho phép.";
export const MODE_SCHEDULED_DESCRIPTION = "Thiết bị có thể được kích hoạt theo lịch biểu được xác định sẵn.";
export const MODE_MANUAL_DESCRIPTION = "Thiết bị được bật tắt thủ công thông qua ứng dụng.";
export const CANCEL = "Hủy bỏ";
export const CONFIRM = "Xác nhận";


//
export function modeConfirm(device, mode) {
    return "Bạn có chắc chắn muốn thay đổi chế độ của " + device + " thành " + mode + "?";
}