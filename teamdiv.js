var totalnum;    // 人数の合計
var teamnum;     // チームの数
var mnum;
var wnum;
var mmem = [];        // 男メンバー
var wmem = [];        // 女メンバー
var mteam = [];       // 男チーム
var wteam = [];       // 女チーム

function construct() {
    totalnum = data.length - 1;
    teamnum = document.getElementById("teamnum").value;
    for(var i = 0; i < teamnum; i++) {
        mteam[i] = [];
        wteam[i] = [];
    }
    divGender();
    sortGrade(mmem, mnum, mteam);
    sortGrade(wmem, wnum, wteam);


    var answer = document.getElementById('output');
    answer.innerHTML = mmem;
}

function divGender() {
    var m = 0;
    var w = 0;
    for(var i = 0; i < totalnum; i++) {
        if(data[i+1][2] == 0) {
            mmem[m] = data[i+1];
            m++;
        } else if(data[i+1][2] == 1) {
            wmem[w] = data[i+1];
            w++;
        }
    }
    mnum = m;
    wnum = w;
}

function sortGrade(mem, num, newteam) {
    var p = 0;
    var q = 0;
    for(var i = 0; i < num; i++) {
        var max = i;
        for(var j = i+1; j < num; j++) {
            if(mem[j][1] > mem[max][1]) max = j;
        }
        var x = mem[i];
        mem[i] = mem[max];
        mem[max] = x;
        newteam[p][q] = mem[i];
        if(p == teamnum - 1) {
            p = 0;
            q++;
        } else {
            p++;
        }
    }
}
