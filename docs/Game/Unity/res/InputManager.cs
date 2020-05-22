using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InputManager : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update1()
    {
        bool result = Input.GetButton("虚拟轴名称");
        Input.GetButtonDown("虚拟轴名称");
        Input.GetButtonUp("虚拟轴名称");

        float a = Input.GetAxis("虚拟轴名称");
        float b = Input.GetAxisRaw("虚拟轴名称");
    }

    void Update()
    {
        /*
         * 需求: 做人物在3d 场景内的鼠标滚动操作;
         * 类似第一视角类游戏的场景旋转
         **/

        //鼠标左右移动
        float x = Input.GetAxis("Mouse X");
        float y = Input.GetAxis("Mouse Y");


        //Y 轴旋转;
        this.transform.Rotate(-y, 0, 0);
        //左右旋转需要延世界坐标旋转
        this.transform.Rotate(0, x, 0, Space.World);
    }
}
