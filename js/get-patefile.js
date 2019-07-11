	//上传营业执照
		function upLoad(){
			var fileInput = document.getElementById("upimg");
	        var file = fileInput.files[0];
	        //创建读取文件的对象
	        var reader = new FileReader();         
	        //创建文件读取相关的变量
	        var imgFile;         
	        //为文件读取成功设置事件
	        reader.onload=function(e) {
	            // alert('文件读取完成');
	            imgFile = e.target.result;
	            // console.log(imgFile);
	            $("#imgg1").attr('src',imgFile);
	        };
	        //正式读取文件
	        reader.readAsDataURL(file);
		}
		//上传身份证正面
		function upLoadid(){
			var fileInput = document.getElementById("id");
	        var file = fileInput.files[0];
	        //创建读取文件的对象
	        var reader = new FileReader();         
	        //创建文件读取相关的变量
	        var imgFile;         
	        //为文件读取成功设置事件
	        reader.onload=function(e) {
	            // alert('文件读取完成');
	            imgFile = e.target.result;
	            console.log(imgFile);
	            $("#imgg2").attr('src',imgFile);
	        };
	        //正式读取文件
	        reader.readAsDataURL(file);
		}
			//上传身份证反面
		function upLoadidcard(){
			var fileInput = document.getElementById("idCard");
	        var file = fileInput.files[0];
	        //创建读取文件的对象
	        var reader = new FileReader();         
	        //创建文件读取相关的变量
	        var imgFile;         
	        //为文件读取成功设置事件
	        reader.onload=function(e) {
	            // alert('文件读取完成');
	            imgFile = e.target.result;
	            // console.log(imgFile);
	            $("#imgg3").attr('src',imgFile);
	        };
	        //正式读取文件
	        reader.readAsDataURL(file);
		}
		//上传Excel文件
//		function upLoadfile(){
//			var fileInput = document.getElementById("idCar");
//	        var file = fileInput.files[0];
//	        //创建读取文件的对象
//	        var reader = new FileReader();         
//	        //创建文件读取相关的变量
//	        var File;         
//	        //为文件读取成功设置事件
//	        reader.onload=function(e) {
//	            // alert('文件读取完成');
//	            File = e.target.result;
//	            console.log(File);
//	            $("#imgg4").attr('src',File);
//	        };
//	        //正式读取文件
//	        reader.readAsDataURL(file);
//		}