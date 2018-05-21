window.onload=function () {
    //定义一个定位图片的方法
    imgLocation('picphoto','box');
    var imgData =[];
    for(i = 0;i<28;i++){
        imgData[i] ="./img/liu"+(1+i)+".png";
    }
    // console.log(imgData);
    window.onscroll=function () {//定义一个函数来判断什么时候加载新的图片
        if(checkLastImg()){

            for(var i=0; i<imgData.length;i++){

                var cparent=document.getElementById('picphoto');//先获得父级元素

                var cbox = document.createElement('div')//在父级元素下直接创建一个子级元素，取名为box；
                cbox.className='box';
                cparent.appendChild(cbox);//并且将box插到父级元素中
                var iBox=document.createElement('div');//在子级元素中又创建一个子元素，取名ibox
                iBox.className='imgbox';
                cbox.appendChild(iBox);                 //将子元素下面的子元素插入直接子元素中
                var oimg = document.createElement('img');//再创建一个元素img，含于oimg中
                oimg.src=imgData[i];//将满足循环的图片赋给oimg
                iBox.appendChild(oimg);//然后把的到的循环图片插到ibox中，因为父类和所有子类都有着包含关系，所以循环图片会传到父级元素进行加载
            }
            imgLocation('picphoto','box');
        }
    }

};
function imgLocation (parent,child) {
    var cparent=document.getElementById(parent);
    var cchild=document.getElementsByClassName(child);
    var imgWidth=cchild[0].offsetWidth;                                 //每个图片的宽度,,,,offsetwidth:对象可见的宽度。
    var imgNum=Math.floor(document.documentElement.clientWidth/imgWidth);//用客户端浏览器的宽度除以图片的宽度得到图片的个数
    cparent.style.cssText="width:"+imgWidth*imgNum + "px;margin:0 auto";//图片的宽度乘图片的个数可以得到大的盒子picphoto的宽度

    //定义一个数组来保存各个盒子的高度
    var imgHeightArr = [];
    for(var i = 0;i<cchild.length;i++){
        if(i<imgNum){
            imgHeightArr[i]=cchild[i].offsetHeight;                        //通过获得的图片个数来获取他的高度
        }
        else {
            var minHeight = Math.min.apply( null,imgHeightArr);             //通过math的方法获得最小的高度
            cchild[i].style.position='absolute';                            //
            cchild[i].style.top=minHeight + 'px';
            var mIndex = minIndex(imgHeightArr,minHeight);                  //获取第一排图片中最小的高度的序号
            cchild[i].style.left=cchild[mIndex].offsetLeft + 'px';          //设置水平方向的位置，用offsetleft获取，避免了图片的间距会加上盒子的间距
            imgHeightArr[mIndex] +=cchild[i].offsetHeight;                  //给当前所有图片的高度赋值
        }
    }
}
function minIndex(arr,minH) {
    for (i in arr) {
        if (arr[i] == minH) {
            return i;
        }
    }
}
    function checkLastImg() {
        // var cparent = document.getElementById('container');
        var cchild = document.getElementsByClassName('box');
        var lastHeight=cchild[cchild.length-1].offsetTop;//最后一个图片离顶部的高度
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//滚动条滚动的高度
        var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;//当前页面的高度
        // console.log(pageHeight);
        if(lastHeight < scrollTop + pageHeight){
            return true;
        }
    }