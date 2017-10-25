window.onload = function() {
	/**
	 * aqiData，存储用户输入的空气指数数据
	 * 示例格式：
	 * aqiData = {
	 *    "北京": 90,
	 *    "上海": 40
	 * };
	 */
	var aqiData = {};

	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	function addAqiData() {
		var aqiCity = document.getElementById('aqi-city-input').value.trim();
		var	aqiValue = document.getElementById('aqi-value-input').value.trim();
		if (!aqiCity.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
			alert("城市名必须为中英文字符!");
		} else if(!aqiValue.match(/^\d+$/)) {
			alert("空气质量指数必须为整数!");
		} else {
			aqiData[aqiCity] = aqiValue;
		}
	}

	/**
	 * 渲染aqi-table表格
	 */
	function renderAqiList() {
		var table = document.getElementById('aqi-table');
		// 先清空表格内容
		table.innerHTML = '';
		for (var aqiCity in aqiData) {
			// 判断table中是否包含子元素
			// 若没有这行将不能添加下一行
			if (table.children.length === 0) {
				table.innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
			}
			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
			td1.innerHTML = aqiCity;
			tr.appendChild(td1);
			var td2 = document.createElement('td');
			td2.innerHTML = aqiData[aqiCity];
			tr.appendChild(td2);
			var td3 = document.createElement('td');
			td3.innerHTML = '<button>删除</button>';
			tr.appendChild(td3);
			table.appendChild(tr);
		}
	}

	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
	  addAqiData();
	  renderAqiList();
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle(target) {
	  // do sth.
	  var tr = target.parentElement.parentElement;
	  var city = tr.children[0].innerHTML;
	  delete aqiData[city];
	  renderAqiList();
	}

	function init() {

	  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	  var btn1 = document.getElementById('add-btn')
	  btn1.onclick = addBtnHandle;
	  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	  var table = document.getElementById("aqi-table");
      var arrBtnDel = table.getElementsByClassName("del-btn");

      table.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            delBtnHandle(e.target);
        }
      })
	}

	init();

}
