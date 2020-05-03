var total_num;         // 人数の合計
var team_num;          // チームの数
var or_gender;
var or_grede;
var member;
var ans_team;

function main() {
    team_num = document.getElementById("teamnum").value;
    or_gender = document.getElementById("gen").checked;
    or_grede = document.getElementById("gre").checked;
    member = [[], []];
    total_num = 0;
    var n = 1;
    while(data[n][0]) {
        total_num++;
        n++
    }

    divGender();
    if(or_gender) {
        var team1 = construct(member[0]);
        var team2 = construct(member[1]);
        ans_team = combine(team1, team2);
    } else {
        ans_team = construct(member[0]);
    }
    finalSort();
    print(ans_team);
}

function divGender() {                // 性別ごとに分ける関数
    for(var i = 0; i < total_num; i++) {
        data[i+1][1] = parseFloat(data[i+1][1]);
        data[i+1][3] = parseFloat(data[i+1][3]);
        if(or_gender) {
            if(data[i+1][2] == 0) {
                member[0].push(data[i+1]);
            } else if(data[i+1][2] == 1) {
                member[1].push(data[i+1]);
            }
        } else {
            if(data[i+1][0]) member[0].push(data[i+1]);
        }
    }
}

function construct(mem) {
    var num = mem.length;             // 人数
    var gre_num = [0, 0, 0, 0, 0, 0];             // 学年別人数
    var gre_team_num = [];        // 学年別チーム人数
    var gre_team_num_ave = [];       // 学年ごとの平均チーム人数
    var ave;             // 1人あたりのlevelの平均
    var team = [];       // チーム
    var team_ave = [];   // チームごとの平均
    var team_nums = [];

    for(var i = 0; i < team_num; i++) {
        team[i] = [];
        team_ave[i] = 0.0;
        team_nums[i] = 0;
        gre_team_num[i] = [0, 0, 0, 0, 0, 0];
    }
    if(or_grede) {
        sortGrade();
    }
    initTeam();
    createTeam();
    return team;

    function sortGrade() {            // 学年ごとにソートし人数を数える関数
        for(var i = 0; i < num; i++) {
            var max = i;
            for(var j = i+1; j < num; j++) {
                if(mem[j][1] > mem[max][1]) max = j;
            }
            var x = mem[i];
            mem[i] = mem[max];
            mem[max] = x;
            gre_num[mem[i][1]-1]++;     // 学年ごとの人数を数える
        }
        for(var i = 0; i < 6; i++) {
            gre_team_num_ave[i] = gre_num[i] / team_num;     // 学年ごとの平均チーム人数を計算
        }
    }

    function initTeam() {
        var p = 0;
        var q = 0;
        ave = 0.0;
        for(var i = 0; i < num; i++) {
            team[p][q] = mem[i];
            team_ave[p] += mem[i][3];
            team_nums[p]++;
            gre_team_num[p][mem[i][1]-1]++;
            if(p == team_num - 1) {
                p = 0;
                q++;
            } else {
                p++;
            }
            ave += mem[i][3];
        }
        ave = ave / num;                       // 全員の強さの平均値
        for(var i = 0; i < team_num; i++) {
            team_ave[i] = team_ave[i] / team[i].length;      // チームごとの強さの平均値
        }
    }

    function createTeam() {
        var t1 = 0;
        var m1 = 0;
        var t2 = 1;
        var m2 = 0;
        var t1_a = 0;
        var m1_a = 0;
        var flag = 1;

        while((t1 != t1_a) || (m1 != m1_a) || flag) {
            flag = 0;
            while(t1 != t2) {
                if(change()) {
                    flag = 1;
                    break;
                } else {
                    if(m2 + 1 == team_nums[t2]) {
                        t2 = (t2 + 1) % team_num;
                        m2 = 0;
                    } else {
                        m2++;
                    }
                }
            }
            if(m1 + 1 == team_nums[t1]) {
                t1 = (t1 + 1) % team_num;
                m1 = 0;
            } else {
                m1++;
            }
            t2 = (t1 + 1) % team_num;
            m2 = 0;
            if(flag) {
                t1_a = t1;
                m1_a = m1;
            }
        }

        function change() {
            var g1 = team[t1][m1][1] - 1;
            var g2 = team[t2][m2][1] - 1;
            if(or_grede) {
                if(team[t1][m1][1] != team[t2][m2][1]) {
                    var x1 = gre_team_num[t1][g1] - 1;   // t1のチームにおけるteam[t1][m1]の移動後のその学年g1の人数
                    var x2 = gre_team_num[t1][g2] + 1;
                    var y1 = gre_team_num[t2][g1] + 1;
                    var y2 = gre_team_num[t2][g2] - 1;
                    if((Math.abs(x1 - gre_team_num_ave[g1]) >= 1) || (Math.abs(x2 - gre_team_num_ave[g2]) >= 1) || (Math.abs(y1 - gre_team_num_ave[g1]) >= 1) || (Math.abs(y2 - gre_team_num_ave[g2]) >= 1)) {
                        return false;
                    }
                }
            }
            var p = (team_ave[t1] * team_nums[t1] - team[t1][m1][3] + team[t2][m2][3]) / team_nums[t1];
            var q = (team_ave[t2] * team_nums[t2] - team[t2][m2][3] + team[t1][m1][3]) / team_nums[t2];
            var r = Math.abs(p - ave) + Math.abs(q - ave);
            var s = Math.abs(team_ave[t1] - ave) + Math.abs(team_ave[t2] - ave);
            if(r >= s) {
                return false;
            }
            gre_team_num[t1][g1]--;
            gre_team_num[t1][g2]++;
            gre_team_num[t2][g1]++;
            gre_team_num[t2][g2]--;
            team_ave[t1] = p;
            team_ave[t2] = q;
            var t = team[t1][m1];
            team[t1][m1] = team[t2][m2];
            team[t2][m2] = t;
            return true;
        }
    }
}

function combine(team1, team2) {
    var ans = [];
    var ave = 0;
    var num_ave = 0;
    var p = 0;
    for(var i = 1; i < team_num; i++) {
        if(team1[0].length > team1[i].length) {
            p = i;
            break;
        }
    }
    var array = team1.slice(p, team1.length);
    team1.splice(p, team1.length - p);
    team1 = array.concat(team1);
    var sum1 = sum(team1);              // sun1[i]は、チームiの強さ値の総和
    var sum2 = sum(team2);
    for(var i = 0; i < team_num; i++) {
        ave += sum1[i] + sum2[i];
        num_ave += team1[i].length + team2[i].length;
    }
    ave = ave / num_ave;         // 全ての人の強さの値の和
    num_ave = num_ave / team_num;       // 1チーム当たりの平均人数
    var flag = 1;
    loop: while(flag) {
        flag = 0;
        for(var i = 0; i < team_num; i++) {
            for(var j = i + 1; j < team_num; j++) {
                if((Math.abs((team1[i].length + team2[j].length) - num_ave) < 1) && (Math.abs((team1[j].length + team2[i].length) - num_ave) < 1)) {
                    var a = (sum1[i] + sum2[j]) / (team1[i].length + team2[j].length);
                    var b = (sum1[j] + sum2[i]) / (team1[j].length + team2[i].length);
                    var c = (sum1[i] + sum2[i]) / (team1[i].length + team2[i].length);
                    var d = (sum1[j] + sum2[j]) / (team1[j].length + team2[j].length);
                    var x = Math.abs(a - ave) + Math.abs(b - ave);
                    var y = Math.abs(c - ave) + Math.abs(d - ave);
                    if(x < y) {
                        var tmp1 = team2[i];
                        var tmp2 = sum2[i];
                        team2[i] = team2[j];
                        sum2[i] = sum2[j];
                        team2[j] = tmp1;
                        sum2[j] = tmp2;
                        flag = 1;
                        continue loop;
                    }
                }
            }
        }
    }
    for(var i = 0; i < team_num; i++) {
        ans[i] = team2[i].concat(team1[i]);
    }
    return ans;

    function sum(t) {
        var s = [];
        for(var i = 0; i < team_num; i++) {
            s[i] = 0;
            for(var j = 0; j < t[i].length; j++) {
                s[i] += t[i][j][3];
            }       
        }
        return s;
    }
}

function finalSort() {            // 学年ごとにソートし人数を数える関数
    for(var i = 0; i < team_num; i++) {
        for(var j = 0; j < ans_team[i].length; j++) {
            var max = j;
            for(var k = j+1; k < ans_team[i].length; k++) {
                if(ans_team[i][k][1] > ans_team[i][max][1]) max = k;
            }
            var x = ans_team[i][j];
            ans_team[i][j] = ans_team[i][max];
            ans_team[i][max] = x;
        }
    }
}

function print(team) {
    var answerList = [];
    for(var i = 0; i < team_num; i++) {
        var average = 0;
        answerList.push('<div class="item"><div class="box-title">チーム' + (i+1) + '</div><p>');
        for (var j = 0; j < team[i].length; j++){
            answerList.push(team[i][j][0] + '<br>');
            average += team[i][j][3];
        }
        average = (average / team[i].length).toFixed(2);
        answerList.push('</p><p>強さの平均：' + average + '</p></div>');
    }
    document.getElementById('output').innerHTML = answerList.join('');
}
