// miniprogram/pages/detail/detail.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        text:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on("fileResult",res =>{
            const { words_result } = res;
            let str = "";
            for(let i = 0; i < words_result.length; i++){
                str += words_result[i].words + "\n";
            }
            this.setData({
                text:str
            })
        })
    },
})