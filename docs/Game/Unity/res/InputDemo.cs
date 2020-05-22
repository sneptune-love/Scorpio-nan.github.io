using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InputDemo : MonoBehaviour
{
    private bool isFar;

    public Camera camera;

    public float[] leval;

    private int index;

    // Start is called before the first frame update
    void Start()
    {
        this.camera = this.GetComponent<Camera>();
    }

    // Update is called once per frame
    void Update3()
    {
        //bool result = Input.GetMouseButton(0);
        //bool result1 = Input.GetMouseButtonDown(0);
        //bool result2 = Input.GetMouseButtonUp(0);

        bool res = Input.GetKey(KeyCode.A);

        if(Input.GetKey(KeyCode.C) && Input.GetKeyDown(KeyCode.D))
        {
            //
        }
    }

    void Update2()
    {
        /*
         * 需求: 做一个类似于狙击枪开镜的效果；
         * 分析: 添加一个摄像机, 让摄像机的焦距变化;
         * */

        if (Input.GetMouseButtonDown(1))
        {
            this.isFar = !this.isFar;
        }

   
        if (isFar)
        {
            camera.fieldOfView = Mathf.Lerp(camera.fieldOfView, 60, 0.1f);
        }
        else
        {
            camera.fieldOfView = Mathf.Lerp(camera.fieldOfView, 20, 0.1f);
        }

    }

    void Update()
    {

        /*
         * 需求: 做一个类似于狙击枪开镜的效果；
         * 分析: 添加一个摄像机, 让摄像机的焦距变化;
         * */

        if (Input.GetMouseButtonDown(1))
        {
            index = (index + 1) % leval.Length;
        }

        camera.fieldOfView = Mathf.Lerp(camera.fieldOfView, leval[index], 0.1f);
        if (Mathf.Abs(camera.fieldOfView - leval[index]) < 0.1f) camera.fieldOfView = leval[index];
    }
}
