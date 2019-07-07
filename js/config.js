const BASE_URL = "https://show.maiboparking.com";

var config = {
    mon_number: BASE_URL + "/index/platform/income_comparison", //左上 收入对比
    current_ratio: BASE_URL + "/index/platform/parking_length", //左中 当前城市的停车时长
    all_city: BASE_URL + "/index/platform/get_available_province", //所有可用省份
    stop_info: BASE_URL + "/index/platform/get_city_info", //获取城市的停车信息 总车位 占有车位利用率
    all_city_stop: BASE_URL + "/index/platform/get_country_parking", //获取全国所有的停车场
    shoufei_paihang: BASE_URL + "/index/platform/change_rankings", // 城市的收费排行
    zuori_yunying: BASE_URL + "/index/platform/yesterday_operation", // 昨日运营
    one_stop_info: BASE_URL + "/index/platform/get_parking_info", // 获取单个停车场详情
    device_error: BASE_URL + "/index/platform/device_warning", // 设备警告
    china_new_plot: BASE_URL + "/index/platform/get_now_parking_img_list" // 获取最新的停车场
}