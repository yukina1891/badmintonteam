var total_num;         // 人数の合計
var team_num;          // チームの数

var or_gender;         // 性別も平均化する(true)かしない(false)か
var or_grede;          // 学年も平均化する(true)かしない(false)か

var team = [];

var num_Gen = [];           // 男女別人数
var num_Gre = [];           // 学年別人数
var num_TeGen = [];
var num_TeGre = [];
var num_TeGreGen = [];            // チーム、学年、男女別の人数

var teamave_num_Gen = [];         // 1チームあたりの男女別人数
var teamave_num_Gre = [];         // 1チームあたりの学年別人数
var teamave_num_GreGen = [];      // 1チームあたりの学年男女別の平均人数

var ave_lev;                      // 全員の強さの平均
var ave_lev_Te = [];              // チームごとの強さの平均

var maxGrade = 6;

function main() {
    team_num = document.getElementById("teamnum").value;
    or_gender = document.getElementById("gen").checked;
    or_grede = document.getElementById("gre").checked;

    total_num = 0;
    while(data[total_num + 1][0]) {       // 全人数を数える
        total_num++;
    }

    var member = [];
    for(var i = 0; i < total_num; i++) {     // 全メンバーをmember[]に代入
        member[i] = data[i+1];
        member[i][1] = parseFloat(member[i][1]);
        member[i][2] = parseFloat(member[i][2]);
        member[i][3] = parseFloat(member[i][3]);
        member[i][1]--;
    }

    if(or_grede) member = sortGrade(member);
    initTeam(member);
    if(or_gender) averagingGender();
    averagingLevel();

    for(var i = 0; i < team_num; i++) {
        team[i] = sortGrade(team[i]);
    }
    print(team);
}

function sortGrade(mem) {         // 全員を学年順に並べ替える関数
    for(var i = 0; i < mem.length; i++) {
        var max = i;
        for(var j = i+1; j < mem.length; j++) {
            if(mem[j][1] > mem[max][1]) max = j;
        }
        var x = mem[i];
        mem[i] = mem[max];
        mem[max] = x;
    }
    return mem;
}

function initTeam(mem) {
    num_Gen[0] = 0;
    num_Gen[1] = 0;

    ave_lev = 0;

    for(var i = 0; i < team_num; i++) {      // 多次元配列を作る
        team[i] = [];
        num_TeGen[i] = [];
        num_TeGen[i][0] = 0;
        num_TeGen[i][1] = 0;
        num_TeGre[i] = [];
        num_TeGreGen[i] = [];
        ave_lev_Te[i] = 0;
        for(var j = 0; j < maxGrade; j ++) {
            num_TeGre[i][j] = 0;
            num_TeGreGen[i][j] = [];
            num_TeGreGen[i][j][0] = 0;
            num_TeGreGen[i][j][1] = 0;
        }
    }

    var p = 0;
    var q = 0;
    for(var i = 0; i < total_num; i++) {           // メンバーをチームに振り分ける
        team[p][q] = mem[i];
        num_Gen[mem[i][2]]++;
        num_TeGen[p][mem[i][2]]++;
        num_TeGre[p][mem[i][1]]++;
        num_TeGreGen[p][mem[i][1]][mem[i][2]]++;
        ave_lev += mem[i][3];
        ave_lev_Te[p] += mem[i][3];
        if(p == team_num - 1) {
            p = 0;
            q++;
        } else {
            p++;
        }
    }

    ave_lev /= total_num;
    for(var i = 0; i < team_num; i++) {
        ave_lev_Te[i] /= team[i].length;
    }

    teamave_num_Gen[0] = num_Gen[0] / team_num;
    teamave_num_Gen[1] = num_Gen[1] / team_num;

    for(var i = 0; i < maxGrade; i++) {
        teamave_num_GreGen[i] = [];
        teamave_num_GreGen[i][0] = 0;
        teamave_num_GreGen[i][1] = 0;
        for(var j = 0; j < team_num; j ++) {
            teamave_num_GreGen[i][0] += num_TeGreGen[j][i][0];
            teamave_num_GreGen[i][1] += num_TeGreGen[j][i][1];
        }
        num_Gre[i] = teamave_num_GreGen[i][0] + teamave_num_GreGen[i][1];
        teamave_num_Gre[i] = num_Gre[i] / team_num;
        teamave_num_GreGen[i][0] /= team_num;
        teamave_num_GreGen[i][1] /= team_num;
    }
}

function averagingGender() {
    var h = 0;
    var flag = 1;
    while(flag) {
        flag = 0;
        loop: for(var i = 0; i < team_num; i++) {          // 男が定員オーバーしているチームを探す
            if((num_TeGen[i][0] - teamave_num_Gen[0]) >= 1) {
                for(var j = 0; j < team_num; j++) {              // 女が定員オーバーしているチームを探す
                    if((num_TeGen[j][1] - teamave_num_Gen[1]) >= 1) {
                        for(var k = 0; k < maxGrade; k++) {            // チームiとチームjで交換できる学年を探す
                            if(((num_TeGreGen[i][k][0] - teamave_num_GreGen[k][0]) > 0) && ((num_TeGreGen[j][k][1] - teamave_num_GreGen[k][1]) > 0)) {
                                var p;
                                var q;
                                for(var l = 0; l < team[i].length; l++) {
                                    if((team[i][l][1] == k) && (team[i][l][2] == 0)) {
                                        p = l;
                                        break;
                                    }
                                }
                                for(var l = 0; l < team[j].length; l++) {
                                    if((team[j][l][1] == k) && (team[j][l][2] == 1)) {
                                        q = l;
                                        break;
                                    }
                                }
                                change(i, p, j, q);
                                flag = 1;
                                continue loop;
                            }
                        }
                    }
                }
            }
        }
    }
}

function averagingLevel() {
    var i, j, k, l;
    var flag = 1;
    while(flag) {
        flag = 0;
        for(i = 0; i < team_num; i++) {
            loop: for(j = 0; j < team[i].length; j++) {
                for(k = (i+1) % team_num; k != i; k = (k+1) % team_num) {
                    for(l = 0; l < team[k].length; l++) {
                        if(check()) {
                            flag = 1;
                            // continue loop;
                        }
                    }
                }
            }
        }
    }

    function check() {
        if(or_gender) {
            if(team[i][j][2] != team[k][l][2]) return false;
        }
        if(or_grede) {
            if(team[i][j][1] != team[k][l][1]) {
                if((num_TeGre[i][team[i][j][1]] <= teamave_num_Gre[team[i][j][1]]) || (num_TeGre[k][team[i][j][1]] >= teamave_num_Gre[team[i][j][1]]) || (num_TeGre[k][team[k][l][1]] <= teamave_num_Gre[team[k][l][1]]) || (num_TeGre[i][team[k][l][1]] >= teamave_num_Gre[team[k][l][1]])) return false;
            }
        }

        var p = (ave_lev_Te[i] * team[i].length - team[i][j][3] + team[k][l][3]) / team[i].length;
        var q = (ave_lev_Te[k] * team[k].length - team[k][l][3] + team[i][j][3]) / team[k].length;
        if((Math.abs(p - ave_lev) + Math.abs(q - ave_lev)) >= (Math.abs(ave_lev_Te[i] - ave_lev) + Math.abs(ave_lev_Te[k] - ave_lev))) return false;

        change(i, j, k, l);
        return true;
    }
}

function change(i, j, k, l) {          // チームiのj番目の人とチームkのl番目の人を交換
    num_TeGen[i][team[i][j][2]]--;
    num_TeGre[i][team[i][j][1]]--;
    num_TeGreGen[i][team[i][j][1]][team[i][j][2]]--;

    num_TeGen[k][team[i][j][2]]++;
    num_TeGre[k][team[i][j][1]]++;
    num_TeGreGen[k][team[i][j][1]][team[i][j][2]]++;

    num_TeGen[i][team[k][l][2]]++;
    num_TeGre[i][team[k][l][1]]++;
    num_TeGreGen[i][team[k][l][1]][team[k][l][2]]++;

    num_TeGen[k][team[k][l][2]]--;
    num_TeGre[k][team[k][l][1]]--;
    num_TeGreGen[k][team[k][l][1]][team[k][l][2]]++;

    ave_lev_Te[i] = (ave_lev_Te[i] * team[i].length - team[i][j][3] + team[k][l][3]) / team[i].length;
    ave_lev_Te[k] = (ave_lev_Te[k] * team[k].length - team[k][l][3] + team[i][j][3]) / team[k].length;

    var x = team[i][j];
    team[i][j] = team[k][l];
    team[k][l] = x;
}

function print() {
    var answerList = [];
    for(var i = 0; i < team_num; i++) {
        answerList.push('<div class="item"><div class="box-title">チーム' + (i+1) + '</div><p>');
        for (var j = 0; j < team[i].length; j++){
            answerList.push(team[i][j][0] + '<br>');
        }
        answerList.push('</p><p>強さの平均：' + ave_lev_Te[i].toFixed(2) + '</p></div>');
    }
    document.getElementById('output').innerHTML = answerList.join('');
}
