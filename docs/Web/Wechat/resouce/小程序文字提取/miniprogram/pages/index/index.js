// miniprogram/pages/index/index.js
Page({
    /**
     * 点击立即转换
     */
    onTransferClick(ev){
        console.log("调用手机的拍照啊~");
        const {target : { dataset: { index }}} = ev;
        let souceType = ["camera"];
        if(index != 0) souceType = ["album"];
        wx.chooseImage({
            count: 1,
            sizeType:["original","compressed"],
            sourceType:souceType,
            success: res =>{
                const filePath = res.tempFilePaths[0];
                const cloudPath = `test/${Date.now()}${(filePath.match(/\.[^.]+?$/))[0]}`;
                this.uploadFile(filePath,cloudPath);
            }
        })
    },

    /**
     * 调用云函数读取图片内容
     */
    callCloudFunc(path){
        wx.cloud.callFunction({
            name:"readyFile",
            data:{
                path:path
            },
            success: res=>{
                console.log(res);
                const result = res.result;
                wx.hideLoading({
                    success: (res) => {},
                })
                this.openDetail(result);
            }
        })
    },

    /**
     * 上传文件
     */
    uploadFile(filePath,cloudPath){
        wx.showLoading({
            title: '正在读取文本内容~',
        })
        wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: result =>{
                const fileID = result.fileID;
                this.callCloudFunc(fileID);
            }
        })
    },
    /**
     * 跳转到新页面打开
     */
    openDetail(result){
        wx.navigateTo({
            url: '/pages/detail/detail',
            success:res =>{
                res.eventChannel.emit("fileResult",result);
            }
        })
    }
})