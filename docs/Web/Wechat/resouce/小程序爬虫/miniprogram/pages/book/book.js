// miniprogram/pages/book/book.js
//实现数据库的操作，需要初始化数据库设置
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:""
  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res.tempImagePath)
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  scancode(){
    wx.scanCode({
      success:res=>{
        wx.showLoading();
        console.log(res)
        //调用云函数
        wx.cloud.callFunction({
          name:"book15",//调用的是云端
          data:{
            a:10,
            b:4,
            isbn:res.result
          },
          success:res=>{
            //入库操作
            res.result.create_time = new Date().getTime();
            db.collection("books15").add({
              data:res.result
            })
            wx.hideLoading();
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }

  
})