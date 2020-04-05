// CSVのデータを格納する各種変数
var data = [];
var namae = [];
var grade = [];
var gender = [];
var level = [];

var btn = document.getElementById("button");
// btn.disabled = true;       //実行ボタンを押せなくする
// btn.style.opacity = 0.5;

var fileInput = document.getElementById("csvfile");
var teamnumInput = document.getElementById("teamnum");
var reader = new FileReader();

relesebtn();

fileInput.onchange = function(){
    relesebtn();      //ファイルが選択されたら実行ボタンを許可
};

teamnumInput.onchange = function(){
    relesebtn();      //チーム数が選択されたら実行ボタンを許可
};

// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    var result = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成

    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i = 0; i < tmp.length; ++i){
        result[i] = tmp[i].split(',');
    }
    return result;
}

function relesebtn(){
    if((fileInput.value) && (teamnum.value > 1)){
        btn.disabled = false;
        btn.style.opacity = 1.0;
    } else {
        btn.disabled = true;
        btn.style.opacity = 0.5;
    }
}

function execute(){                   //実行ボタンが押されたら実行される
    let file = fileInput.files[0];
    reader.readAsText(file);
    reader.onload = function(){
        //console.log(reader.result);
        data = convertCSVtoArray(reader.result);          //csvファイルのデータをdata配列に格納
        for(var i = 0; i < data.length-1; i++){           //namae、grade、gender、levelにそれぞれデータを格納
            namae[i] = data[i+1][0];
            grade[i] = data[i+1][1];
            gender[i] = data[i+1][2];
            level[i] = data[i+1][3];
        }
        construct();
    };
}