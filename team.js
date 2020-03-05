// CSVのデータを格納する各種変数
var data = [];
var namae = [];
var grade = [];
var gender = [];
var level = [];

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

//CSVファイルを読み込む
var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
req.open('GET', 'badmintonData.csv', true); // アクセスするファイルを指定
req.send(); // HTTPリクエストの発行

// レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ

req.onload = function(){
    // ここに処理を描く

    // 読み込んだＣＳＶファイル配列で取得
    data = convertCSVtoArray(req.responseText);
    // data配列をデータごとの配列に入れなおす
    for(var i = 0; i < data.length-1; i++){
        namae[i] = data[i+1][0];
        grade[i] = data[i+1][1];
        gender[i] = data[i+1][2];
        level[i] = data[i+1][3];
    }
}