
export default function datePickerOption(){
    return {
        type: 'min',
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: '',
        inputStyle: {
          'color': '#555',
          'background-color': '#fff'
        },
        inputClass:'form-control laydate-icon',
        color: {
            header: '#ccc',
            headerText: '#f00'
        },
        buttons: {
            ok: '确认',
            cancel: '取消'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
    }
}
